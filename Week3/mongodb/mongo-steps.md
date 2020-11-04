1. I have created a cluster on Atlas cloud
2. I set up the connection on the cloud
3. I have exported the sql database into .csv files.

select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;
select * into outfile 'countryLanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;

4. I have dowloaded the Compass and installed.
5. Connected the database with the connection string I receieved from cluster connect.
6. I have imported the .csv files using Compass and checked the data.