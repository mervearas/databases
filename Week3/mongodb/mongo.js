const { MongoClient } = require('mongodb');

const url = "mongodb+srv://hyfuser:hyfpassword@cluster0.iklop.mongodb.net/new_world?retryWrites=true&w=majority";

const client = new MongoClient(url, { useUnifiedTopology: true });

async function main () {
    try {
        // connect the client
        await client.connect();

        // connect the database
        const worldDb = client.db('world');
        const city = worldDb.collection('city');

        // add a city
        await city.insertOne({
            "Name":"Bursa",
            "CountryCode":"TUR",
            "District":"Bursa",
            "Population":2995000
        });

        // update the city
        await city.updateOne({"Name":"Bursa"},{$set: {"Population":2995001}});

        // find the document by city name and country code
        const bursaByName = await city.findOne({"Name":"Bursa"});
        console.log('bursaByName',bursaByName);
        
        const bursaByCode = await city.findOne({"CountryCode":"TUR"});
        console.log('bursaByCode',bursaByCode);

        // delete the city
        await city.deleteOne({"Name":"Bursa"});

        // close the connection
        await client.close();
    } catch (error) {
        console.log(error);
        // close the connection
        await client.close();
    }
}

main();