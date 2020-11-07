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
    const createAccountTable = `
        CREATE TABLE IF NOT EXISTS account(
            account_number int primary key,
            balance float
            )`;
    const createAccountChangesTable = `
        CREATE TABLE IF NOT EXISTS account_changes(
            change_number int primary key,
            account_number int,
            amount float,
            changed_date datetime,
            remark varchar(200),
            FOREIGN KEY(account_number) REFERENCES account(account_number)
            )`;

    connection.connect();

    try {
        execQuery(createAccountTable);
        execQuery(createAccountChangesTable);
    } catch (error) {
        console.log(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();