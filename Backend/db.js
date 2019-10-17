//import sqlite3 from "sqlite3"

const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("./test.db");
export default db;
