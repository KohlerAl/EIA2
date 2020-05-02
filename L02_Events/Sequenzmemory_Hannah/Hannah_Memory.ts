namespace L02_Sequenzmemory {
    
    /**
     * Der Aufbau mit den Events ist nicht ganz richtig. Keine Funktion wird irgendwo aufgerufen.
     * Ich hab das ganze mal so "interpretiert" wie ich denke, dass es gemeint war,
     *  damit ich wenigstens schauen kann, ob der Aufbau grob hinaut
     */

    let word : HTMLInputElement = <HTMLInputElement>document.getElementById("selectPredefined"); 
    let playground : HTMLDivElement = <HTMLDivElement>document.getElementById("playground"); 
    let ownWord: HTMLInputElement = <HTMLInputElement>document.getElementById("ownWord");
    /**
     * Die beiden Buttons habe ich eingefügt, weil es beim Testen sonst sehr unübersichtlich 
     *  geworden wäre (und damit ich überhaupt was bekomme, um den nachfolgenenden Code zu testen)
     */
    let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("button");
    let text: HTMLButtonElement = <HTMLButtonElement>document.getElementById("text"); 

    button.addEventListener("click", chooseSequence);
    text.addEventListener("click", createSequenz)

    function chooseSequence(): void {
        let sequence: string = word.value; 
        let sentence: string[] = sequence.split(""); 
        let temp1: number = sentence.length;

        /**
         * Das AD war hier ein bisschen vage, ich habe das jetzt mal so geschrieben wie ich es
         * verstanden habe (und den Lösungsweg kenne)
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
            console.log(sentence[index]); 
            card.className = "card"; 
            card.innerHTML = "" + sentence[index]; 
            playground.appendChild(card); 
        }
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
         * ich den Code zweimal 
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
            console.log(sentence[index]); 
            card.className = "card"; 
            card.innerHTML = "" + sentence[index]; 
            playground.appendChild(card); 
        }
    }

}