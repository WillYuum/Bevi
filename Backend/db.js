//connecting to sqlite3 databse
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./Bevy.sqlite", err => {
  if (err) {
    throw new Error(`connect to database failed with = ${err}`);
  }
  console.log(`Connected to database successfully`);
});
// console.log(db);
export default db;
