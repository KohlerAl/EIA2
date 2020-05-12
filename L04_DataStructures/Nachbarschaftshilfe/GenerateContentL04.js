"use strict";
var L04_Haushaltshilfe;
(function (L04_Haushaltshilfe) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "produce":
                    group = createDatalist(items, category);
                    break;
                case "market":
                    group = createDatalist(items, category);
                    break;
                case "money":
                    group = createRadio(items, category);
                    break;
                case "household":
                    group = createMultiple(items, category);
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);
        }
    }
    L04_Haushaltshilfe.generateContent = generateContent;
    function createDatalist(_item, _category) {
        let group = document.createElement("div");
        let input = document.createElement("input");
        input.name = _category;
        input.setAttribute("list", _category);
        input.setAttribute("placeholder", "Choose " + _category);
        //input.name = _category; 
        let datalist = document.createElement("datalist");
        datalist.id = _category;
        for (let item of _item) {
            let option = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;
            option.setAttribute("unit", item.unit);
            option.setAttribute("price", item.price.toFixed(2));
            option.id = item.name;
            //let label: HTMLLabelElement = document.createElement("label"); 
            //label.textContent = item.name; 
            //label.htmlFor = item.name; 
            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);
            //datalist.appendChild(label);  
        }
        return group;
    }
    function createMultiple(_item, _category) {
        let group = document.createElement("div");
        for (let item of _item) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let br = document.createElement("br");
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
            group.appendChild(br);
        }
        return group;
    }
    function createRadio(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;
            let br = document.createElement("br");
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(br);
        }
        return group;
    }
})(L04_Haushaltshilfe || (L04_Haushaltshilfe = {}));
//# sourceMappingURL=GenerateContentL04.js.map