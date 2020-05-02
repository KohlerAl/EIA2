namespace L02_Sequenzmemory {
    
    /**
     * Der Aufbau mit den Events ist im AD nicht ganz richtig. Keine Funktion wird irgendwo aufgerufen.
     * Ich hab das ganze mal so "interpretiert" wie ich denke, dass es gemeint war,
     * damit ich wenigstens schauen kann, ob der Aufbau grob hinaut. Nach Absprache über WhatsApp habe 
     * ich aus den DIV-Boxen mit den vordefinierten Sequenzen Input-Felder gemacht. Eine Hilfe-Funktion ist im AD
     * nicht zu finden, genauso wenig ist ein Eingabefeld da, mit dem der Nutzer festlegen kann, 
     * wie lange er die Karten sehen möchte. Da die Karten im UI-Scribble aufgedeckt sind und ich 
     * auch im AD nicht gesehen habe, dass die Karten verdeckt werden sollen, habe ich dazu nichts gecodet. 
     * Ich finde, das wäre zu viel "Einmischung" gewesen. 
     */

    let word : HTMLInputElement = <HTMLInputElement>document.getElementById("selectPredefined"); 
    let playground : HTMLDivElement = <HTMLDivElement>document.getElementById("playground"); 
    let ownWord: HTMLInputElement = <HTMLInputElement>document.getElementById("ownWord");
    let clock: HTMLInputElement = <HTMLInputElement>document.getElementById("clock"); 
    let timer: HTMLDivElement = <HTMLDivElement>document.getElementById("timer"); 
    let index: number = 0; 
    /**
     * Die beiden Buttons habe ich eingefügt, weil es beim Testen sonst sehr unübersichtlich 
     *  geworden wäre (und damit ich überhaupt was bekomme, um den nachfolgenenden Code zu testen)
     */
    let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    let text: HTMLButtonElement = <HTMLButtonElement>document.getElementById("text"); 

    /**
     * Laut der WhatsApp Nachricht soll der Wert für den Timer eingegeben, dann die Sequenz ausgesucht
     * und dann der Timer gestartet werden, wenn die Karten angezeigt werden. Ich rufe daher die Timer-
     * Funktion am Ende der Funktionen chooseSequence und createSequenz auf. 
     */

    button.addEventListener("click", chooseSequence);
    text.addEventListener("click", createSequenz); 

    function chooseSequence(): void {
        let sequence: string = word.value; 
        let sentence: string[] = sequence.split(""); 
        let temp1: number = sentence.length;

        /**
         * Das AD war hier ein bisschen vage, ich habe das jetzt mal so geschrieben wie ich es
         * verstanden habe (und den Lösungsweg kenne). Das AD lässt hier aber relativ viel Spielraum 
         */
        while (temp1 > 0) {
            let temp2: number = Math.floor(Math.random()*temp1); 
            temp1--; 
            let temp3: string = sentence[temp1]; 
            sentence[temp1] = sentence[temp2]; 
            sentence[temp2] = temp3; 
        }

        let temp4: number = sentence.length
        for (let index = 0; index < temp4; index++) {
            // Ich habe mich für span-Elemente entschieden, weil die (im Gegensatz zu divs) keinen
            // Zeilenumbruch erzeugen (und so soll es laut dem UI-Scribble aussehen)
            let card: HTMLSpanElement = document.createElement("span"); 
            card.className = "card"; 
            card.innerHTML = "" + sentence[index]; 
            playground.appendChild(card); 
        }
        setTimer; 
    }

    function createSequenz(): void {
        let sequence: string = ownWord.value; 
        let sentence: string[] = sequence.split(""); 
        let temp1: number = sentence.length;

        /**
         * Aus dem AD ist mir nicht klar geworden, ob innerhalb von createSequenz und chooseSequenz
         * dieselben Funktionen zum mischen und erstellen der Karten verwendet werden. Einerseits
         * wäre es logisch den Code einmal zu schreiben und zweimal aufzurufen,
         * aber so wie es im AD aussieht, sind es zwei getrennte Funktionen, deswegen schreibe
         * ich den Code zweimal (Update nachdem ich auf WhatsApp gefragt habe: eigentlich war ersteres gemeint)
         */
        while (temp1 > 0) {
            let temp2: number = Math.floor(Math.random()*temp1); 
            temp1--; 
            let temp3: string = sentence[temp1]; 
            sentence[temp1] = sentence[temp2]; 
            sentence[temp2] = temp3; 
        }

        let temp4: number = sentence.length
        for (let index = 0; index < temp4; index++) {
            let card: HTMLSpanElement = document.createElement("span"); 
            card.className = "card"; 
            /**
             * Der Event-Listener und die ID standen nicht dort im AD, wo die Karten erstellt werden, sondern
             *  in der Funktion checkCards. Da aber jede Karte separat einen Event-Listener bekommen soll, fand
             * ich, dass es einfacher ist, das direkt hier mit rein zu schreiben. 
             */
            card.addEventListener("click", function(): void {
                checkCards(sequence, event); 
            }); 
            card.id = "" + sentence[index]; 
            card.innerHTML = "" + sentence[index]; 
            playground.appendChild(card); 
        }

        setTimer(); 
    }

    function setTimer(): void {
        //Das AD sagt hier nur "Timer wird gestellt". Laut der WhatsApp Nachricht soll hier irgendwas mit 
        // "Array/ Schleife" passieren, ich nehme an, dass damit auch setInterval gemeint ist. 
        let time: number = Number(clock.value);  
        let countdown: number = 1; 
        timer.innerHTML = "" + time; 

        let i = setInterval(function(): void {
            let currentTime: number  = time - countdown; 
            timer.innerHTML = "" + currentTime; 
            countdown++; 
            if (currentTime == 0) {
                clearInterval(i); 
                timer.innerHTML = "Spiel beendet"; 
            }
        }, 1000);

    }

    function checkCards(_sequence: string, _event): void {
        let id = _event.target.id; 
        console.log(index); 
        console.log(_sequence[index]);
        // Im AD steht nicht, was passieren soll, wenn man alle Karten gefunden hat
        if (id == _sequence[index]) {
            index++; 
            playground.removeChild(_event.target);
        }
        else {
            // Hier war ich nicht ganz sicher, was ich mit "Fehlermeldung erscheint" anfangen soll. Deswegen habe ich mich für
            // einen alert entschieden. 
            alert("Diese Karte passt nicht"); 
        }
    }



    /**
     * Fazit: Leider ist das AD an einigen Stellen oberflächlich. Ich denke, wenn ich die Aufgabe nicht gekannt und selbst
     * schon ein Konzept und den Code geschrieben hätte, hätte ich große Probleme bei der Umsetzung bekommen. 
     * Du hast nirgends im AD Variablen angegeben (oder an andere Funktionen übergeben).
     * Aus Zeitgründen habe ich über viel hinweg gesehen (und stattdessen die Kommentare geschrieben).
     * Ich denke, im Ansatz ist im AD schon viel richtig und mit ein bisschen Zeit und Übung wir das bestimmt
     * besser. 
     */

}