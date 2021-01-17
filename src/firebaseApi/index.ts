let firebaseApi, firestoreSchema, realtimeDbSchema;

try {
  firebaseApi = require('./api/firebase');
  firestoreSchema = require('./schemas/firestore');
  /* fireStoreSchema
    {
      [Collection Name] {
        key: Collection Name
        fields: [document fields on collection],
        collections: {
          [Collection Name]: {
            key: Collection Name,
            fields: [document fields on collection]
          }
        }
      }
    }
  */
  realtimeDbSchema = require('./schemas/realtimeDb');
} catch {
  firebaseApi = {}
  firestoreSchema = {};
  realtimeDbSchema = {};
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { ...firebaseApi, ...firestoreSchema, ...realtimeDbSchema };
