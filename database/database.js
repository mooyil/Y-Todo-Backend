const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to sqlite DB");
    db.run(
      `CREATE TABLE todos (
            id PRIMARY KEY AUTOINCREMENT,
            content text
            )`,
      (err) => {
        if (err) {
        } else {
          const insert = "INSERT INTO todos (content) VALUES(?)";
          db.run(insert, ["putzen"]);
          db.run(insert, ["schlafen"]);
        }
      }
    );
  }
});

module.exports = db;
