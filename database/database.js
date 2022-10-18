const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      ` CREATE TABLE users (
          email text PRIMARY KEY not NULL,
          password text NOT NULL,
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
        userEmail text, 
    FOREIGN KEY(userEmail) REFERENCES users(email)
    
        )`,

            (err) => {
              if (err) {
              } else {
                db.run(
                  `INSERT INTO users (email, password, userConfig) VALUES ( "muhammed@outlook.de", "muhammed123", "")`
                );
                db.run(
                  `INSERT INTO users (email, password, userConfig) VALUES ( "enes@outlook.de", "enes123", "")`
                );
                db.run(
                  `INSERT INTO todos (content, tab, date, useremail) VALUES( "putzen", "", "2022-10-18T13:22", "muhammed@outlook.de");`
                );
                db.run(
                  `INSERT INTO todos (content, tab, date, useremail) VALUES( "putzen", "", "2022-10-18T13:22", "enes@outlook.de");`
                );
                db.run(
                  `INSERT INTO todos (content, tab, date, useremail) VALUES( "putzen", "", "2022-10-18T13:22", "enes@outlook.de");`
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
