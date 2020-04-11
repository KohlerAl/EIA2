namespace L04_CocktailBar {

    export function generateContent(_data: Data): void {

        for (let category in _data) {
            // console.log(category);
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
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

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group)
                fieldset.appendChild(group);
        }
    }

    function createSelect(_items: Item[], _category: string): HTMLElement | null {
       let group: HTMLDivElement = document.createElement("div");
       let select: HTMLSelectElement = document.createElement("select");
       for( let item of _items) {
           
           let option: HTMLOptionElement = document.createElement("option"); 
           option.setAttribute("price", item.price.toFixed(2));
           option.value = item.name; 
           console.log(item.name);
           select.name = _category; 
        
           let label: HTMLLabelElement = document.createElement("label");
           label.textContent = item.name;
           label.htmlFor = item.name;
           option.appendChild(label);
           
           select.appendChild(option);
       
       }
       group.appendChild(select);
        return group;
    }
    function createSingle(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.name;
            radio.name = _category;
            radio.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }
    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
}