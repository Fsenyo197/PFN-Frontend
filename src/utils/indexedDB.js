import { openDB } from "idb";

const DB_NAME = "appDB";
const FIRMS_STORE_NAME = "firmsStore";
const ARTICLES_STORE_NAME = "articlesStore";
const DB_VERSION = 1;

// Open IndexedDB
const openDatabase = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains(FIRMS_STORE_NAME)) {
        db.createObjectStore(FIRMS_STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(ARTICLES_STORE_NAME)) {
        db.createObjectStore(ARTICLES_STORE_NAME, { keyPath: "id" });
      }
    },
  });
  return db;
};

// Save firms data to IndexedDB
export const saveFirmsToIndexedDB = async (firms) => {
  const db = await openDatabase();
  const tx = db.transaction(FIRMS_STORE_NAME, "readwrite");
  const store = tx.objectStore(FIRMS_STORE_NAME);
  firms.forEach((firm) => store.put(firm));
  await tx.done;
};

// Get firms data from IndexedDB
export const getFirmsFromIndexedDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(FIRMS_STORE_NAME, "readonly");
  const store = tx.objectStore(FIRMS_STORE_NAME);
  return await store.getAll();
};

// Save articles data to IndexedDB
export const saveArticlesToIndexedDB = async (articles) => {
  const db = await openDatabase();
  const tx = db.transaction(ARTICLES_STORE_NAME, "readwrite");
  const store = tx.objectStore(ARTICLES_STORE_NAME);
  articles.forEach((article) => store.put(article));
  await tx.done;
};

// Get articles data from IndexedDB
export const getArticlesFromIndexedDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(ARTICLES_STORE_NAME, "readonly");
  const store = tx.objectStore(ARTICLES_STORE_NAME);
  return await store.getAll();
};

// Clear all data from IndexedDB
export const clearIndexedDB = async () => {
  const db = await openDatabase();
  const tx = db.transaction(
    [FIRMS_STORE_NAME, ARTICLES_STORE_NAME],
    "readwrite"
  );
  const firmStore = tx.objectStore(FIRMS_STORE_NAME);
  const articleStore = tx.objectStore(ARTICLES_STORE_NAME);
  firmStore.clear();
  articleStore.clear();
  await tx.done;
};
