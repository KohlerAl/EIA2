"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let url = "https://agkeia.herokuapp.com/";
    let options;
    function savePicture(_name) {
        if (options) {
            checkNames(_name);
        }
        if (true) {
            insertPicture(_name);
        }
    }
    EIA2_Endabgabe.savePicture = savePicture;
    function checkNames(_name) {
        for (let i = 0; i < options.length; i++) {
            if (options[i] == _name) {
                alert("This name is already taken! Please choose another one!");
                return false;
            }
        }
        return true;
    }
    function insertPicture(_name) {
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
                "neon": figure.neon,
                "threeD": figure.threeD,
                "type": figure.type,
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
    EIA2_Endabgabe.findPictures = findPictures;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        let canvasInfo = [];
        let width = (Math.floor(EIA2_Endabgabe.canvas.width)).toString();
        let height = (Math.floor(EIA2_Endabgabe.canvas.height)).toString();
        canvasInfo.push(width, height, EIA2_Endabgabe.background, EIA2_Endabgabe.backgroundPattern, EIA2_Endabgabe.patternColor.value);
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
        EIA2_Endabgabe.figures = [];
        let name = EIA2_Endabgabe.creations.value;
        let response = await fetch(url + "?" + "findPicture&" + name);
        let responseText = await response.text();
        console.log(responseText);
        let pretty = responseText.replace(/\\|\[|{|}|"|_id|savePicture|]/g, "");
        let removeName = pretty.replace(name, "");
        let prettier = removeName.replace(/,,,/g, ",");
        let removeKey = prettier.replace(/type:|active:|size:|neon:|threeD:|positionX:|positionY:|rotation:|x:|y:|moveType:|color:|velocity:/g, "");
        let data = removeKey.split(",");
        console.log(data);
        EIA2_Endabgabe.canvas.width = parseInt(data[1]);
        EIA2_Endabgabe.canvas.height = parseInt(data[2]);
        EIA2_Endabgabe.backgroundPattern = data[4];
        EIA2_Endabgabe.patternColor.value = data[5];
        EIA2_Endabgabe.createBackground(data[3]);
        data.splice(0, 6);
        console.log(data);
        console.log(data);
        let info = [];
        for (let i = 0; i < data.length; i++) {
            switch (data[i]) {
                case ("Triangle"):
                    let triangle = new EIA2_Endabgabe.Triangle(info);
                    triangle.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(triangle);
                    break;
                case ("Ellipse"):
                    let ellipse = new EIA2_Endabgabe.Ellipse(info);
                    ellipse.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(ellipse);
                    break;
                case ("Circle"):
                    let circle = new EIA2_Endabgabe.Circle(info);
                    circle.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(circle);
                    break;
                case ("Square"):
                    let square = new EIA2_Endabgabe.Square(info);
                    square.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(square);
                    break;
                case ("Line"):
                    let figure = new EIA2_Endabgabe.Line(info);
                    figure.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(figure);
                    break;
                case ("Heart"):
                    let heart = new EIA2_Endabgabe.Heart(info);
                    heart.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(heart);
                    break;
                case ("Star"):
                    let star = new EIA2_Endabgabe.Star(info);
                    star.draw();
                    info = [];
                    EIA2_Endabgabe.figures.push(star);
                    break;
                default:
                    info.push(data[i]);
                    break;
            }
        }
        EIA2_Endabgabe.updateList();
    }
    EIA2_Endabgabe.loadPicture = loadPicture;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map