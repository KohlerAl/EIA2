namespace L04_Haushaltshilfe {
    export function generateContent(_data: Data): void {
        for (let category in _data) {
            let items: Item[] = _data[category];
            console.log(items); 
            console.log("Hello")
            let group: HTMLElement | null = null;
            switch (category) {
                case "produce":
                    group = createDatalist(items, category);
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

    function createDatalist(_item: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        let input: HTMLInputElement = document.createElement("input");
        input.setAttribute("list", _category + "s");
        input.setAttribute("placeholder", "Choose " + _category);
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

            let br: HTMLBRElement = document.createElement("br");

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);
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
        input.setAttribute("placeholder", "Choose " + _product);
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
