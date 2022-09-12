"use strict";
var lektion06;
(function (lektion06) {
    let url = "https://webuser.hs-furtwangen.de/~kohleral/EIA2/";
    let allEntries = [];
    let wrapper;
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        let add = document.querySelector("#add");
        add.addEventListener("pointerdown", addProduct);
        wrapper = document.querySelector(".container");
        let query = new URLSearchParams();
        query.set("command", "show");
        query.set("collection", "Entries");
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        // tslint:disable-next-line: quotemark
        if (responseText == '{"status":"success","data":["Entries"]}') {
            generateContent();
        }
        else {
            let query = new URLSearchParams();
            query.set("command", "create");
            query.set("collection", "Entries");
            let response = await fetch(url + "?" + query.toString());
            let responseText = await response.text();
            console.log(responseText);
        }
    }
    async function generateContent() {
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        let entries = responseText.replace('{"status":"success","data":{', "").replace("}}}", "}").replace(/\\|}|"|name":|amount":|lastBought":|comment":|checked":|/g, "");
        let arr = entries.split("{");
        for (let entry of arr) {
            let newEntry = entry.split(",");
            if (newEntry.length == 5) {
                allEntries.push(newEntry);
            }
            else if (newEntry.length == 6) {
                allEntries.push(newEntry.splice(0, 5));
            }
        }
        for (let item of allEntries) {
            createEntry(item[0], Number(item[1]), item[2], item[3], item[4]);
        }
    }
    function createEntry(_name, _amount, _lastBought, _comment, _checked) {
        let container = document.createElement("div");
        container.classList.add("entry");
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("bought");
        checkbox.value = _name;
        checkbox.addEventListener("pointerdown", handleCheck);
        if (_checked == "true") {
            container.classList.add("checked");
            checkbox.checked = true;
        }
        let name = document.createElement("p");
        name.innerHTML = _name;
        name.classList.add("name");
        let amount = document.createElement("p");
        amount.innerHTML = _amount + "";
        amount.classList.add("amount");
        let date = document.createElement("p");
        date.innerHTML = _lastBought + "";
        date.classList.add("date");
        let comment = document.createElement("p");
        comment.innerHTML = _comment + "";
        comment.classList.add("comment");
        let button = document.createElement("button");
        button.innerHTML = "delete";
        button.addEventListener("pointerdown", deleteEntry);
        container.appendChild(name);
        container.appendChild(amount);
        container.appendChild(date);
        container.appendChild(comment);
        container.appendChild(checkbox);
        container.appendChild(button);
        wrapper.appendChild(container);
    }
    async function handleCheck(_event) {
        let target = _event.target;
        let parent = target.parentElement;
        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked");
            target.removeAttribute("checked");
        }
        else {
            parent.classList.add("checked");
            target.setAttribute("checked", "true");
            let today = new Date();
            let date = parent.querySelector(".date");
            let fullDate = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
            date.innerHTML = fullDate;
            let nameElement = parent.querySelector(".name");
            let name = nameElement.innerHTML;
            let query = new URLSearchParams();
            query.set("command", "find");
            query.set("collection", "Entries");
            query.set("data", '{"name":"' + name + '"}');
            console.log(query.toString());
            let response = await fetch(url + "?" + query.toString());
            let responseText = await response.text();
            let id = responseText.replace('{"status":"success","data":{"', "");
            let idOfEntry = id.split('":{"name"')[0];
            let query2 = new URLSearchParams();
            query2.set("command", "update");
            query2.set("collection", "Entries");
            query2.set("id", "" + idOfEntry);
            query2.set("data", '{"lastBought":' + fullDate + ',"checked":true}');
            let response2 = await fetch(url + "?" + query2.toString());
            let responseText2 = await response2.text();
            console.log(responseText2);
        }
    }
    function addProduct() {
        let formData = new FormData(document.forms[0]);
        let name = "";
        let amount = 0;
        let comment = "";
        for (let entry of formData) {
            switch (entry[0]) {
                case "name":
                    name = entry[1].toString();
                    break;
                case "amount":
                    amount = Number(entry[1]);
                    break;
                case "comment":
                    comment = entry[1].toString();
                    break;
                default:
                    break;
            }
        }
        createEntry(name, amount, "", comment, "false");
        sendToServer(name, amount, "", comment, "false");
    }
    async function deleteEntry(_event) {
        let target = _event.target;
        let parent = target.parentElement;
        let nameElement = parent.querySelector(".name");
        let name = nameElement.innerHTML;
        let query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        query.set("data", '{"name":"' + name + '"}');
        console.log(query.toString());
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        let id = responseText.replace('{"status":"success","data":{"', "");
        let idOfEntry = id.split('":{"name"')[0];
        let query2 = new URLSearchParams();
        query2.set("command", "delete");
        query2.set("collection", "Entries");
        query2.set("id", "" + idOfEntry);
        let response2 = await fetch(url + "?" + query2.toString());
        let responseText2 = await response2.text();
        console.log(responseText2);
        wrapper.removeChild(parent);
    }
    async function sendToServer(_name, _amount, _lastBought, _comment, _checked) {
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        //
        // tslint:disable-next-line: quotemark
        query.set("data", '{"name":"' + _name + '","amount":' + _amount + ',"lastBought":"' + _lastBought + '","comment":"' + _comment + '","checked":false}');
        console.log(query.toString());
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        console.log(responseText);
        alert(responseText);
    }
})(lektion06 || (lektion06 = {}));
//# sourceMappingURL=main.js.map