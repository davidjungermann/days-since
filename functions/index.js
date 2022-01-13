const functions = require('firebase-functions');

exports.scheduledFunctionCrontab = functions
  .region('europe-west1')
  .pubsub.schedule('*/5 * * * *')
  .timeZone('Europe/Stockholm')
  .onRun(async (context) => {
    console.log('This will be run every five minutes');
    const writeResult = await admin
      .firestore()
      .collection('support')
      .add({ batman: 'David', robin: 'Mansour' });
  });
