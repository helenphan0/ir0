enum COLLECTION_KEYS {
  GAMES = 'games',
  MAPS = 'maps',
  MINI_GAMES = 'minigames',
  SESSIONS = 'sessions',
};

export const realtimeDbSchema = {
  [COLLECTION_KEYS.MAPS]: {
    key: COLLECTION_KEYS.MAPS,
    fields: {
      characters: {
        key: 'characters',
        isCollection: true,
        fields: {
        }
      }
    }
  }
};
