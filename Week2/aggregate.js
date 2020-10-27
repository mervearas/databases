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

const researchPapersWithNumberOfAuthors = `
SELECT
	p.paper_title AS Title,
	count(r.author_no) AS Count_Of_Authors
	FROM Research_Papers AS p
	JOIN Author_Research AS r ON p.paper_id = r.paper_id
    GROUP BY p.paper_title;`

const countOfPublishedPapersFemaleAuthors = `
SELECT
	count(publish_date)
	FROM Research_Papers AS p
	INNER JOIN Author_Research AS r ON r.paper_id = p.paper_id
	INNER JOIN Authors a ON a.author_no = r.author_no
    GROUP BY(a.gender)`;
    
const averageHIndex = `
SELECT
	university, avg(h_index)
	FROM Authors
    GROUP BY university`;
    
const groupByUniversity = `
SELECT
	university,
	min(h_index),
	max(h_index)
	FROM Authors
    GROUP BY university`;
    
const sumOfPapersForAuthorsPerUniversity = `
SELECT
	university,count(p.paper_id) as paper_count
	FROM Research_Papers AS p
	INNER JOIN Author_Research r ON r.paper_id = p.paper_id
	INNER JOIN Authors AS a ON a.author_no = r.author_no
	GROUP BY (university)`;

execQuery(researchPapersWithNumberOfAuthors);
execQuery(countOfPublishedPapersFemaleAuthors);
execQuery(averageHIndex);
execQuery(groupByUniversity);
execQuery(sumOfPapersForAuthorsPerUniversity);

connection.end();