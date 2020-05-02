"use strict";
var L02_Memory;
(function (L02_Memory) {
    // Definition von ein paar Variablen. Ich hab alle nach ihrer ID benannt, dann weiß man leichter welches Element man da grade hat :)
    let duration = document.getElementById("duration");
    let countdown = document.getElementById("countdown");
    let predefined = document.getElementById("predefined");
    let own = document.getElementById("own");
    let selectPredefined = document.getElementById("selectPredefined");
    let inputOwn = document.getElementById("inputOwn");
    let startTime = document.getElementById("startTime");
    let time = document.getElementById("time");
    let startDuration = document.getElementById("startDuration");
    let playground = document.getElementById("playground");
    let word = document.getElementById("word");
    /**
     * Wenn der Benutzer auf den ersten Button klickt, wird das jeweilige Inputfeld
     * deaktiviert. Dabei setzt man den disabled Wert des jeweiligen Inputfeldes auf "false"
     * Ich hab mir das so überlegt, dass nicht aus beiden Feldern gleichzeitig Werte auftauchen,
     * ist aber denke ich kein muss *Äffchen-Emoji*
     * */
    function disableInput() {
        if (predefined.checked == true) {
            //Hier wird die Dropdown-Input Box aktiviert 
            selectPredefined.disabled = false;
            inputOwn.disabled = true;
        }
        // Hier wird das Text-Inputfeld aktiviert
        else if (own.checked == true) {
            selectPredefined.disabled = true;
            inputOwn.disabled = false;
        }
    }
    function handleInput() {
        if (inputOwn.disabled == false) {
            // Hier greife ich den Wert aus dem Inputfeld ab und übergebe ihn an die Funktion mixLetters
            // Außerdem lasse ich das Wort in einer div-Box anzeigen
            word.innerHTML = "" + inputOwn.value;
            mixLetters(inputOwn.value);
        }
        else if (selectPredefined.disabled == false) {
            // Hier passiert dasselbe wie oben, nur mit dem Wert aus dem Dropdown-Inputfeld
            word.innerHTML = "" + selectPredefined.value;
            mixLetters(selectPredefined.value);
        }
    }
    /**
     *
     * Als nächstes wird der Wert aus dem Inputfeld/ der Dropdown-Box gemischt.
     * Das .split("") trennt einen string nach jedem Zeichen auf und macht ein Array
     * draus. (Also jedes Satzzeichen ist ein eigenes Element in nem Array). Als
     * nächstes wird das Array gemischt (das hab ich aus meiner EIA1-Endabgabe geklaut)
     */
    function mixLetters(_letter) {
        let res = _letter.split("");
        let ctr = res.length;
        while (ctr > 0) {
            //Zufällige Stelle im Array auswählen
            let index = Math.floor(Math.random() * ctr);
            // Die Variable eins runterzählen, die letzte Position des Arrays ist eins kleiner als die Länge, weil wir bei  anfangen zu zählen *Äffchen-Emoji*
            ctr--;
            // Temporäre Variable für das Letzte Element im Array
            let temp = res[ctr];
            // Dem Letzten Element die zufällig ausgesuchte Stelle geben
            res[ctr] = res[index];
            // Das Element von der zufälligen Stelle wird ans Ende des Arrays geschoben
            res[index] = temp;
        }
        // Als nächstes übergebe ich die Länge des Wortes, die Original-Sequenz und das gemischte Array an die Funktion startTimer
        let length = res.length;
        startTimer(length, res, _letter);
    }
    startTime.addEventListener("click", handleInput);
    let radioButton = document.getElementById("radioButton");
    radioButton.addEventListener("click", disableInput);
    // Die funktion holt sich den Wert aus dem Timer-Inputfeld und zeigt ihn in der Div-Box an (der Timer geht noch nicht los)
    function getTotalTime() {
        countdown.innerHTML = "" + duration.value;
    }
    time.addEventListener("click", getTotalTime);
    function startTimer(_length, _arrayMixed, _sequenceOriginal) {
        // Als erstes mache ich aus den Timer-Inputfeld-Werten Variablen vom Typ number (alles was aus nem Inputfeld kommt, ist erstmal ein string)
        let timer = Number(startDuration.value); //timer = Wie lange sollen die Karten zu Beginn des Spiels angezeigt werden 
        let y = Number(duration.value); // y = Gesamtdauer des Spiels 
        // Dann installiere ich den Event-Listener auf dem Keyboard (vorher macht das keinen Sinn, weil der Nutzer ja Eingaben macht)
        document.addEventListener("keydown", function () {
            // Ich gebe beim Funktionsaufruf das gemischte Array und die globale Variable index mit, damit der nächste Buchstabe, der geklickt werden soll, angezeigt wird
            getHint(_arrayMixed, index);
        });
        for (let index = 0; index < _length; index++) {
            /**
             * Jetzt erstelle ich die Karten. Dazu erschaffe ich ein neues div, gebe ihm die Klasse card und gebe jeder Karte ihren
             * Buchstaben als ID (damit ich nachher kontrollieren kann, ob die Karte passt). Damit der Spieler sieht, wo
             * welche Karte ist, lasse ich erstmal die Buchstaben anzeigen und zwar für die Zeit, die der Spieler eingegeben hat (siehe Zeile  146 )
             */
            let newCard = document.createElement("span");
            newCard.className = "card";
            newCard.id = "" + _arrayMixed[index];
            newCard.innerHTML = "" + _arrayMixed[index];
            playground.appendChild(newCard);
            // Jetzt werden alle Buttons deaktiviert, damit der Nutzer keinen Blödsinn macht 
            time.disabled = true;
            startTime.disabled = true;
            startDuration.disabled = true;
            radioButton.disabled = true;
            setTimeout(function () {
                // Nach ablauf der Zeit gebe ich den Karten den Event-Listener (damit der Spieler nicht anfängt zu spielen, wenn die Karten aufgedeckt sind)
                newCard.addEventListener("click", function () {
                    // Beim Aufruf gebe ich die Originale Sequenz (ungemischte Sequenz) und das event mit (damit ich nachher über event.target vergleichen kann)
                    checkCard(_sequenceOriginal, event);
                });
                // Die Funktion startGame wird aufgerufen und der Wert für die Gesamtdauer des Spiels mitgegeben
                startGame(y);
                // Die Buchstaben auf den Karten werden entfernt
                newCard.innerHTML = "";
            }, timer * 1000);
        }
        function startGame(_time) {
            let timer = 1;
            countdown.innerHTML = "" + _time;
            var i = setInterval(function () {
                let currentTime = _time - timer;
                countdown.innerHTML = "" + currentTime;
                timer++;
                if (currentTime == 0) {
                    clearInterval(i);
                    countdown.innerHTML = "Leider verloren :(";
                }
            }, 1000);
        }
        let index = 0;
        function checkCard(_original, _event) {
            // Hier hole ich mir die ID von event.target (hier die Karte auf die geklickt wurde)
            let id = _event.target.id;
            let stop = _original.length - 1;
            // Wenn die letzte Karte aufgedeckt wurde, wird eine Nachricht angezeigt und der Countdown gelöscht
            if (index == stop) {
                let playarea = document.getElementById("playarea");
                playarea.removeChild(countdown);
                playground.innerHTML = "YOU WIN :)";
            }
            // Jetzt wird die id mit der Stelle im Array verglichen (index ist null am Anfang)
            if (id == _original[index]) {
                // Wenn die Karte stimmt, wird die Karte grün, der Buchstabe wieder angezeigt und index eins hochgezählt
                _event.target.className = "cardgreen";
                _event.target.classList.remove = "card";
                _event.target.innerHTML = "" + _original[index];
                index++;
            }
            else {
                // Wenn die Karte nicht passt, wird die Karte für zwei Sekunden dunkelrot 
                _event.target.className = "carddark";
                _event.target.classList.remove = "card";
                setTimeout(function () {
                    _event.target.className = "card";
                    _event.target.classList.remove = "carddark";
                }, 2000);
            }
        }
    }
    // Und die Funktion für den Tipp (die nicht wirklich ausgereift ist) Es wird der nächste Buchstabe in ner Alert-Box angezeigt 
    function getHint(_sequence, index) {
        alert(_sequence[index]);
    }
})(L02_Memory || (L02_Memory = {}));
//# sourceMappingURL=Sequenzmemory.js.map