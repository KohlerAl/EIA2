"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIA2_Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let allOrders = [];
    let options;
    let mongoClient;
    let orders;
    let port = process.env.PORT;
    if (port == undefined) {
        port = 5001;
    }
    let databaseUrl = "mongodb+srv://test:test@eia-yenva.mongodb.net/test?retryWrites=true&w=majority";
    //"mongodb://localhost:27017";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server starting on port:" + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    async function connectToDatabase(_url) {
        options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Pictures").collection("Overview");
        console.log("Database connection ", orders != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("Request-URL:  " + _request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let splitURL = _request.url.split("&");
            console.log("SPLIT URL" + splitURL[0]);
            if (_request.url == "/?getPicture=yes") {
                // Load Names of all Pictures and show them to user 
                let pictures = mongoClient.db("Pictures").collection("Overview");
                let cursor = await pictures.find();
                await cursor.forEach(showOrders);
                let jsonString = JSON.stringify(allOrders);
                _response.write(jsonString);
                allOrders = [];
            }
            else if (splitURL[0] == "/?findPicture") {
                //Load specific Picture and show it to User
                let picture = mongoClient.db("Pictures").collection(splitURL[1]);
                let cursor = await picture.find();
                await cursor.forEach(showOrders);
                let jsonString = JSON.stringify(allOrders);
                let answer = jsonString.toString();
                _response.write(answer);
                allOrders = [];
            }
            else if (splitURL[0] == "/?insertName") {
                let pictures = mongoClient.db("Pictures").collection("Overview");
                (await pictures).insertOne(url.query);
            }
            else if (splitURL[0] == "/?savePicture") {
                //save new Picture in new Collection 
                let newCollection = mongoClient.db("Pictures").createCollection(splitURL[1]);
                (await newCollection).insertOne(url.query);
                _response.write("Ist angekommen");
            }
            else {
                _response.write("Error");
            }
        }
        _response.end();
    }
    function showOrders(_item) {
        for (let key in _item) {
            allOrders.push(key);
        }
    }
})(EIA2_Endabgabe = exports.EIA2_Endabgabe || (exports.EIA2_Endabgabe = {}));
//# sourceMappingURL=Server.js.map