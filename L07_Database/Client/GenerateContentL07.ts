namespace L07_Household {
    //Aufgabe07 erstellt am 03.06.2020 von Alida Kohler
    export function generateContent(_data: Data): void {
        for (let category in _data) {
            let items: Item[] = _data[category];
            let group: HTMLElement | null = null;
            switch (category) {
                case "product":
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

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);

        }
    }

    export function createContent(_detail: Detail): void {  
        for (let product in _detail) {
            let elements: Element[] = _detail[product];

            let group: HTMLElement | null = null;
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

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + product);
            if (fieldset && group)
                fieldset.insertBefore(group, fieldset.childNodes[0]);

        }
    }

    function createSlider(_parent: HTMLDivElement, _name: string, _box: HTMLInputElement, _unit: string): void {
        let slider = document.createElement("input"); 
        let span = document.createElement("span"); 
        span.innerHTML = "1"
        span.classList.add("range" + _name); 
        span.style.opacity = "0";
        slider.type = "range"; 
        slider.setAttribute("min", "1"); 
        slider.setAttribute("step", "1"); 
        slider.setAttribute("max", "5"); 
        slider.setAttribute("value", "1"); 
        slider.disabled = true; 
        slider.classList.add(_name); 
        slider.setAttribute("name", _name); 
        let span2 = document.createElement("span");
        _box.addEventListener("click", enableSlider); 
        span2.innerHTML = "5";  
        span2.classList.add("range2" + _name); 
        span2.style.opacity = "0"; 
        _parent.appendChild(span); 
        _parent.appendChild(slider); 
        _parent.appendChild(span2); 
        //_box.setAttribute("unit", _unit);
    }

    function createMultiple(_item: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _item) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            checkbox.setAttribute("unit", item.unit);

            let br: HTMLBRElement = document.createElement("br"); 

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);

            if (_category == "product") {
                createSlider(group, item.name, checkbox, item.unit); 
            }
            
            group.appendChild(br); 
        }
        return group;
    }

    function createRadio(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;

            radio.addEventListener("click", enableRadio); 

            let br: HTMLBRElement = document.createElement("br");

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(br);
        }
        return group;
    }


    function createSingle(_elements: Element[], _product: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _elements) {
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.value = item.name;
            radio.name = _product;
            radio.id = item.name;

            let br: HTMLBRElement = document.createElement("br");

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radio);
            group.appendChild(label);
            group.appendChild(br);
        }
        return group;
    }

    function createList(_elements: Element[], _product: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
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

        }
        return group;
    }
}
