enum COLLECTION_KEYS {
  ACCOUNTS = 'accounts',
  CHARACTERS ='characters',
  PUBLISHED_VERSES = 'publishedVerses',
  VERSES = 'servers',
  GAMES = 'verses',
};

export const firestoreSchema = {
  [COLLECTION_KEYS.ACCOUNTS]: {
    key: COLLECTION_KEYS.ACCOUNTS,
    fields: [
      'id',
      'discordId',
      'discordInfo',
      'discordRoles',
      'email',
      'hasEarlyAccess',
      'name',
    ],
    collections: {
      characters: {
        key: 'characters',
        fields: ['charId', 'id']
      },
      servers: {
        key: 'servers',
        fields: ['serverId']
      }
    }
  },
  [COLLECTION_KEYS.CHARACTERS]: {
    key: COLLECTION_KEYS.CHARACTERS,
    fields: [
      'id',
      'appearance',
      'archetypeType',
      'feats',
      'gold',
      'health',
      'maxHealth',
      'kindType',
      'pronouns',
      'serverId',
      'sprite',
      'stats',
      'name',
      'version',
    ],
  },
  [COLLECTION_KEYS.PUBLISHED_VERSES]: {
    key: COLLECTION_KEYS.PUBLISHED_VERSES,
    fields: [
      'id',
      'cache',
      'cachedVersion',
      'category',
      'collaborators',
      'createDate',
      'creatorId',
      'description',
      'lastUpdate',
      'requirements',
      'name',
      'version',
    ],
  },
  [COLLECTION_KEYS.VERSES]: {
    key: COLLECTION_KEYS.VERSES,
    fields: [
      'id',
      'admins',
      'creator',
      'homebaseId',
      'openSessions',
      'playerCap',
      'title',
      'verse',
    ],
    collections: {
      characters: {
        key: 'characters',
        fields: [
          'accountId',
          'appearance',
          'archetypeType',
          'feats',
          'gold',
          'health',
          'id',
          'inventory',
          'kindType',
          'maxHealth',
          'name',
          'pronouns',
          'serverId',
          'sprite',
          'stats',
          'version',
        ]
      },
      players: {
        key: 'players',
        fields: [
          'accountId',
          'charId',
        ]
      }
    }
  },
  [COLLECTION_KEYS.GAMES]: {
    key: COLLECTION_KEYS.GAMES,
    fields: [
      'id',
      'cache',
      'cachedVersion',
      'category',
      'collaborators',
      'createDate',
      'creatorId',
      'description',
      'lastUpdate',
      'name',
      'requiremanes',
      'version',
    ],
    collections: {
      assets: {
        key: 'assets',
        fields: [
          'biome',
          'collectionKey',
          'createDate',
          'creatorId',
          'icon',
          'name',
          'sprite',
          'tags',
          'type',
          'updateDate',
          'verseid',
          'version',
        ]
      },
      tags: {
        key: 'tags',
        fields: [
          'collectionKey',
          'createDate',
          'id',
          'tagName',
          'tagType',
          'updateDate',
          'verseId',
        ]
      }
    }
  }
};
