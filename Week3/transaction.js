const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const transfer101To102 = `
        INSERT INTO account_changes values
            (5,101,-1000,'2020-11-03','rent'),
            (6,102,1000,'2020-11-03','rent')
            `;
    try {
        connection.connect();
        await execQuery("START TRANSACTION");

        await execQuery('UPDATE account SET balance = 9000 WHERE account_number = 101');
        await execQuery('UPDATE account SET balance = 5950 WHERE account_number = 102');
        await execQuery(transfer101To102);

        await execQuery("COMMIT");
    } catch (error) {
        console.error(error);
        await execQuery("ROLLBACK");
        connection.end();
    }

    connection.end();
}

    seedDatabase();
