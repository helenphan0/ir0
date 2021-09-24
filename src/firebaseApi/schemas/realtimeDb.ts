enum COLLECTION_KEYS {
  GAMES = 'games',
  MAPS = 'maps',
  MINI_GAMES = 'minigames',
  SESSIONS = 'sessions',
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
  [COLLECTION_KEYS.MAPS]: {
    key: COLLECTION_KEYS.MAPS,
    fields: [],
  }
};
