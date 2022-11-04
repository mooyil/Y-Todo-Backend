const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      ` CREATE TABLE users (
          username text PRIMARY KEY not NULL UNIQUE,
          password text NOT NULL UNIQUE,
          userConfig text
          )`,
      (err) => {
        if (err) {
        } else {
          db.run(
            `
          CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content text, 
            tab text,
            date datetime,
        userName text, 
    FOREIGN KEY(userName) REFERENCES users(username)
    
        )`,
            (err) => {
              if (err) {
              } else {
                db.run(
                  `
            CREATE TABLE tabs (
              name text,
          userName text, 
      FOREIGN KEY(userName) REFERENCES users(username)
      
          )`,

                  (err) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
});

module.exports = db;
