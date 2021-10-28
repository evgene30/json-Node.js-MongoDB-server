require("dotenv").config();
const {MongoClient} = require("mongodb");
const client = new MongoClient(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const collection = client
    .db("telegramDB")
    .collection("users");

const methodsDB = {

    setUsers: (object) =>
        client.connect(async (err) => {
            try {
                await collection.insertOne(object);
                await client.close();
            } catch (err) {
                console.log(err);
            }
        }),

    deleteUser: (object_id) =>
        client.connect(async (err) => {
            try {
                await collection.deleteOne(object_id);
                await client.close();
            } catch (err) {
                console.log(err);
            }
        }),
};

module.exports = {client, collection, methodsDB};

