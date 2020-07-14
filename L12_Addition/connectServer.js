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
        let response = await fetch(url + "?" + "getPicture=yes");
        let responseText = await response.text();
        let pretty = responseText.replace(/\\|{|}|"|_id|insertName/g, "");
        let prettier = pretty.replace(/,,,/g, "|");
        console.log(prettier);
        createDatalist(pretty);
    }
    EIA2_Endabgabe.findPictures = findPictures;
    async function sendData(_information, _name) {
        let name = _name.replace(" ", "_");
        console.log(name);
        let info = JSON.stringify(_information);
        let query = new URLSearchParams(info);
        let response = await fetch(url + "?savePicture&" + name + "&" + query.toString());
        await fetch(url + "?insertName&" + name);
        let responseText = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!");
        }
    }
    function createDatalist(_response) {
        let creations = document.getElementById("creations");
        let masterpiece = document.getElementById("masterpiece");
        for (let entry of _response) {
            let option = document.createElement("option");
            switch (entry) {
                case ("_"):
                    option.innerHTML += "<br>" + "Bestell-ID: " + entry;
                    break;
                case ("["):
                    break;
                case ("]"):
                    break;
                case (","):
                    option.innerHTML += "<br>";
                    break;
                case (":"):
                    option.innerHTML += entry + " ";
                    break;
                default:
                    option.innerHTML += "" + entry;
                    break;
            }
        }
        /* let group: HTMLDivElement = document.createElement("div");
        let input: HTMLInputElement = document.createElement("input");
        input.setAttribute("list", _product + "s");
        input.setAttribute("placeholder", "Supermarkt auswählen");
        input.name = _product;
        let datalist: HTMLDataListElement = document.createElement("datalist");
        datalist.id = _product + "s";
        for (let item of _elements) {
            let option: HTMLOptionElement = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;

            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);

        } */
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=connectServer.js.map