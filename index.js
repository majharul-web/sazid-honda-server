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
        const productCollections = database.collection('products');
        const ordersCollection = database.collection('orders');

        // insert Products
        app.post('/addProducts', async (req, res) => {
            const product = req.body;
            const result = await productCollections.insertOne(product);
            res.send(result);
        })

        // read products
        app.get('/products', async (req, res) => {
            const result = await productCollections.find({}).toArray();
            res.send(result)
        })

        // add order
        app.post('/addOrder', async (req, res) => {
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            console.log(result);
            res.json(result);
        })

        // read myOrders
        app.get('/MyOrders/:email', async (req, res) => {
            const email = req.params.email;
            const result = await ordersCollection.find({ email: email }).toArray();
            res.send(result)
        })

        //order delete from  myOrders
        app.delete('/myOrders/order/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })

        // read manageOrders
        app.get('/manageOrders', async (req, res) => {
            const result = await ordersCollection.find({}).toArray();
            res.send(result)
        })

        //order delete from  allOrders
        app.delete('/allOrders/order/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })

        // update order status
        app.put('/orderStatus/update/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const updateDoc = {
                $set: { status: 'Shipped' }
            };
            const result = await ordersCollection.updateOne(filter, updateDoc)
            res.json(result)
        })

        // read manage products
        app.get('/manageProducts', async (req, res) => {
            const result = await productCollections.find({}).toArray();
            res.send(result)
        })

        //order delete from  all products
        app.delete('/allProduct/product/delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollections.deleteOne(query);
            res.json(result);
        })




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