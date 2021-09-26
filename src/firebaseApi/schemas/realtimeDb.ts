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
      'characters'
    ]
  },
  [COLLECTION_KEYS.SESSIONS]: {
    key: COLLECTION_KEYS.SESSIONS,
    fields: [
      'storytellers',
      'party',
      'players',
    ]
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
