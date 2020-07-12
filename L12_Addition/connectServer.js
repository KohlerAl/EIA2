"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let url = "https://agkeia.herokuapp.com/";
    function savePicture() {
        let information = [];
        for (let figure of EIA2_Endabgabe.figures) {
            let form = {
                "number": EIA2_Endabgabe.figures.indexOf(figure),
                "type": figure.type,
                "active": figure.active,
                "size": figure.size,
                "position": figure.position,
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
        sendData(information);
    }
    EIA2_Endabgabe.savePicture = savePicture;
    async function sendData(_information) {
        let info = _information.toString();
        console.log(info);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        console.log(responseText);
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map