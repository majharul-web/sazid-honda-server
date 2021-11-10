const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middle war
app.use(cors());
app.use(express.json());

// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6soco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        console.log('database connected');

        // database and collection
        const database = client.db('sazidAuto_db');
        const userCollections = database.collection('users');


    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir);

// ------------------home-------------------------
app.get('/', (req, res) => {
    res.send('Running Sazid-Honda server')
})
app.listen(port, () => {
    console.log(`Sazid-Honda listening at http://localhost:${port}`)
})
// ------------------home-------------------------