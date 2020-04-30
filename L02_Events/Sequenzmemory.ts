namespace L02_Memory {

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

        

    function disableInput(): void {
        if (predefined.checked == true) {
            console.log(predefined.checked)
            selectPredefined.disabled = false;
            inputOwn.disabled = true;
        }
        else if (own.checked == true) {
            selectPredefined.disabled = true;
            inputOwn.disabled = false;
        }
    }

    function mixLetters(_letter: string): void { 
        let res: string[] = _letter.split(""); 

        let ctr: number = res.length; 
        while (ctr > 0) {
            let index: number = Math.floor(Math.random()*ctr); 
            ctr --; 
            let temp: string = res[ctr]; 
            res[ctr] = res[index]; 
            res[index] = temp; 
        }

        let length: number = res.length; 
        startTimer(length, res, _letter); 
    }
    
    startTime.addEventListener("click", handleInput);

    function handleInput(): void {
        if (inputOwn.disabled == false) {
            word.innerHTML = "" + inputOwn.value; 
            mixLetters(inputOwn.value); 
        }
        else if (selectPredefined.disabled == false) {
            word.innerHTML= "" + selectPredefined.value; 
            mixLetters(selectPredefined.value);
        }
    }


    let radioButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("radioButton");
    radioButton.addEventListener("click", disableInput);

    function getTotalTime(): void {
        countdown.innerHTML = "" + duration.value; 
    }

    function startGame(_time: number): void {

        let countDownEnd: Date = new Date(); 
        let temp: number = countDownEnd.getSeconds(); 
        temp = temp + _time;
        
        var i = setInterval (function(): void {
            let now: Date = new Date(); 
            let store: number = now.getSeconds();
            
            let distance = temp - store; 

            countdown.innerHTML = distance + " s"; 

            if (distance == 0) {
                countdown.innerHTML = "GameOver :("; 
                clearInterval(i); 
                playground.innerHTML= ""; 
            }
            
        }, 1000); 
    }

    time.addEventListener("click", getTotalTime);
   
   function startTimer(_length: number, _arrayMixed: string[], _sequenceOriginal: string): void {
        
       let timer = Number(startDuration.value); 
       let y = Number(duration.value); 

       document.addEventListener("keydown", function() {
        getHint(_arrayMixed, index)
    }); 
       
       
       for (let index = 0; index < _length; index++) {
        let newCard: HTMLDivElement = document.createElement("div"); 
         
        newCard.className = "card"; 
           newCard.id = "" + _arrayMixed[index]; 
           newCard.innerHTML = "" + _arrayMixed[index]; 
           playground.appendChild(newCard); 
       
           time.disabled = true; 
           startTime.disabled = true; 
           startDuration.disabled = true; 
           radioButton.disabled = true; 

        setTimeout( function(): void {
            newCard.addEventListener("click", function(): void {
                checkCard(_sequenceOriginal, event); 
             });
        startGame(y); 
        newCard.innerHTML  = ""; 
        
       }, timer*1000); 
   }

   let index: number = 0; 
   function checkCard(_original: string, _event): void {

       
       let id = _event.target.id; 
       let stop: number = _original.length - 1; 
       console.log(id); 
       if (index == stop ) {
           let playarea: HTMLDivElement = <HTMLDivElement>document.getElementById("playarea"); 
           playarea.removeChild(countdown); 
           playground.innerHTML = "YOU WIN :)"
       }
       if (id == _original[index]) {
           _event.target.className = "cardgreen"; 
           _event.target.classList.remove = "card"
           _event.target.innerHTML = "" + _original[index]; 
           index++; 
           
       } 
       else {
             _event.target.className = "carddark";
             _event.target.classList.remove = "card"
           setTimeout( function(): void {
            _event.target.className = "card";
            _event.target.classList.remove = "carddark"
           }, 2000)
       }
       }
   }
   
   function getHint(_sequence: string[], index: number): void {
    
    alert(_sequence[index]);
    setTimeout( function() {
        
         console.log(_sequence); 
    }, 2000)
   }
}
