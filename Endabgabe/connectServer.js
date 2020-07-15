"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let url = "https://agkeia.herokuapp.com/";
    function savePicture(_name) {
        let information = [];
        information.push();
        for (let figure of EIA2_Endabgabe.figures) {
            let form = {
                "active": figure.active,
                "size": figure.size,
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "rotation": figure.rotation,
                "moveType": figure.moveType,
                "color": figure.color,
                "velocity": figure.velocity,
                "type": figure.type,
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
        console.log(prettier);
        let removeKey = prettier.replace(/type:|active:|size:|positionX:|positionY:|rotation:|moveType:|color:|velocity:/g, "");
        let data = removeKey.split(",");
        EIA2_Endabgabe.canvas.width = parseInt(data[1]);
        EIA2_Endabgabe.canvas.height = parseInt(data[2]);
        EIA2_Endabgabe.createBackground(data[3]);
        data.splice(0, 4);
        let info = [];
        for (let i = 1; i < data.length; i++) {
            switch (data[i]) {
                case ("Triangle"):
                    console.log(info);
                    let triangle = new EIA2_Endabgabe.Triangle();
                    triangle.draw();
                    EIA2_Endabgabe.figures.push(triangle);
                    break;
                case ("Ellipse"):
                    console.log(info);
                    let ellipse = new EIA2_Endabgabe.Ellipse();
                    ellipse.draw();
                    EIA2_Endabgabe.figures.push(ellipse);
                    break;
                case ("Circle"):
                    console.log(info);
                    let circle = new EIA2_Endabgabe.Triangle();
                    circle.draw();
                    EIA2_Endabgabe.figures.push(circle);
                    break;
                case ("Square"):
                    console.log(info);
                    let square = new EIA2_Endabgabe.Triangle();
                    square.draw();
                    EIA2_Endabgabe.figures.push(square);
                    break;
                case ("Line"):
                    console.log(info);
                    let figure = new EIA2_Endabgabe.Triangle();
                    figure.draw();
                    EIA2_Endabgabe.figures.push(figure);
                    break;
                default:
                    info.push(data[i]);
                    break;
            }
        }
    }
    EIA2_Endabgabe.loadPicture = loadPicture;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map