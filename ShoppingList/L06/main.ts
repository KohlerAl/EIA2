namespace lektion06 {

    let url: string = "https://webuser.hs-furtwangen.de/~kohleral/EIA2/";

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

    let allEntries: string[][] = [];

    let wrapper: HTMLDivElement;
    window.addEventListener("load", handleLoad);

    async function handleLoad(): Promise<void> {
        let add: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add");
        add.addEventListener("pointerdown", addProduct);

        wrapper = <HTMLDivElement>document.querySelector(".container");

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "show");
        query.set("collection", "Entries");

        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();

        // tslint:disable-next-line: quotemark
        if (responseText == '{"status":"success","data":["Entries"]}') {

            generateContent();

        }

        else {
            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "create");
            query.set("collection", "Entries");

            let response: Response = await fetch(url + "?" + query.toString());
            let responseText: string = await response.text();
            console.log(responseText);

        }

    }

    async function generateContent(): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");

        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        let entries: string = responseText.replace('{"status":"success","data":{', "").replace("}}}", "}").replace(/\\|}|"|name":|amount":|lastBought":|comment":|checked":|/g, "");
        let arr: string[] = entries.split("{");

        for (let entry of arr) {
            let newEntry: string[] = entry.split(",");
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

    function createEntry(_name: string, _amount: number, _lastBought: string, _comment: string, _checked: string): void {
        let container: HTMLDivElement = document.createElement("div");
        container.classList.add("entry");

        let checkbox: HTMLInputElement = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add("bought");
        checkbox.value = _name;
        checkbox.addEventListener("pointerdown", handleCheck);

        if (_checked == "true") {
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

    async function handleCheck(_event: PointerEvent): Promise<void> {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        let parent: HTMLDivElement = <HTMLDivElement>target.parentElement;

        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked");
            target.removeAttribute("checked");
        }

        else {
            parent.classList.add("checked");
            target.setAttribute("checked", "true");

            let today: Date = new Date();
            let date: HTMLParagraphElement = <HTMLParagraphElement>parent.querySelector(".date");
            let fullDate: string = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
            date.innerHTML = fullDate;

            let nameElement: HTMLParagraphElement = <HTMLParagraphElement>parent.querySelector(".name");
            let name: string = nameElement.innerHTML;

            let query: URLSearchParams = new URLSearchParams();
            query.set("command", "find");
            query.set("collection", "Entries");
            query.set("data", '{"name":"' + name + '"}');
            console.log(query.toString());

            let response: Response = await fetch(url + "?" + query.toString());
            let responseText: string = await response.text();

            let id: string = responseText.replace('{"status":"success","data":{"', "");
            let idOfEntry: string = id.split('":{"name"')[0];

            let query2: URLSearchParams = new URLSearchParams();
            query2.set("command", "update");
            query2.set("collection", "Entries");
            query2.set("id", "" + idOfEntry);
            query2.set("data", '{"lastBought":' + fullDate + ',"checked":true}');

            let response2: Response = await fetch(url + "?" + query2.toString());
            let responseText2: string = await response2.text();
            console.log(responseText2);
        }


    }

    function addProduct(): void {
        let formData: FormData = new FormData(document.forms[0]);

        let name: string = "";
        let amount: number = 0;
        let comment: string = "";
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

    async function deleteEntry(_event: PointerEvent): Promise<void> {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        let parent: HTMLDivElement = <HTMLDivElement>target.parentElement;

        let nameElement: HTMLParagraphElement = <HTMLParagraphElement>parent.querySelector(".name");
        let name: string = nameElement.innerHTML;

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", "Entries");
        query.set("data", '{"name":"' + name + '"}');
        console.log(query.toString());

        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();

        let id: string = responseText.replace('{"status":"success","data":{"', "");
        let idOfEntry: string = id.split('":{"name"')[0];

        let query2: URLSearchParams = new URLSearchParams();
        query2.set("command", "delete");
        query2.set("collection", "Entries");
        query2.set("id", "" + idOfEntry);

        let response2: Response = await fetch(url + "?" + query2.toString());
        let responseText2: string = await response2.text();
        console.log(responseText2);
        wrapper.removeChild(parent);
    }

    async function sendToServer(_name: string, _amount: number, _lastBought: string, _comment: string, _checked: string): Promise<void> {
        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Entries");
        //
        // tslint:disable-next-line: quotemark
        query.set("data", '{"name":"' + _name + '","amount":' + _amount + ',"lastBought":"' + _lastBought + '","comment":"' + _comment + '","checked":false}');
        console.log(query.toString());
        let response: Response = await fetch(url + "?" + query.toString());
        let responseText: string = await response.text();
        console.log(responseText);

        alert(responseText);
    }
}