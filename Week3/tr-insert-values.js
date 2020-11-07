const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

function seedDatabase() {
    const insertIntoAccountTable = `
        INSERT INTO account values
            (101,10000),
            (102,4950),
            (103,250),
            (104,999)
            `;
    const insertIntoAccountChangesTable = `
        INSERT INTO account_changes values
            (1,101,10000,'2020-11-01 10:12:12','deposit'),
            (2,102,4950,'2020-10-01 08:12:22','deposit'),
            (3,103,250,'2020-01-01 09:01:12','deposit'),
            (4,104, 999,'2020-09-01 12:04:00','deposit')
            `;

    connection.connect();

    try {
        execQuery(insertIntoAccountTable);
        execQuery(insertIntoAccountChangesTable);
    } catch (error) {
        console.log(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();