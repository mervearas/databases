const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
  });

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
    const createAuthorsTable = `
    CREATE TABLE IF NOT EXISTS Authors(
        author_no int primary key,
        author_name varchar(50),
        university varchar(50),
        date_of_birth date,
        h_index varchar(50),
        gender enum("f","m")
    )`

    const addCollaboratorColumn = `
    ALTER table Authors ADD COLUMN Collaborator int,ADD CONSTRAINT foreign key(Collaborator) references Authors(author_no);`

    connection.connect()

    try {
        await execQuery(createAuthorsTable)
        await execQuery(addCollaboratorColumn)
    } catch (error) {
        console.log(error)
        connection.end()
    }
    connection.end();
};

seedDatabase()




