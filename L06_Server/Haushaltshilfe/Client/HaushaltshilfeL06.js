"use strict";
var L06_Household;
(function (L06_Household) {
    //Hinzufügen eiens load-Listeners 
    window.addEventListener("load", handleLoad);
    let url = "https://agkeia.herokuapp.com/";
    /**
     * Deklarieren von Variablen, für einfacheres Schreiben im Code und Deklaration
     * der globalen Variablen totalCost
     */
    let totalCost = 0;
    let form = document.querySelector("form"); /*
    let cart: HTMLButtonElement = <HTMLButtonElement>document.getElementById("cart");
    let getCash: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getCash"); */
    let householdDone = document.getElementById("householdDone");
    let resetButton = document.getElementById("resetButton");
    let submitButton = document.getElementById("submitButton");
    let totalPrice = document.getElementById("totalPrice");
    async function handleLoad(_event) {
        let response = await fetch("DataL06.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        let answer = await fetch("DetailL06.json");
        let offers = await answer.text();
        let detail = JSON.parse(offers);
        L06_Household.generateContent(data);
        L06_Household.createContent(detail);
        // Event-Listener auf alle Buttons, nachdem alles geladen wurde
        /*cart.addEventListener("click", handleChange);
        getCash.addEventListener("click", handleChange); */
        householdDone.addEventListener("click", handleChange); /*
        confirm.addEventListener("click", showInput);  */
        submitButton.addEventListener("click", sendOrder);
        resetButton.addEventListener("click", resetForm);
    }
    function handleChange(_event) {
        //Selektieren der drei Tabellen aus dem HTML, für jede Erledigung gibt es eine Tabelle
        let table = document.getElementById("table");
        let table2 = document.getElementById("table2");
        let table3 = document.getElementById("table3");
        // Erstellen der Form-Data Variable
        let formData = new FormData(document.forms[0]);
        // Iterieren über alle Einträge in formData
        for (let entry of formData) {
            // Erstellen einer Variable mit dem Wert des Eintrags
            let selector = "[value='" + entry[1] + "']";
            // Selektieren des HTML-Elements mit dem entsprechenden Wert
            let item = document.querySelector(selector);
            //Neue Tabellenzeile und insgesamt sechs Spalten erstellen
            let row = document.createElement("tr");
            let td = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td"); /*
            let td7 = document.createElement("td"); */
            // Erstellen eines Buttons, damit man den Eintrag später auch löschen kann 
            /* let deleteButton: HTMLButtonElement | null = document.createElement("button");
            // Hinzufügen eines Mülleimer-Symbols
            deleteButton.classList.add("far", "fa-trash-alt"); */
            // Switch-Case mit den Namen der Einträge 
            console.log(entry[1]);
            switch (entry[0]) {
                case "Menge":
                    break;
                case "product":
                    // Suchen nach dem Preis-Attribut 
                    let itemPrice = Number(item.getAttribute("price"));
                    // Wert aus dem Slider abgreufen 
                    let menge = String(entry[1]);
                    // Selektieren des HTML-Elements mit dem entsprechenden Wert
                    /* let slider: HTMLInputElement = <HTMLInputElement>document.querySelector(menge); */
                    let slider = formData.get(menge);
                    let amount = Number(slider);
                    // Wert, um welche Einheit es sich bei dem Artikel handelt suchen 
                    let einheit = String(item.getAttribute("unit"));
                    // Eintrag aus dem Supermarkt-Inputfeld suchen 
                    let markt = String(formData.get("market"));
                    // Den Preis aus Menge und dem jeweiligen Grundpreis des Artikels berechen
                    itemPrice = amount * itemPrice;
                    // Deklarieren einer Variablen, um den Gesamtpreis (inklusive Service-Gebühr) an 
                    // die Funktion deleteListener zu übergeben 
                    /*let gesamt = itemPrice + 0.5;
                    // Installieren des Event-Listeners auf dem Button und übergeben des Gesamtpreises
                     deleteButton.addEventListener("click", function () {
                        deleteList(gesamt, event);
                    }); */
                    // Eintragen der Werte in die Tabelle
                    td.innerHTML = "" + entry[1];
                    td2.innerHTML = "" + itemPrice.toFixed(2) + "€";
                    td3.innerHTML = "" + amount;
                    td4.innerHTML = "" + einheit;
                    td5.innerHTML = "" + 0.50 + "€";
                    td6.innerHTML = "" + markt;
                    // Die neuen Elemente in das HTML integrieren
                    /* td7.appendChild(deleteButton);  */
                    row.appendChild(td);
                    row.appendChild(td2);
                    row.appendChild(td3);
                    row.appendChild(td4);
                    row.appendChild(td5);
                    row.appendChild(td6); /*
                    row.appendChild(td7) */
                    table.appendChild(row);
                    // Hinzufügen des Preises zum Gesamtpreis
                    totalCost += itemPrice + 0.50;
                    break;
                case "money":
                    // Suchen nach dem Preis-Attribut 
                    // Der Wert wird rausgesucht und zum String umgewandelt
                    let money = String(item.getAttribute("value"));
                    // Wenn der Wert Geld abheben ist, muss der Wert aus dem slider mit den Grundkosten verrechnet werden 
                    // Der Wert vom Slider wird abgegriffen
                    let bargeld = Number(formData.get("bargeld"));
                    // Die Grundgebühr wird hinzugfeügt
                    let geld = bargeld + 5;
                    // Die Werte in die Tabellenspalten eintragen
                    td.innerHTML = "" + money;
                    td2.innerHTML = "" + geld + "€";
                    // Den Event-Listener zum Button hinzufügen und den Gesamtpreis übergeben
                    /* deleteButton.addEventListener("click", function () {
                        deleteList(geld, event);
                    });
                    // Alle neuen Elemente ins HTML integrieren
                    td3.appendChild(deleteButton); */
                    row.appendChild(td);
                    row.appendChild(td2); /*
                    row.appendChild(td3); */
                    table2.appendChild(row);
                    // Die Kosten zu den Gesamtkosten hinzufügen und dann das Form-Element leeren
                    totalCost += geld;
                    break;
                case "household":
                    // Suchen nach dem Preis-Attribut 
                    let itemCost = Number(item.getAttribute("price"));
                    //let unit:  string = "[unit='" + entry[1] +"']"; 
                    let units = String(item.getAttribute("unit"));
                    console.log(units);
                    // Nach dem selben Prinzip wie oben werden jetzt auch die Haushaltsarbeiten durchgearbeitet
                    td.innerHTML = "" + entry[1];
                    td2.innerHTML = "" + units;
                    td3.innerHTML = "" + itemCost + "€";
                    /*  deleteButton.addEventListener("click", function () {
                         deleteList(itemCost, event);
                     });
                     td3.appendChild(deleteButton); */
                    row.appendChild(td);
                    row.appendChild(td2);
                    row.appendChild(td3); /*
                    row.appendChild(td3) */
                    table3.appendChild(row);
                    totalCost += itemCost;
                    break;
                default:
                    break;
            }
            totalPrice.innerHTML = "";
            totalPrice.innerHTML = "<strong>Gesamtpreis: </strong>" + totalCost.toFixed(2) + "€";
        }
    }
    /* function deleteList(price: number, _event: any): void {
        // Der Preis wird vom Gesamtpreis abgezogen und die Anzeige aktualiiert
        totalCost -= price;
        totalPrice.innerHTML = "" + totalCost.toFixed(2) + "€";
        // Das Eltern-Element des Eltern-Elements des Buttons soll gelöscht werden.
        // Die enstprechenden Elemente werden selektiert und gelöscht
        let target: Node = <Node>_event.target;
        let parent: Node = <Node>target.parentNode;
        let grandParent: Node = <Node>parent.parentNode;
        let greatGrandParent: Node = <Node>grandParent.parentNode;
        parent.removeChild(target);
        grandParent.removeChild(parent);
        greatGrandParent.removeChild(grandParent);
    } */
    async function sendOrder(_event) {
        let formData = new FormData(document.forms[0]);
        console.log(form);
        for (let entry of formData) {
            console.log(entry[1]);
        }
        //Query-String zusammenbauen 
        let query = new URLSearchParams(formData);
        //Fetch (suchen der HTML-Datei (Haushaltshilfe))
        //await fetch("HaushaltshilfeL05.html?" + query.toString());
        let response = await fetch(url + "?" + query.toString());
        let responseText = await response.text();
        // Wenn der Button zum Abschicken gedrückt wurde, wird in einem Alert-Fenster eine Benachrichtigung mit dem Lieferdatum angezeigt
        let date = document.getElementById("date");
        let lieferdatum = date.value;
        let paypal = document.getElementById("Paypal");
        let überweisung = document.getElementById("Überweisung");
        let Zahlungsart;
        if (paypal.checked == true) {
            Zahlungsart = "Paypal";
        }
        else if (überweisung.checked == true) {
            Zahlungsart = "Überweisung";
        }
        else {
            Zahlungsart = "Bar";
        }
        alert("Ihre Bestellung wurde versandt und wird am " + lieferdatum + "  bei Ihnen sein!" + "\n Ihre Zahlungsart: "
            + Zahlungsart + "\n Ihre gesamte Bestellung kostet " + totalCost.toFixed(2) + "€" + "\n Ihre Bestellung: " + "\n" + responseText);
    }
    function enableSlider(_event) {
        let id = _event.target.id;
        let slider = document.querySelector("." + id);
        let range = document.querySelector(".range" + id);
        let range2 = document.querySelector(".range2" + id);
        if (_event.target.checked == true) {
            slider.disabled = false;
            range.style.opacity = "1";
            range2.style.opacity = "1";
        }
        else {
            slider.disabled = true;
            range.style.opacity = "0";
            range2.style.opacity = "0";
        }
    }
    L06_Household.enableSlider = enableSlider;
    function enableRadio() {
        let bank = document.getElementById("Bank");
        bank.disabled = false;
        let money = document.querySelector(".money");
        money.style.opacity = "1";
    }
    L06_Household.enableRadio = enableRadio;
    function resetForm(_event) {
        let table = document.getElementById("table");
        let table2 = document.getElementById("table2");
        let table3 = document.getElementById("table3");
        let list = document.querySelectorAll("#table > tr");
        let length = list.length;
        while (length > 0) {
            let tr = document.querySelector("#table > tr");
            table.removeChild(tr);
            length--;
        }
        let list2 = document.querySelectorAll("#table2 > tr");
        let length2 = list2.length;
        while (length2 > 0) {
            let tr = document.querySelector("#table2 > tr");
            table2.removeChild(tr);
            length2--;
        }
        let list3 = document.querySelectorAll("#table3 > tr");
        let length3 = list3.length;
        while (length3 > 0) {
            let tr = document.querySelector("#table3 > tr");
            table3.removeChild(tr);
            length3--;
        }
        totalCost = 0;
        totalPrice.innerHTML = "<strong>Gesamtpreis: </strong>  0.00€";
    }
})(L06_Household || (L06_Household = {}));
//# sourceMappingURL=HaushaltshilfeL06.js.map