"use strict";
var L05_Haushaltshilfe;
(function (L05_Haushaltshilfe) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            switch (category) {
                case "produce":
                    group = createMultiple(items, category);
                    break;
                case "money":
                    group = createRadio(items, category);
                    break;
                case "household":
                    group = createMultiple(items, category);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);
        }
    }
    L05_Haushaltshilfe.generateContent = generateContent;
    function createContent(_detail) {
        for (let product in _detail) {
            let elements = _detail[product];
            let group = null;
            switch (product) {
                case "market":
                    group = createList(elements, product);
                    break;
                case "zahlungsart":
                    group = createSingle(elements, product);
                    break;
                default:
                    break;
            }
            let fieldset = document.querySelector("fieldset#" + product);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);
        }
    }
    L05_Haushaltshilfe.createContent = createContent;
    function createSlider(_parent, _name, _box, _unit) {
        let slider = document.createElement("input");
        let span = document.createElement("span");
        span.innerHTML = "1";
        slider.type = "range";
        slider.setAttribute("min", "1");
        slider.setAttribute("step", "1");
        slider.setAttribute("max", "5");
        slider.setAttribute("value", "1");
        slider.classList.add(_name);
        let span2 = document.createElement("span");
        span2.innerHTML = "5";
        _parent.appendChild(span);
        _parent.appendChild(slider);
        _parent.appendChild(span2);
        _box.setAttribute("unit", _unit);
        return slider;
    }
    /* function createDatalist(_item: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        let input: HTMLInputElement = document.createElement("input");
        if (_category == "produce") {
            createSlider(group);
        }
        input.setAttribute("list", _category + "s");
        input.setAttribute("placeholder", "Produkt auswählen");
        input.name = _category;
        let datalist: HTMLDataListElement = document.createElement("datalist");
        datalist.id = _category + "s";
        for (let item of _item) {
            let option: HTMLOptionElement = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;
            option.setAttribute("unit", item.unit);
            option.setAttribute("price", item.price.toFixed(2));

            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);

        }
        return group;

    } */
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
            if (_category == "produce") {
                createSlider(group, item.name, checkbox, item.unit);
            }
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
    function createSingle(_elements, _product) {
        let group = document.createElement("div");
        for (let item of _elements) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.value = item.name;
            radio.name = _product;
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
    function createList(_elements, _product) {
        let group = document.createElement("div");
        let input = document.createElement("input");
        input.setAttribute("list", _product + "s");
        input.setAttribute("placeholder", "Supermarkt auswählen");
        input.name = _product;
        let datalist = document.createElement("datalist");
        datalist.id = _product + "s";
        for (let item of _elements) {
            let option = document.createElement("option");
            option.setAttribute("name", item.name);
            option.value = item.name;
            group.appendChild(input);
            group.appendChild(datalist);
            datalist.appendChild(option);
        }
        return group;
    }
})(L05_Haushaltshilfe || (L05_Haushaltshilfe = {}));
//# sourceMappingURL=GenerateContentL05.js.map