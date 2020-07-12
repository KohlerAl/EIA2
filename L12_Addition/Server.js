"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIA2_Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
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
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Household").collection("Orders");
        console.log("Database connection ", orders != undefined);
    }
    async function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("Request-URL:  " + _request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (_request.url == "/?getPicture=yes") {
                let options = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoClient = new Mongo.MongoClient(databaseUrl, options);
                await mongoClient.connect();
                let content = await mongoClient.db("Household").listCollections();
                console.log(content);
                let contentString = JSON.stringify(content);
                _response.write(contentString);
            }
            console.log(url.query);
            if (_request.url == "/?getOrder=yes") {
                console.log("THIS WORKS");
                //showData(_response); 
                let options = { useNewUrlParser: true, useUnifiedTopology: true };
                let mongoClient = new Mongo.MongoClient(databaseUrl, options);
                await mongoClient.connect();
                let orders = mongoClient.db("Household").collection("Orders");
                let cursor = await orders.find();
                await cursor.forEach(showOrders);
                let jsonString = JSON.stringify(allOrders);
                let answer = jsonString.toString();
                _response.write(answer);
                allOrders = [];
            }
            else {
                let jsonString = JSON.stringify((url.query), null, 2);
                _response.write(jsonString);
                storeOrder(url.query);
            }
        }
        _response.end();
    }
    let allOrders = [];
    function storeOrder(_order) {
        orders.insertOne(_order);
    }
    function showOrders(_item) {
        //for (let entry in _item) {
        //JSON.stringify(entry);
        let jsonString = JSON.stringify(_item);
        allOrders.push(jsonString);
        //console.log(entry); 
        //}
    }
})(EIA2_Endabgabe = exports.EIA2_Endabgabe || (exports.EIA2_Endabgabe = {}));
//# sourceMappingURL=Server.js.map