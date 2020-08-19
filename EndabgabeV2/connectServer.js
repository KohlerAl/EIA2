"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    let url = "https://agkeia.herokuapp.com/";
    let options;
    function savePicture(_name) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] == _name) {
                alert("This name is already taken! Please choose another one!");
                return;
            }
        }
        insertPicture(_name);
    }
    EIA2_EndabgabeV2.savePicture = savePicture;
    function insertPicture(_name) {
        let information = [];
        information.push();
        for (let figure of EIA2_EndabgabeV2.figures) {
            let form = {
                "active": figure.active,
                "size": figure.size,
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "rotation": figure.rotation,
                "moveType": figure.moveType,
                "color": figure.color,
                "velocity": figure.velocity,
                "neon": figure.neon,
                "threeD": figure.threeD,
                "type": figure.type
            };
            information.push(form);
        }
        sendData(information, _name);
    }
    async function findPictures() {
        let response = await fetch(url + "?" + "getPicture=yes");
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|{|}|"|_id|insertName|]/g, "");
        let prettier = pretty.replace(/,,,/g, ",");
        createDatalist(prettier);
    }
    EIA2_EndabgabeV2.findPictures = findPictures;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        let canvasInfo = [];
        let width = (Math.floor(EIA2_EndabgabeV2.canvas.width)).toString();
        let height = (Math.floor(EIA2_EndabgabeV2.canvas.height)).toString();
        canvasInfo.push(width, height, EIA2_EndabgabeV2.background, EIA2_EndabgabeV2.backgroundPattern, EIA2_EndabgabeV2.patternColor.value);
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
        else {
            alert("An error has occurred during saving");
        }
        findPictures();
    }
    function createDatalist(_response) {
        let masterpiece = document.getElementById("masterpiece");
        options = _response.split(",");
        while (masterpiece.firstChild) {
            masterpiece.removeChild(masterpiece.firstChild);
        }
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
        EIA2_EndabgabeV2.figures = [];
        let name = EIA2_EndabgabeV2.creations.value;
        let response = await fetch(url + "?" + "findPicture&" + name);
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|\[|{|}|"|_id|savePicture|]/g, "");
        let removeName = pretty.replace(name, "");
        let prettier = removeName.replace(/,,,/g, ",");
        let removeKey = prettier.replace(/type:|active:|size:|neon:|threeD:|positionX:|positionY:|rotation:|x:|y:|moveType:|color:|velocity:/g, "");
        let data = removeKey.split(",");
        EIA2_EndabgabeV2.canvas.width = parseInt(data[1]);
        EIA2_EndabgabeV2.canvas.height = parseInt(data[2]);
        EIA2_EndabgabeV2.backgroundPattern = data[4];
        EIA2_EndabgabeV2.patternColor.value = data[5];
        EIA2_EndabgabeV2.createBackground(data[3]);
        data.splice(0, 6);
        let info = [];
        let newFigure;
        for (let i = 0; i < data.length; i++) {
            switch (data[i]) {
                case ("Triangle"):
                    newFigure = new EIA2_EndabgabeV2.Triangle();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Ellipse"):
                    newFigure = new EIA2_EndabgabeV2.Ellipse();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Circle"):
                    newFigure = new EIA2_EndabgabeV2.Circle();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Square"):
                    newFigure = new EIA2_EndabgabeV2.Square();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Line"):
                    newFigure = new EIA2_EndabgabeV2.Line();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Heart"):
                    newFigure = new EIA2_EndabgabeV2.Heart();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                case ("Star"):
                    newFigure = new EIA2_EndabgabeV2.Star();
                    createFigure(newFigure, info);
                    info = [];
                    break;
                default:
                    info.push(data[i]);
                    break;
            }
        }
        EIA2_EndabgabeV2.updateList();
    }
    EIA2_EndabgabeV2.loadPicture = loadPicture;
    function createFigure(_newFigure, _info) {
        _newFigure.restoreFigure(_info);
        _newFigure.draw();
        EIA2_EndabgabeV2.figures.push(_newFigure);
    }
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=connectServer.js.map