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
            (5,101,-1000,'2020-11-03 11:04:00','rent'),
            (6,102,1000,'2020-11-03 11:04:00','rent')
            `;
    try {
        connection.connect();
        await execQuery("START TRANSACTION");

        const balanceFrom101 = await execQuery('SELECT balance FROM account where account_number = 101');
        const balanceFrom102 = await execQuery('SELECT balance FROM account where account_number = 102');

        if(balanceFrom101[0].balance < 1000) {
            throw Error('Balance is not enough!');
        }

        await execQuery(`UPDATE account SET balance = ${balanceFrom101[0].balance - 1000} WHERE account_number = 101`);
        await execQuery(`UPDATE account SET balance = ${balanceFrom102[0].balance + 1000} WHERE account_number = 102`);
        await execQuery(transfer101To102);

        await execQuery("COMMIT");
    } catch (error) {
        console.error(error);
        await execQuery("ROLLBACK");
    } finally {
        connection.end();
    }

}

seedDatabase();
