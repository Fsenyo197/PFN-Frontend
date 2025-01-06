import { openDB } from 'idb';

const DB_NAME = 'appDB';
const FIRMS_STORE_NAME = 'firmsStore';
const METADATA_STORE_NAME = 'metadataStore';
const DB_VERSION = 1;

// Open IndexedDB
const openDatabase = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains(FIRMS_STORE_NAME)) {
        db.createObjectStore(FIRMS_STORE_NAME, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(METADATA_STORE_NAME)) {
        db.createObjectStore(METADATA_STORE_NAME, { keyPath: 'key' });
      }
    },
  });
  return db;
};

// Save firms data to IndexedDB
export const saveFirmsToIndexedDB = async (firms) => {
  const db = await openDatabase();
  const tx = db.transaction(
    [FIRMS_STORE_NAME, METADATA_STORE_NAME],
    'readwrite'
  );

  // Save firms data
  const firmStore = tx.objectStore(FIRMS_STORE_NAME);
  firms.forEach((firm) => firmStore.put(firm));

  // Update metadata with the last updated timestamp
  const metadataStore = tx.objectStore(METADATA_STORE_NAME);
  const timestamp = new Date().toISOString();
  metadataStore.put({ key: 'lastUpdated', value: timestamp });

  await tx.done;
};

// Get firms data from IndexedDB
export const getFirmsFromIndexedDB = async () => {
  const db = await openDatabase();

  // Get firms data
  const firmStore = db
    .transaction(FIRMS_STORE_NAME, 'readonly')
    .objectStore(FIRMS_STORE_NAME);
  const firms = await firmStore.getAll();

  // Get last updated timestamp
  const metadataStore = db
    .transaction(METADATA_STORE_NAME, 'readonly')
    .objectStore(METADATA_STORE_NAME);
  const metadata = await metadataStore.get('lastUpdated');
  const lastUpdated = metadata ? metadata.value : null;

  return { firms, lastUpdated };
};

// Clear all data from IndexedDB
export const clearIndexedDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(
    [FIRMS_STORE_NAME, METADATA_STORE_NAME],
    'readwrite'
  );

  // Clear both stores
  const firmStore = tx.objectStore(FIRMS_STORE_NAME);
  const metadataStore = tx.objectStore(METADATA_STORE_NAME);
  firmStore.clear();
  metadataStore.clear();

  await tx.done;
};

// Check if the cache is expired (older than one month)
export const isCacheExpired = (lastUpdated) => {
  if (!lastUpdated) return true;
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  return new Date(lastUpdated) < oneMonthAgo;
};
