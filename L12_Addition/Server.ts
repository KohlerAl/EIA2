import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace EIA2_Endabgabe {
    interface Picture {
        [type: string]: string | string[] | undefined;
    }
    let allOrders: string[] = [];
    let options: Mongo.MongoClientOptions;
    let mongoClient: Mongo.MongoClient;
    let orders: Mongo.Collection;
    let port: number | string | undefined = process.env.PORT;
    if (port == undefined) {
        port = 5001;
    }

    let databaseUrl: string = "mongodb+srv://test:test@eia-yenva.mongodb.net/test?retryWrites=true&w=majority";
    //"mongodb://localhost:27017";

    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        let server: Http.Server = Http.createServer();
        console.log("Server starting on port:" + _port);

        server.listen(_port);
        server.addListener("request", handleRequest);
    }

    async function connectToDatabase(_url: string): Promise<void> {
        options = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Pictures").collection("Masterpieces");
        console.log("Database connection ", orders != undefined);
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<any> {
        console.log("What's up?");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("Request-URL:  " + _request.url);

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            let splitURL = window.location.pathname.split('/');
            console.log(splitURL); 

            if (_request.url == "/?getPicture=yes") {
                let pictures = mongoClient.db("Pictures").collection("Overview");
                let cursor: Mongo.Cursor<any> = await pictures.find();
                await cursor.forEach(showOrders);
                let jsonString: string = JSON.stringify(allOrders);
                let answer: string = jsonString.toString();
                _response.write(answer);
                allOrders = [];
            }

            else {
                let jsonString: string = JSON.stringify((url.query), null, 2);
                _response.write(jsonString);
                storeOrder(url.query);
            }
        }
        _response.end();
    }

    function storeOrder(_order: Picture): void {
        orders.insertOne(_order);
    }

    function showOrders(_item: object): void {
        //for (let entry in _item) {
        //JSON.stringify(entry);
        let jsonString: string = JSON.stringify(_item);
        allOrders.push(jsonString);
        //console.log(entry); 
        //}
    }

}