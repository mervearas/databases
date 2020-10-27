const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
  });

const execQuery = util.promisify(connection.query.bind(connection));

// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function addAuthors() {
    for(let i = 1; i <= 15; i++) {
        await execQuery(`INSERT INTO Authors values(${i},'Author${i}','University${i}','10.10.2000', '${i}${i}', 'f', ${i !== 1 ? i - 1: null})`)
    }
}

async function addResearchPapers() {
    for(let i = 60; i <= 90; i++) {
        await execQuery(`INSERT INTO Research_Papers values(${i},'Research Paper ${i}','Conference ${i}','10.10.2020')`)
    }
}

async function addAuthorsResearchPapers() {
    for(let i = 0; i < 30; i++) {
        await execQuery(`INSERT INTO Author_Research values(${getRandomNumber(1,15)}, ${getRandomNumber(60,90)})`);
    }
}

async function seedDatabase(){
    const createResearchPapersTable = `
    CREATE TABLE IF NOT EXISTS Research_Papers(
        paper_id int primary key, 
        paper_title varchar(50), 
        conference varchar(50), 
        publish_date datetime);`;

    const createAuthorResearchTable = `
    CREATE TABLE IF NOT EXISTS Author_Research(
        author_no int,
        paper_id int,
        FOREIGN KEY (author_no) REFERENCES Authors (author_no),
        FOREIGN KEY (paper_id) REFERENCES Research_Papers (paper_id));`;
    
    connection.connect()

    try {
        await execQuery(createResearchPapersTable)
        await execQuery(createAuthorResearchTable)
        await addAuthors();
        await addResearchPapers();
        await addAuthorsResearchPapers();
    } catch (error) {
        console.log(error)
        connection.end()
    }
    connection.end();
}

seedDatabase();
