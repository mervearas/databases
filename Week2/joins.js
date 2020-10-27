const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'userdb',
  });

function execQuery(query) {
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });
}

connection.connect();

const getAuthorsAndCollaborators = `
SELECT
    a.author_name AS Authors,
    c.author_name AS Collobarator
    FROM Authors AS a
    LEFT JOIN Authors AS c 
    ON a.Collaborator = c.Collaborator;`;

const getAuthorsWithResearchPapers = `
SELECT * 
    FROM Authors a
    LEFT JOIN Author_Research r ON a.author_no = r.author_no
    LEFT JOIN Research_Papers p ON r.paper_id = p.paper_id;`;

execQuery(getAuthorsWithResearchPapers);
execQuery(getAuthorsWithResearchPapers);

connection.end();