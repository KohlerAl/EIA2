"use strict";
var L04_Haushaltshilfe;
(function (L04_Haushaltshilfe) {
    //Hinzufügen eiens load-Listeners 
    window.addEventListener("load", handleLoad);
    /**
     * Deklarieren von Variablen, für einfacheres Schreiben im Code und Deklaration
     * der globalen Variablen totalCost
     */
    let totalCost = 0;
    let form = document.querySelector("form");
    let confirm = document.getElementById("confirm");
    let grocery = document.getElementById("grocery");
    let money = document.getElementById("money");
    let household = document.getElementById("household");
    let cart = document.getElementById("cart");
    let getCash = document.getElementById("getCash");
    let householdDone = document.getElementById("householdDone");
    let submit = document.getElementById("submit");
    let totalPrice = document.getElementById("totalPrice");
    function handleLoad() {
        console.log("HaushaltshilfeL04 ready");
        L04_Haushaltshilfe.generateContent(L04_Haushaltshilfe.data);
        L04_Haushaltshilfe.createContent(L04_Haushaltshilfe.detail);
        // Event-Listener auf alle Buttons, nachdem alles geladen wurde
        cart.addEventListener("click", handleChange);
        getCash.addEventListener("click", handleChange);
        householdDone.addEventListener("click", handleChange);
        confirm.addEventListener("click", showInput);
        submit.addEventListener("click", sendOrder);
    }
    function showInput() {
        /**
         * Aktivieren des Fieldsets, für das sich der Nutzer entschieden hat und
         * deaktivieren der anderen, damit versehentliche Eingaben vermieden werden.
         */
        let cash = document.getElementById("cash");
        let shopping = document.getElementById("shopping");
        let house = document.getElementById("house");
        if (cash.checked == true) {
            grocery.disabled = true;
            money.disabled = false;
            household.disabled = true;
        }
        else if (shopping.checked == true) {
            grocery.disabled = false;
            money.disabled = true;
            household.disabled = true;
        }
        else if (house.checked == true) {
            grocery.disabled = true;
            money.disabled = true;
            household.disabled = false;
        }
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
            console.log(entry);
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
            let td6 = document.createElement("td");
            let td7 = document.createElement("td");
            // Erstellen eines Buttons, damit man den Eintrag später auch löschen kann 
            let deleteButton = document.createElement("button");
            // Hinzufügen eines Mülleimer-Symbols
            deleteButton.classList.add("far", "fa-trash-alt");
            // Switch-Case mit den Namen der Einträge 
            console.log(entry);
            switch (entry[0]) {
                case "Menge":
                    break;
                case "produce":
                    // Suchen nach dem Preis-Attribut 
                    let itemPrice = Number(item.getAttribute("price"));
                    // Wert aus dem Slider abgreufen 
                    let menge = Number(formData.get("Menge"));
                    // Wert, um welche Einheit es sich bei dem Artikel handelt suchen 
                    let einheit = String(item.getAttribute("unit"));
                    // Eintrag aus dem Supermarkt-Inputfeld suchen 
                    let markt = String(formData.get("market"));
                    console.log(markt);
                    // Den Preis aus Menge und dem jeweiligen Grundpreis des Artikels berechen
                    itemPrice = menge * itemPrice;
                    // Deklarieren einer Variablen, um den Gesamtpreis (inklusive Service-Gebühr) an 
                    // die Funktion deleteListener zu übergeben 
                    let gesamt = itemPrice + 0.5;
                    // Installieren des Event-Listeners auf dem Button und übergeben des Gesamtpreises
                    deleteButton.addEventListener("click", function () {
                        deleteList(gesamt, event);
                    });
                    // Eintragen der Werte in die Tabelle
                    td.innerHTML = "" + entry[1];
                    td2.innerHTML = "" + itemPrice.toFixed(2) + "€";
                    td3.innerHTML = "" + menge;
                    td4.innerHTML = "" + einheit;
                    td5.innerHTML = "" + 0.50 + "€";
                    td6.innerHTML = "" + markt;
                    // Die neuen Elemente in das HTML integrieren
                    td7.appendChild(deleteButton);
                    row.appendChild(td);
                    row.appendChild(td2);
                    row.appendChild(td3);
                    row.appendChild(td4);
                    row.appendChild(td5);
                    row.appendChild(td6);
                    row.appendChild(td7);
                    table.appendChild(row);
                    // Hinzufügen des Preises zum Gesamtpreis
                    totalCost += itemPrice + 0.50;
                    // Das Form-Element wird geleert, damit der Nutzer die Eingaben nicht selbst löschen muss 
                    form.reset();
                    break;
                case "money":
                    // Suchen nach dem Preis-Attribut 
                    // Der Wert wird rausgesucht und zum String gemacht, um ihn in der if-else Anweisung vergleichen zu können
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
                    deleteButton.addEventListener("click", function () {
                        deleteList(geld, event);
                    });
                    // Alle neuen Elemente ins HTML integrieren
                    td3.appendChild(deleteButton);
                    row.appendChild(td);
                    row.appendChild(td2);
                    row.appendChild(td3);
                    table2.appendChild(row);
                    // Die Kosten zu den Gesamtkosten hinzufügen und dann das Form-Element leeren
                    totalCost += geld;
                    form.reset();
                    break;
                case "household":
                    // Suchen nach dem Preis-Attribut 
                    let itemCost = Number(item.getAttribute("price"));
                    // Nach dem selben Prinzip wie oben werden jetzt auch die Haushaltsarbeiten durchgearbeitet
                    td.innerHTML = "" + entry[1];
                    td2.innerHTML = "" + itemCost + "€";
                    deleteButton.addEventListener("click", function () {
                        deleteList(itemCost, event);
                    });
                    td3.appendChild(deleteButton);
                    row.appendChild(td);
                    row.appendChild(td2);
                    row.appendChild(td3);
                    table3.appendChild(row);
                    totalCost += itemCost;
                    form.reset();
                    break;
            }
            // Der Gesamtpreis wird in der Bestellübersicht angezeigt, nachdem der alte Preis-Eintrag gelöscht wurde
            totalPrice.innerHTML = "";
            totalPrice.innerHTML = "<strong>Gesamtpreis: </strong>" + totalCost.toFixed(2) + "€";
        }
    }
    function deleteList(price, _event) {
        // Der Preis wird vom Gesamtpreis abgezogen und die Anzeige aktualiiert
        totalCost -= price;
        totalPrice.innerHTML = "" + totalCost.toFixed(2) + "€";
        // Das Eltern-Element des Eltern-Elements des Buttons soll gelöscht werden.
        // Die enstprechenden Elemente werden selektiert und gelöscht
        let target = _event.target;
        let parent = target.parentNode;
        let grandParent = parent.parentNode;
        let greatGrandParent = grandParent.parentNode;
        parent.removeChild(target);
        grandParent.removeChild(parent);
        greatGrandParent.removeChild(grandParent);
    }
    function sendOrder(_event) {
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
        alert("Ihre Bestellung wurde versandt und wird am " + lieferdatum + "  bei Ihnen sein!" + "\n Ihre Zahlungsart: " + Zahlungsart + "\n Ihre gesamte Bestellung kostet " + totalCost + "€");
    }
})(L04_Haushaltshilfe || (L04_Haushaltshilfe = {}));
//# sourceMappingURL=HaushaltshilfeL04.js.map