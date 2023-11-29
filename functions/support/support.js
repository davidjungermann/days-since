const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.support = functions
  .region('europe-west1')
  .pubsub.schedule('0 6 * * 1')
  .timeZone('Europe/Stockholm')
  .onRun(async (context) => {
    const uid = 'EftL8OyZ9ucTJyCarI3PR3vENkt2';
    // Get current agile state
    const agile = await admin.firestore().collection('agile').doc(uid).get();

    const developers = agile.data().rotation;
    const length = developers.length;

    const currentDaily = agile.data().daily;
    const currentRetro = agile.data().retro;
    const currentWeek = agile.data().week;

    // Find the index of the current retro host
    let indexRetro = developers.indexOf(currentRetro);
    let newRetro;

    // Determine the new retro host
    if (currentWeek === 1) {
      newRetro = developers[(indexRetro + 1) % length];
      await admin.firestore().collection('agile').doc(uid).update({
        week: 0,
        retro: newRetro,
      });
    } else {
      newRetro = currentRetro;
      await admin
        .firestore()
        .collection('agile')
        .doc(uid)
        .update({
          week: currentWeek + 1,
        });
    }

    // Determine the new daily host, ensuring it's not the same as the retro host
    let indexDaily = developers.indexOf(currentDaily);
    let newDaily = developers[(indexDaily + 1) % length];

    // If the new daily host is the same as the new retro host, increment once more
    if (newDaily === newRetro) {
      newDaily = developers[(indexDaily + 2) % length];
    }

    // Set the new agile developers
    await admin.firestore().collection('agile').doc(uid).update({
      daily: newDaily,
    });

    return 'Ok';
  });
