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

// db.serialize(() => {
//   //   // Create a table
//   db.run(`
//           CREATE TABLE IF NOT EXISTS places (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               image TEXT,
//               name TEXT,
//               address TEXT,
//               address2 TEXT,
//               state TEXT,
//               city TEXT,
//               items TEXT
//           );
//       `);
//   // Insert data into table
//   const query = `
//       INSERT INTO places (
//           image,
//           name,
//           address,
//           address2,
//           state,
//           city,
//           items
//       ) VALUES (?,?,?,?,?,?,?);
//       `;
//   const values = [
//     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     "Papersider",
//     "Guilherme Gemballa, Jardim América",
//     "N° 260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos Eletrônicos, Lâmpadas",
//   ];
//   function afterDataInsert(err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log("Your data was saved");
//     console.log(this);
//   }
//   db.run(query, values, afterDataInsert);
//Check for data in the table
// db.all(`SELECT * FROM places`, function (err, rows) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("Here is your data: ");
//   console.log(rows);
// });
//   //   Delete data from table
// db.run(`DELETE FROM places WHERE id=?`, [28], function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("The data has been deleted");
// });
// });
