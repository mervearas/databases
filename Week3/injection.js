// This will give all the records in the database
// name="Turkey" 
// code="TUR" or 1=1

// rewrite function/injection to prevent it

function getPopulation(Country,name,code,cb) {
    conn.query(
        `SELECT Population FROM ? WHERE Name = ? and code = ?`, [Country, name, code],
        function(err, result) {
          if (err) cb(err);
          if (result.length == 0) cb(new Error("Not found"));
          cb(null, result[0].name);
        }
    );
}