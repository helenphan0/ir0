let firestore, realtimeDb;

try {
  firestore = require('./firestore');
  realtimeDb = require('./realtimeDb');
} catch {
  firestore = {};
  realtimeDb = {};
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { ...firestore, ...realtimeDb };
