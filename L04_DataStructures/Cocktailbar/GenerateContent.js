"use strict";
var L04_CocktailBar;
(function (L04_CocktailBar) {
    function generateContent(_data) {
        for (let category in _data) {
            // console.log(category);
            let items = _data[category];
            let group = null;
            switch (category) {
                case "Drink":
                    group = createSelect(items, category);
                    break;
                case "Container":
                    group = createSingle(items, category);
                    break;
                case "Extras":
                    group = createMultiple(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }
    L04_CocktailBar.generateContent = generateContent;
    function createSelect(_items, _category) {
        let group = document.createElement("div");
        let select = document.createElement("select");
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toFixed(2));
            option.value = item.name;
            console.log(item.name);
            select.name = _category;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            option.appendChild(label);
            select.appendChild(option);
        }
        group.appendChild(select);
        return group;
    }
    function createSingle(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
})(L04_CocktailBar || (L04_CocktailBar = {}));
//# sourceMappingURL=GenerateContent.js.map