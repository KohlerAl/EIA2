"use strict";
var L02_Memory;
(function (L02_Memory) {
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
    function disableInput() {
        if (predefined.checked == true) {
            console.log(predefined.checked);
            selectPredefined.disabled = false;
            inputOwn.disabled = true;
        }
        else if (own.checked == true) {
            selectPredefined.disabled = true;
            inputOwn.disabled = false;
        }
    }
    function mixLetters(_letter) {
        let res = _letter.split("");
        let ctr = res.length;
        while (ctr > 0) {
            let index = Math.floor(Math.random() * ctr);
            ctr--;
            let temp = res[ctr];
            res[ctr] = res[index];
            res[index] = temp;
        }
        let length = res.length;
        startTimer(length, res, _letter);
    }
    startTime.addEventListener("click", handleInput);
    function handleInput() {
        if (inputOwn.disabled == false) {
            word.innerHTML = "" + inputOwn.value;
            mixLetters(inputOwn.value);
        }
        else if (selectPredefined.disabled == false) {
            word.innerHTML = "" + selectPredefined.value;
            mixLetters(selectPredefined.value);
        }
    }
    let radioButton = document.getElementById("radioButton");
    radioButton.addEventListener("click", disableInput);
    function getTotalTime() {
        countdown.innerHTML = "" + duration.value;
    }
    function startGame(_time) {
        let countDownEnd = new Date();
        let temp = countDownEnd.getSeconds();
        temp = temp + _time;
        var i = setInterval(function () {
            let now = new Date();
            let store = now.getSeconds();
            let distance = temp - store;
            countdown.innerHTML = distance + " s";
            if (distance == 0) {
                countdown.innerHTML = "GameOver :(";
                clearInterval(i);
                playground.innerHTML = "";
            }
        }, 1000);
    }
    time.addEventListener("click", getTotalTime);
    function startTimer(_length, _arrayMixed, _sequenceOriginal) {
        let timer = Number(startDuration.value);
        let y = Number(duration.value);
        document.addEventListener("keydown", function () {
            getHint(_arrayMixed, index);
        });
        for (let index = 0; index < _length; index++) {
            let newCard = document.createElement("div");
            newCard.className = "card";
            newCard.id = "" + _arrayMixed[index];
            newCard.innerHTML = "" + _arrayMixed[index];
            playground.appendChild(newCard);
            time.disabled = true;
            startTime.disabled = true;
            startDuration.disabled = true;
            radioButton.disabled = true;
            setTimeout(function () {
                newCard.addEventListener("click", function () {
                    checkCard(_sequenceOriginal, event);
                });
                startGame(y);
                newCard.innerHTML = "";
            }, timer * 1000);
        }
        let index = 0;
        function checkCard(_original, _event) {
            let id = _event.target.id;
            let stop = _original.length - 1;
            console.log(id);
            if (index == stop) {
                let playarea = document.getElementById("playarea");
                playarea.removeChild(countdown);
                playground.innerHTML = "YOU WIN :)";
            }
            if (id == _original[index]) {
                _event.target.className = "cardgreen";
                _event.target.classList.remove = "card";
                _event.target.innerHTML = "" + _original[index];
                index++;
            }
            else {
                _event.target.className = "carddark";
                _event.target.classList.remove = "card";
                setTimeout(function () {
                    _event.target.className = "card";
                    _event.target.classList.remove = "carddark";
                }, 2000);
            }
        }
    }
    function getHint(_sequence, index) {
        alert(_sequence[index]);
        setTimeout(function () {
            console.log(_sequence);
        }, 2000);
    }
})(L02_Memory || (L02_Memory = {}));
//# sourceMappingURL=Sequenzmemory.js.map