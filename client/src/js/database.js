import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content, id: 1 }); // Update the same entry with ID 1
  await tx.complete;
  console.log('Content updated in IndexedDB:', content);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const result = await store.get(1); // Retrieve the entry with ID 1
  await tx.complete;
  console.log('Retrieved content from IndexedDB:', result?.jate); // Return the specific content field (e.g., 'jate')
  return result?.jate; // Return the specific content field (e.g., 'jate')
};

initdb();
