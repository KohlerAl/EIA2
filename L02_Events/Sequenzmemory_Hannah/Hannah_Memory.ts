namespace L02_Sequenzmemory {
    
    /**
     * Der Aufbau mit den Events ist nicht ganz richtig. Keine Funktion wird irgendwo aufgerufen.
     * Ich hab das ganze mal so "interpretiert" wie ich denke, dass es gemeint war,
     * damit ich wenigstens schauen kann, ob der Aufbau grob hinaut. Eine Hilfe-Funktion ist im AD
     * nicht zu finden, daher habe ich auch keine geschrieben 
     */

    let word : HTMLInputElement = <HTMLInputElement>document.getElementById("selectPredefined"); 
    let playground : HTMLDivElement = <HTMLDivElement>document.getElementById("playground"); 
    let ownWord: HTMLInputElement = <HTMLInputElement>document.getElementById("ownWord");
    let clock: HTMLInputElement = <HTMLInputElement>document.getElementById("clock"); 
    let timer: HTMLDivElement = <HTMLDivElement>document.getElementById("timer"); 
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
         * Aus dem AD ist mir nicht klar geworden, ob innerhalb von createSquenz und chooseSequenz
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
            card.innerHTML = "" + sentence[index]; 
            playground.appendChild(card); 
        }

        setTimer(); 
    }

    function setTimer(): void {
        //Das AD sagt hier nur "Timer wird gestellt". Laut der WhatsApp Nachricht soll hier irgendwas mit 
        // "Array/ Schleife" passieren, ich nehme an, dass damit auch setInterval gemeint ist. l
        // Update: Ich habe eine einfache Lösung gefunden und sie in diesen Code und in meine Umsetzung meines Konzeptes geschrieben. 
        let time: number = Number(clock.value);  
        let countdown: number = 1; 
        timer.innerHTML = "" + time; 

        let i = setInterval(function(): void {
            let currentTime: number  = time - countdown; 
            console.log(currentTime); 
            timer.innerHTML = "" + currentTime; 
            countdown++; 
            if (currentTime == 0) {
                clearInterval(i); 
                timer.innerHTML = "Spiel beendet"; 
            }
        }, 1000);

    }

    /**
     * Fazit: Leider ist das AD sehr oberflächlich. Ich denke, wenn ich die Aufgabe nicht gekannt und selbst
     * schon ein Konzept und den Code geschrieben hätte, hätte ich große Probleme bei der Umsetzung bekommen. 
     * Aus Zeitgründen habe ich über viel hinweg gesehen (und stattdessen die Kommentare geschrieben).
     * Ich denke, im Ansatz ist im AD schon viel richtig und mit ein bisschen Zeit und Übung wir das bestimmt
     * besser. 
     */

}