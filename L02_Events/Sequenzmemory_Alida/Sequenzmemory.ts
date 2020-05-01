namespace L02_Memory {
    
        // Definition von ein paar Variablen. Ich hab alle nach ihrer ID benannt, dann weiß man leichter welches Element man da grade hat :)
        let duration: HTMLInputElement = <HTMLInputElement>document.getElementById("duration");
        let countdown: HTMLDivElement = <HTMLDivElement>document.getElementById("countdown");

        let predefined: HTMLInputElement = <HTMLInputElement>document.getElementById("predefined");
        let own: HTMLInputElement = <HTMLInputElement>document.getElementById("own"); 

        let selectPredefined: HTMLInputElement = <HTMLInputElement>document.getElementById("selectPredefined");
        let inputOwn: HTMLInputElement = <HTMLInputElement>document.getElementById("inputOwn");

        let startTime: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startTime"); 
        let time: HTMLButtonElement = <HTMLButtonElement>document.getElementById("time");

        let startDuration: HTMLButtonElement = <HTMLButtonElement>document.getElementById("startDuration"); 
        let playground: HTMLDivElement = <HTMLDivElement>document.getElementById("playground"); 

        let word: HTMLDivElement = <HTMLDivElement>document.getElementById("word"); 

    
    /** 
     * Wenn der Benutzer auf den ersten Button klickt, wird das jeweilige Inputfeld 
     * deaktiviert. Dabei setzt man den disabled Wert des jeweiligen Inputfeldes auf "false"
     * Ich hab mir das so überlegt, dass nicht aus beiden Feldern gleichzeitig Werte auftauchen,
     * ist aber denke ich kein muss *Äffchen-Emoji*
     * */ 
    function disableInput(): void {
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



    function handleInput(): void {
        if (inputOwn.disabled == false) {
            // Hier greife ich den Wert aus dem Inputfeld ab und übergebe ihn an die Funktion mixLetters
            // Außerdem lasse ich das Wort in einer div-Box anzeigen
            word.innerHTML = "" + inputOwn.value; 
            mixLetters(inputOwn.value); 
        }
        else if (selectPredefined.disabled == false) {
            // Hier passiert dasselbe wie oben, nur mit dem Wert aus dem Dropdown-Inputfeld
            word.innerHTML= "" + selectPredefined.value; 
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

    function mixLetters(_letter: string): void { 
        let res: string[] = _letter.split(""); 

        let ctr: number = res.length; 
        while (ctr > 0) {
            //Zufällige Stelle im Array auswählen
            let index: number = Math.floor(Math.random()*ctr); 
            // Die Variable eins runterzählen, die letzte Position des Arrays ist eins kleiner als die Länge, weil wir bei  anfangen zu zählen *Äffchen-Emoji*
            ctr --; 
            // Temporäre Variable für das Letzte Element im Array
            let temp: string = res[ctr]; 
            // Dem Letzten Element die zufällig ausgesuchte Stelle geben
            res[ctr] = res[index]; 
            // Das Element von der zufälligen Stelle wird ans Ende des Arrays geschoben
            res[index] = temp; 
        }

        // Als nächstes übergebe ich die Länge des Wortes, die Original-Sequenz und das gemischte Array an die Funktion startTimer
        let length: number = res.length; 
        startTimer(length, res, _letter); 
    }
    
    startTime.addEventListener("click", handleInput);



    let radioButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("radioButton");
    radioButton.addEventListener("click", disableInput);

    // Die funktion holt sich den Wert aus dem Timer-Inputfeld und zeigt ihn in der Div-Box an (der Timer geht noch nicht los)

    function getTotalTime(): void {
        countdown.innerHTML = "" + duration.value; 
    }


    time.addEventListener("click", getTotalTime);
   
   function startTimer(_length: number, _arrayMixed: string[], _sequenceOriginal: string): void {


     // Als erstes mache ich aus den Timer-Inputfeld-Werten Variablen vom Typ number (alles was aus nem Inputfeld kommt, ist erstmal ein string)
       let timer = Number(startDuration.value); //timer = Wie lange sollen die Karten zu Beginn des Spiels angezeigt werden 
       let y = Number(duration.value); // y = Gesamtdauer des Spiels 

       // Dann installiere ich den Event-Listener auf dem Keyboard (vorher macht das keinen Sinn, weil der Nutzer ja Eingaben macht)
       document.addEventListener("keydown", function() {
        // Ich gebe beim Funktionsaufruf das gemischte Array und die globale Variable index mit, damit der nächste Buchstabe, der geklickt werden soll, angezeigt wird
        getHint(_arrayMixed, index)
    }); 
       
       
       for (let index = 0; index < _length; index++) {
        /**
         * Jetzt erstelle ich die Karten. Dazu erschaffe ich ein neues div, gebe ihm die Klasse card und gebe jeder Karte ihren 
         * Buchstaben als ID (damit ich nachher kontrollieren kann, ob die Karte passt). Damit der Spieler sieht, wo 
         * welche Karte ist, lasse ich erstmal die Buchstaben anzeigen und zwar für die Zeit, die der Spieler eingegeben hat (siehe Zeile  146 )
         */
        let newCard: HTMLDivElement = document.createElement("div"); 
         
        newCard.className = "card"; 
           newCard.id = "" + _arrayMixed[index]; 
           newCard.innerHTML = "" + _arrayMixed[index]; 
           playground.appendChild(newCard); 
        // Jetzt werden alle Buttons deaktiviert, damit der Nutzer keinen Blödsinn macht 
           time.disabled = true; 
           startTime.disabled = true; 
           startDuration.disabled = true; 
           radioButton.disabled = true; 

        setTimeout( function(): void {
            // Nach ablauf der Zeit gebe ich den Karten den Event-Listener (damit der Spieler nicht anfängt zu spielen, wenn die Karten aufgedeckt sind)
            newCard.addEventListener("click", function(): void {
                // Beim Aufruf gebe ich die Originale Sequenz (ungemischte Sequenz) und das event mit (damit ich nachher über event.target vergleichen kann)
                checkCard(_sequenceOriginal, event); 
             });
             // Die Funktion startGame wird aufgerufen und der Wert für die Gesamtdauer des Spiels mitgegeben
        startGame(y); 
        // Die Buchstaben auf den Karten werden entfernt
        newCard.innerHTML  = ""; 
        
       }, timer*1000); 
   }

   function startGame(_time: number): void {

    /**
     *  Hier starten wir den Timer. Wir erstellen eine Variable mit der Zeit vom Zeitpunkt, an dem die Funktion aufgrufen wurde
     * Uns interessieren hier nur die Sekunden, deswegen benutze ich getSeconds. Als nächstes addiere ich zu dieser Variable den 
     * Wert aus dem Timer Inputfeld dazu.
     */
    let countDownEnd: Date = new Date(); 
    let temp: number = countDownEnd.getSeconds(); 
    temp = temp + _time;
    
    var i = setInterval (function(): void {
        // In einem Intervall von einer Sekunde erstelle ich die Variable mit der aktuellen Zeit (wieder nur die Sekunden)
        let now: Date = new Date(); 
        let store: number = now.getSeconds();
        
        // Dann ziehe ich den Wert von oben von der aktuellen Zeit ab, damit der Timer rückwärts läuft
        let distance = temp - store; 

        // Hier lasse ich das ganze dann anzeigen, damit man auch was davon sieht
        countdown.innerHTML = distance + " s"; 

        if (distance == 0) {
            // Wenn der Timer null erreicht, stoppe ich das Intervall und zeige eine Nachricht an. Zudem lasse ich die Spielkarten verschwinden 
            countdown.innerHTML = "GameOver :("; 
            clearInterval(i); 
            playground.innerHTML= ""; 
        }
        
    }, 1000); 
}

   let index: number = 0; 
   // Der Error ist vom Linter, weil _event den Typ any hat *Äffchen-Emoji*, ich habs aber nicht besser hinbekommen und es geht trotzdem
   function checkCard(_original: string, _event): void {

       // Hier hole ich mir die ID von event.target (hier die Karte auf die geklickt wurde)
       let id = _event.target.id; 
       // Die Länge des Arrays minus eins (selber Grund wie oben)
       let stop: number = _original.length - 1; 
       // Wenn die letzte Karte aufgedeckt wurde, wird eine Nachricht angezeigt und der Countdown gelöscht
       if (index == stop ) {
           let playarea: HTMLDivElement = <HTMLDivElement>document.getElementById("playarea"); 
           playarea.removeChild(countdown); 
           playground.innerHTML = "YOU WIN :)"
       }
       // Jetzt wird die id mit der Stelle im Array verglichen (index ist null am Anfang)
       if (id == _original[index]) {
           // Wenn die Karte stimmt, wird die Karte grün, der Buchstabe wieder angezeigt und index eins hochgezählt
           _event.target.className = "cardgreen"; 
           _event.target.classList.remove = "card"
           _event.target.innerHTML = "" + _original[index]; 
           index++; 
           
       } 
       else {
           // Wenn die Karte nicht passt, wird die Karte für zwei Sekunden dunkelrot 
             _event.target.className = "carddark";
             _event.target.classList.remove = "card"
           setTimeout( function(): void {
            _event.target.className = "card";
            _event.target.classList.remove = "carddark"
           }, 2000)
       }
       }
   }
   
   // Und die Funktion für den Tipp (die nicht wirklich ausgereift ist) Es wird der nächste Buchstabe in ner Alert-Box angezeigt 
   function getHint(_sequence: string[], index: number): void {
    
    alert(_sequence[index]);
   }
}