export const NAVIGATION_PATHS = {
  NOTES: 'notes',
  CREATE_NOTE: 'create-note',
} as const;

export const NAVIGATION_ITEMS = {
  NOTES: {
    path: NAVIGATION_PATHS.NOTES,
    label: 'Notes',
  },
  CREATE_NOTE: {
    path: NAVIGATION_PATHS.CREATE_NOTE,
    label: 'Create Note',
  },
} as const;
