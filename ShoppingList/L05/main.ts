namespace lektion05 {
    let url: string = "https://kohleral.github.io/";

    export interface Item {
        name: string;
        amount: number;
        lastBought: string; 
        comment: string;
        checked: boolean; 
    }

    export interface Entry {
        [category: string]: Item[];
    }
    
    let wrapper: HTMLDivElement;
    window.addEventListener("load", handleLoad);

    async function handleLoad(): Promise<void> {
        let add: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add");
        add.addEventListener("pointerdown", addProduct);

        wrapper = <HTMLDivElement>document.querySelector(".container");

        let response: Response = await fetch(url + "EIA2/ShoppingList/data.json");
        let offer: string = await response.text();
        let data: Entry = JSON.parse(offer);
        generateContent(data);
    }

    function generateContent(_data: Entry): void {
        let items: Item[] = _data.entries;
        console.log(items);

        for (let item of items) {
            createEntry(item.name, item.amount, item.lastBought, item.comment, item.checked);
        }

    }

    function createEntry(_name: string, _amount: number, _lastBought: string, _comment: string, _checked: boolean): void {
        let container: HTMLDivElement = document.createElement("div");
        container.classList.add("entry");

        let checkbox: HTMLInputElement = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("bought");
        checkbox.value = _name;
        checkbox.addEventListener("pointerdown", handleCheck);

        if (_checked == true) {
            container.classList.add("checked");
            checkbox.checked = true;
        }

        let name: HTMLParagraphElement = document.createElement("p");
        name.innerHTML = _name;
        name.classList.add("name");

        let amount: HTMLParagraphElement = document.createElement("p");
        amount.innerHTML = _amount + "";
        amount.classList.add("amount");

        let date: HTMLParagraphElement = document.createElement("p");
        date.innerHTML = _lastBought + "";
        date.classList.add("date");

        let comment: HTMLParagraphElement = document.createElement("p");
        comment.innerHTML = _comment + "";
        comment.classList.add("comment");

        let button: HTMLButtonElement = document.createElement("button"); 
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

    function handleCheck(_event: PointerEvent): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log(target.value);

        let parent: HTMLDivElement = <HTMLDivElement>target.parentElement;

        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked");
        }

        else {
            parent.classList.add("checked");
        }

        let today: Date = new Date(); 
        let date: HTMLParagraphElement = <HTMLParagraphElement>parent.querySelector(".date"); 
        date.innerHTML = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(); 
    }

    function addProduct(): void {
        let formData: FormData = new FormData(document.forms[0]);

        let name: string = "";
        let amount: number = 0;
        let comment: string = "";
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

    function deleteEntry(_event: PointerEvent): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        let parent: HTMLDivElement = <HTMLDivElement>target.parentElement; 

        wrapper.removeChild(parent);
    }

    async function sendToServer(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        console.log(responseText); 

        alert("Neuer Eintrag hinzugefügt"); 
    }
}