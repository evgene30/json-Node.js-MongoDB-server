const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true,
})
const {client, collection, methodsDB} = require('./mongoDB/mongoConnect');

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api', (req, res) => {
    client.connect(async (err) => {
        try {
            res.send(await collection.find({}).toArray());
            await client.close();
        } catch (err) {
            console.log(err);
        }
    })
});

app.post('/post', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    methodsDB.setUsers(JSON.parse(req.body.user));
    res.send('Your register!');


});

app.delete('/del', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    methodsDB.deleteUser(req.body);
    res.send('Your DELETE!');
});

app.listen(port, () => console.log(`Server app listening at http://localhost:${port}`));
