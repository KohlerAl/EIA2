"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let url = "https://agkeia.herokuapp.com/";
    function savePicture(_name) {
        let information = [];
        information.push();
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
        sendData(information, _name);
    }
    EIA2_Endabgabe.savePicture = savePicture;
    async function findPictures() {
        let response = await fetch(url + "?" + "getPicture=yes");
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|{|}|"|_id|insertName|]/g, "");
        let prettier = pretty.replace(/,,,/g, ",");
        createDatalist(prettier);
    }
    EIA2_Endabgabe.findPictures = findPictures;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        let canvasInfo = [];
        let width = (Math.floor(EIA2_Endabgabe.canvas.width)).toString();
        let height = (Math.floor(EIA2_Endabgabe.canvas.height)).toString();
        console.log(EIA2_Endabgabe.background);
        canvasInfo.push(width, height, EIA2_Endabgabe.background);
        let canvasLook = JSON.stringify(canvasInfo);
        let canvasQuery = new URLSearchParams(canvasLook);
        let info = JSON.stringify(_information);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        await fetch(url + "?insertName&" + name);
        let responseText = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!");
        }
    }
    function createDatalist(_response) {
        let masterpiece = document.getElementById("masterpiece");
        let options = _response.split(",");
        console.log(options, options.length);
        for (let entry of options) {
            if (entry == "") {
                //Skip this
            }
            else {
                let option = document.createElement("option");
                option.setAttribute("name", entry);
                option.value = entry;
                masterpiece.appendChild(option);
            }
        }
    }
    async function loadPicture() {
        let name = EIA2_Endabgabe.creations.value;
        let response = await fetch(url + "?" + "findPicture&" + name);
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|{|}|"|_id|savePicture|]/g, "");
        let removeName = pretty.replace(name, "");
        let prettier = removeName.replace(/,,,/g, ",");
        let data = prettier.split(",");
        console.log(data, data.length);
    }
    EIA2_Endabgabe.loadPicture = loadPicture;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map