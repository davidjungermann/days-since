const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.scheduledFunctionCrontab = functions
  .region('europe-west1')
  .pubsub.schedule('0 6 * * 1')
  .timeZone('Europe/Stockholm')
  .onRun(async (context) => {
    const developers = ['Vinay', 'David', 'Selma', 'Mehul', 'Jonathan'];
    const length = developers.length;

    // Get current support developers
    const support = await admin.firestore().collection('support').doc('current').get();
    const currentBatman = support.data().batman;
    const currentRobin = support.data().robin;

    // Find the index of current support developers
    let indexBatman = developers.indexOf(currentBatman);
    let indexRobin = developers.indexOf(currentRobin);

    indexBatman === indexRobin
      ? (robin = developers[(((indexRobin + 2) % length) + length) % length])
      : (robin = developers[(((indexRobin + 1) % length) + length) % length]);

    let batman = developers[(((indexBatman + 1) % length) + length) % length];

    //Set the new support developers by incrementing the index
    // Circular indexing for array index insertion
    return await admin.firestore().collection('support').doc('current').update({
      batman: batman,
      robin: robin,
    });
  });
