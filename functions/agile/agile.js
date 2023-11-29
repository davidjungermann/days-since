const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.agile = functions
  .region('europe-west1')
  .pubsub.schedule('0 6 * * 1')
  .timeZone('Europe/Stockholm')
  .onRun(async (context) => {
    const uid = 'EftL8OyZ9ucTJyCarI3PR3vENkt2';
    // Get current agile state
    const agile = await admin.firestore().collection('agile').doc(uid).get();

    // Default to 'current' if no UID is provided
    const developers = agile.data().rotation;
    const length = developers.length;

    const currentDaily = agile.data().daily;
    const currentRetro = agile.data().retro;
    const currentWeek = agile.data().week;

    // Find the index of current agile developers
    let indexRetro = developers.indexOf(currentRetro);

    let newRetro = currentRetro;

    if (currentWeek === 1) {
      newRetro = developers[(((indexRetro + 1) % length) + length) % length];
      await admin.firestore().collection('agile').doc(uid).update({
        week: 0,
        retro: newRetro,
      });
    } else {
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
    let newDaily = currentDaily;
    do {
      indexDaily = (indexDaily + 1) % length;
      newDaily = developers[indexDaily];
    } while (newDaily === newRetro);

    // Set the new agile developers
    await admin.firestore().collection('agile').doc(uid).update({
      daily: newDaily,
      retro: newRetro,
    });

    return 'Ok';
  });
