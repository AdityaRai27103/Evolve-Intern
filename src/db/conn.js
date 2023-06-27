const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://EvolveIntern:EvolveIntern01623@cluster0.pfih4bu.mongodb.net/Evolve?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  client.close();
});
