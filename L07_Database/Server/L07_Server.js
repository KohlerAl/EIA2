"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.L07_Household = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_Household;
(function (L07_Household) {
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
    function handleRequest(_request, _response) {
        console.log("What's up?");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("Request-URL:  " + _request.url);
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            /* for (let key in url.query) {
                switch (key) {
                case "product":
                break;
                default:
                _response.write(key + ":  " + url.query[key] + "\n");
                break;
                }
            } */
            console.log(url.query);
            if (_request.url == "/?getOrder=yes") {
                console.log("THIS WORKS");
                showData;
            }
            else {
                let jsonString = JSON.stringify((url.query), null, 2);
                _response.write(jsonString);
                storeOrder(url.query);
            }
        }
        _response.end();
    }
    async function showData(_response) {
        console.log("ShowData called");
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(databaseUrl, options);
        let orders = mongoClient.db("Household").collection("Orders");
        let cursor = await orders.find();
        let answer = await cursor.toString();
        return answer;
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(L07_Household = exports.L07_Household || (exports.L07_Household = {}));
//# sourceMappingURL=L07_Server.js.map