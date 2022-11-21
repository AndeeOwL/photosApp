import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("photos.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY NOT NULL,
        image TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function insertPhoto(image) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO photos (image) VALUES (?)`,
        [image],
        (_, result) => {
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}

export function fetchPhotos() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM photos",
        [],
        (_, result) => {
          const photos = [];
          for (const dp of result.rows._array) {
            photos.push(dp.image);
          }
          resolve(photos);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
