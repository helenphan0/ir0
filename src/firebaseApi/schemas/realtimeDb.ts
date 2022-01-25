enum COLLECTION_KEYS {
  GAMES = 'games',
  MAPS = 'maps',
  MINI_GAMES = 'minigames',
  SESSIONS = 'sessions',
  VERSE_UPDATES = 'verseUpdates'
};

export const realtimeDbSchema = {
  [COLLECTION_KEYS.GAMES]: {
    key: COLLECTION_KEYS.GAMES,
    fields: [
      'characters',
      'environment',
      'spawnPoints',
      'vibe'
    ],
    collections: {
      characters: {
        key: 'characters',
        fields: []
      },
      environment: {
        key: 'environment',
        fields: []
      },
      spawnPoints: {
        key: 'spawnPoints',
        fields: []
      },
      vibe: {
        key: 'vibe',
        fields: []
      }
    }
  },
  [COLLECTION_KEYS.SESSIONS]: {
    key: COLLECTION_KEYS.SESSIONS,
    fields: [
      'characterLocations',
      'levels',
      'storytellers',
      'party',
      'players',
      'sessionCharacters'
    ],
    collections: {
      characterLocations: {
        key: 'characterLocations',
        fields: ['id']
      },
      levels: {
        key: 'levels',
        fields: ['id']
      },
      party: {
        key: 'party',
        fields: ['id']
      },
      players: {
        key: 'players',
        fields: ['id']
      },
      sessionCharacters: {
        key: 'sessionCharacters',
        fields: ['id']
      }
    }
  },
  [COLLECTION_KEYS.VERSE_UPDATES]: {
    key: COLLECTION_KEYS.VERSE_UPDATES,
    fields: [],
  },
  [COLLECTION_KEYS.MAPS]: {
    key: COLLECTION_KEYS.MAPS,
    fields: [],
  }
};
