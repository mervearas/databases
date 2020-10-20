var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world'
});

connection.connect();

const queries = [
    "SELECT Name FROM country WHERE Population > 8000000",
    "SELECT Name FROM country WHERE name LIKE '%land%'",
    "SELECT Name FROM city WHERE Population <= 1000000 and Population >= 500000",
    "SELECT Name FROM country WHERE Continent = 'Europe'",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC",
    "SELECT Name FROM city WHERE CountryCode = 'NLD' ",
    "SELECT Population FROM city WHERE name = 'Rotterdam'",
    "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10",
    "SELECT Name FROM country ORDER BY Population DESC LIMIT 10",
    "SELECT SUM(Population) FROM country",
] 

queries.forEach(query => {
    connection.query(query, function(err, results, fields) {
        if(err) {
            throw err
        }else {
            console.log(results)
        }
    })
}) 

connection.end();