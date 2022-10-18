const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(
      `CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content text, 
            tab text,
            date datetime
            )`,
      (err) => {
        if (err) {
          console.log("")
        } 
      }
    )
  }
});

module.exports = db;
