const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { WebClient } = require('@slack/web-api');

const slackClient = new WebClient(functions.config().slack.token);

admin.initializeApp();

const postMemberMessage = async (newDaily, newRetro, currentRetro) => {
  if (newRetro !== currentRetro) {
    retroMessage = `*Retro* - ${newRetro}`;
  } else {
    retroMessage = `*Retro* - ${currentRetro} (no change this week)`;
  }

  await slackClient.chat.postMessage({
    channel: functions.config().member.channel,
    text:
      `New daily host is ${newDaily}.` +
      (newRetro !== currentRetro ? ` New retro host is ${newRetro}.` : ''),
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Good morning :sunny:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `This week's hosts are:\n*Standup* - ${newDaily}\n${retroMessage}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'See more <https://davidjungermann.com/days-since|here>',
        },
      },
    ],
  });
};

const postOmniMessage = async (newDaily) => {
  await slackClient.chat.postMessage({
    channel: functions.config().omni.channel,
    text: `Facilitator is: ${newDaily}.`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Good morning :sunny:',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `This week's facilitator is: *${newDaily}*`,
        },
      },
    ],
  });
};

const updateAgileStateAndPostMessage = async (uid) => {
  // Get current agile state
  const agile = await admin.firestore().collection('agile').doc(uid).get();

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

  if (agile.data().team === 'omni') {
    postOmniMessage(newDaily);
  } else if (agile.data().team === 'member') {
    postMemberMessage(newDaily, newRetro, currentRetro);
  } else {
    throw new Error('Invalid team');
  }
};

exports.agile = functions
  .region('europe-west1')
  .pubsub.schedule('0 8 * * 1')
  .timeZone('Europe/Stockholm')
  .onRun(async (context) => {
    const memberUid = functions.config().member.uid;
    const omniUid = functions.config().omni.uid;

    await updateAgileStateAndPostMessage(memberUid);
    await updateAgileStateAndPostMessage(omniUid);

    return 'Ok';
  });
