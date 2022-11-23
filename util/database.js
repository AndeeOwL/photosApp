import * as SQLite from "expo-sqlite";

const database = SQLite.openDatabase("photos.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS photos (
        id INTEGER PRIMARY KEY NOT NULL,
        image TEXT NOT NULL,
        username TEXT NOT NULL
    )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL,
        password TEXT NOT NULL
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

export function insertPhoto(image, username) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO photos (image,username) VALUES (?,?)`,
        [image, username],
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

export function fetchPhotos(username) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM photos WHERE username IS ${username}`,
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

export function insertUser(username, password) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO users (username,password) VALUES (?,?)`,
        [username, password],
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

export function fetchUser(username) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM users WHERE username IS ${username}`,
        [],
        (_, result) => {
          const user = [];
          for (const dp of result.rows._array) {
            user.push(dp.username);
            user.push(dp.password);
          }
          resolve(user);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
}
