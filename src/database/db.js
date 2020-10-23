const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

/**
 * Function to teach Beto how to separate things. Should change this...
 * @param {string[]} values Values to be inserted on database
 * @returns {Promise} Result of the operation
 */
function addData({ table, fields, values }) {
  return new Promise((resolve, reject) => {
    const query = `
        INSERT INTO ${table} (
            ${fields}
        ) VALUES (?,?,?,?,?,?,?);
        `;

    db.run(query, values, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(true);
    });
  });
}

module.exports = { db, addData };
