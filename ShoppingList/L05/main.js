"use strict";
var lektion05;
(function (lektion05) {
    let url = "https://kohleral.github.io/";
    let wrapper;
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        let add = document.querySelector("#add");
        add.addEventListener("pointerdown", addProduct);
        wrapper = document.querySelector(".container");
        let response = await fetch(url + "EIA2/ShoppingList/data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        generateContent(data);
    }
    function generateContent(_data) {
        let items = _data.entries;
        console.log(items);
        for (let item of items) {
            createEntry(item.name, item.amount, item.lastBought, item.comment, item.checked);
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
        if (_checked == true) {
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
    function handleCheck(_event) {
        let target = _event.target;
        console.log(target.value);
        let parent = target.parentElement;
        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked");
        }
        else {
            parent.classList.add("checked");
        }
        let today = new Date();
        let date = parent.querySelector(".date");
        date.innerHTML = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
    }
    function addProduct() {
        let formData = new FormData(document.forms[0]);
        let name = "";
        let amount = 0;
        let comment = "";
        for (let entry of formData) {
            console.log(entry[0] + "  " + entry[1]);
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
        createEntry(name, amount, "/", comment, false);
        sendToServer();
    }
    function deleteEntry(_event) {
        let target = _event.target;
        let parent = target.parentElement;
        wrapper.removeChild(parent);
    }
    async function sendToServer() {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        console.log(responseText);
        alert("Neuer Eintrag hinzugefügt");
    }
})(lektion05 || (lektion05 = {}));
//# sourceMappingURL=main.js.map