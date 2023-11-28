const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.scheduledFunctionCrontab = functions
  .region('europe-west1')
  .pubsub.schedule('0 6 * * 1')
  .timeZone('Europe/Stockholm')
  .onRun(async (context, uid = 'ZRlzaNHnfnRTeE7OydcLrFdzBWY2') => {
    // Default to 'current' if no UID is provided
    const developers = ['David', 'Mehul', 'Jonathan', 'Stephane'];
    const length = developers.length;

    // Get current support developers
    const support = await admin.firestore().collection('support').doc(uid).get();
    const currentBatman = support.data().batman;
    const currentRobin = support.data().robin;
    const currentCaptain = support.data().captain;
    const currentWeek = support.data().week;
    const nextWeek = currentWeek + 1;

    // Find the index of current support developers
    let indexBatman = developers.indexOf(currentBatman);
    let indexRobin = developers.indexOf(currentRobin);

    indexBatman === indexRobin
      ? (robin = developers[(((indexRobin + 2) % length) + length) % length])
      : (robin = developers[(((indexRobin + 1) % length) + length) % length]);

    let batman = developers[(((indexBatman + 1) % length) + length) % length];

    //Set the new support developers by incrementing the index
    // Circular indexing for array index insertion
    await admin.firestore().collection('support').doc(uid).update({
      batman: batman,
      robin: robin,
    });

    if (currentWeek === 3) {
      let indexCaptain = developers.indexOf(currentCaptain);
      let captain = developers[(((indexCaptain + 1) % length) + length) % length];
      await admin.firestore().collection('support').doc(uid).update({
        week: 1,
        captain: captain,
      });
    } else {
      await admin.firestore().collection('support').doc(uid).update({
        week: nextWeek,
      });
    }

    return 'Ok';
  });
