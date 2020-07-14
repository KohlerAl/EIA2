"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let url = "https://agkeia.herokuapp.com/";
    function savePicture(_name) {
        let information = [];
        for (let figure of EIA2_Endabgabe.figures) {
            let form = {
                "number": EIA2_Endabgabe.figures.indexOf(figure),
                "type": figure.type,
                "active": figure.active,
                "size": figure.size,
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "rotation": figure.rotation,
                "moveType": figure.moveType,
                "color": figure.color,
                "hitAreaX": figure.hitAreaX,
                "hitAreaY": figure.hitAreaY,
                "velocity": figure.velocity,
            };
            information.push(form);
        }
        console.log(information);
        sendData(information, _name);
    }
    EIA2_Endabgabe.savePicture = savePicture;
    async function findPictures() {
        console.log("called");
        let response = await fetch(url + "?" + "getPicture");
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|{|}|"|/g, "");
        console.log(pretty);
    }
    EIA2_Endabgabe.findPictures = findPictures;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        console.log(name);
        let info = JSON.stringify(_information);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?savePicture&" + name + "&" + query.toString());
        let responseText = await response.text();
        console.log(responseText);
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map