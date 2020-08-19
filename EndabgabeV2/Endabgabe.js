"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    EIA2_EndabgabeV2.figures = [];
    EIA2_EndabgabeV2.backgroundPattern = "plain";
    let backgroundImage;
    let canvasWidth;
    let canvasHeight;
    let backgroundColorWrapper;
    let patterns;
    let patternColorWrapper;
    let forms;
    let animations;
    let form;
    let h3;
    let save;
    let allForms;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        EIA2_EndabgabeV2.canvas = document.querySelector("canvas");
        EIA2_EndabgabeV2.crc2 = EIA2_EndabgabeV2.canvas.getContext("2d");
        canvasWidth = document.getElementById("canvasWidth");
        canvasHeight = document.getElementById("canvasHeight");
        backgroundColorWrapper = document.getElementById("backgroundColorWrapper");
        patternColorWrapper = document.getElementById("patternColorWrapper");
        EIA2_EndabgabeV2.patternColor = document.getElementById("patternColor");
        patterns = document.getElementById("patterns");
        patterns.addEventListener("click", createPattern);
        EIA2_EndabgabeV2.canvas = document.querySelector("canvas");
        EIA2_EndabgabeV2.canvas.addEventListener("click", handleClick);
        EIA2_EndabgabeV2.backgroundColor = document.getElementById("backgroundColor");
        EIA2_EndabgabeV2.backgroundColor.addEventListener("change", function () {
            createBackground();
        });
        EIA2_EndabgabeV2.patternColor.addEventListener("change", function () {
            createBackground();
        });
        save = document.getElementById("save");
        save.addEventListener("click", getName);
        form = document.querySelector("form");
        form.addEventListener("change", handleFormInput);
        forms = document.getElementById("forms");
        forms.addEventListener("click", createElement);
        EIA2_EndabgabeV2.creations = document.getElementById("creations");
        EIA2_EndabgabeV2.creations.addEventListener("change", EIA2_EndabgabeV2.loadPicture);
        animations = document.getElementById("animations");
        animations.addEventListener("click", setAnimation);
        h3 = document.querySelector("h3");
        h3.addEventListener("click", toggleCanvasProperty);
        canvasWidth.style.display = "none";
        canvasHeight.style.display = "none";
        backgroundColorWrapper.style.display = "none";
        patterns.style.display = "none";
        patternColorWrapper.style.display = "none";
        canvasHeight.addEventListener("change", setCanvasHeight);
        canvasWidth.addEventListener("change", setCanvasWidth);
        allForms = document.getElementById("allForms");
        EIA2_EndabgabeV2.canvas.width = 500;
        EIA2_EndabgabeV2.canvas.height = 700;
        EIA2_EndabgabeV2.findPictures();
        createBackground();
        window.setInterval(animate, 30);
        alert("Welcome! Here you can create your own magic image! Choose a figure, design it according to your wishes, change the background and when you are done, don't forget to save your picture! :)");
    }
    function toggleCanvasProperty() {
        if (canvasWidth.style.display == "none") {
            canvasWidth.style.display = "inline";
            canvasHeight.style.display = "inline";
            backgroundColorWrapper.style.display = "inline";
            patternColorWrapper.style.display = "inline";
            patterns.style.display = "inline";
        }
        else {
            canvasWidth.style.display = "none";
            canvasHeight.style.display = "none";
            backgroundColorWrapper.style.display = "none";
            patternColorWrapper.style.display = "none";
            patterns.style.display = "none";
        }
    }
    function createElement(_event) {
        let target = _event.target;
        let id = target.id;
        for (let figure of EIA2_EndabgabeV2.figures) {
            figure.active = false;
        }
        let symbol;
        switch (id) {
            case "triangle":
                symbol = new EIA2_EndabgabeV2.Triangle();
                break;
            case "ellipse":
                symbol = new EIA2_EndabgabeV2.Ellipse();
                break;
            case "square":
                symbol = new EIA2_EndabgabeV2.Square();
                break;
            case "circle":
                symbol = new EIA2_EndabgabeV2.Circle();
                break;
            case "line":
                symbol = new EIA2_EndabgabeV2.Line();
                break;
            case "heart":
                symbol = new EIA2_EndabgabeV2.Heart();
                break;
            case "star":
                symbol = new EIA2_EndabgabeV2.Star();
                break;
            default:
                return;
        }
        EIA2_EndabgabeV2.figures.push(symbol);
        symbol.draw();
        updateList();
    }
    function updateList() {
        while (allForms.firstChild) {
            allForms.removeChild(allForms.firstChild);
        }
        let title = document.createElement("span");
        title.innerText = "All Elements on your canvas are listed here! Click on a Element to edit it!";
        allForms.appendChild(title);
        for (let entry of EIA2_EndabgabeV2.figures) {
            let list = document.createElement("span");
            list.setAttribute("id", EIA2_EndabgabeV2.figures.indexOf(entry).toString());
            list.innerText = entry.type;
            list.addEventListener("click", setActive);
            allForms.appendChild(list);
        }
    }
    EIA2_EndabgabeV2.updateList = updateList;
    function animate() {
        EIA2_EndabgabeV2.crc2.putImageData(backgroundImage, 0, 0);
        for (let figure of EIA2_EndabgabeV2.figures) {
            figure.move(0.5);
            figure.draw();
        }
    }
    function createPattern(_event) {
        let target = _event.target;
        let id = target.id;
        if (id == "dots") {
            EIA2_EndabgabeV2.backgroundPattern = "dots";
        }
        else if (id == "squares") {
            EIA2_EndabgabeV2.backgroundPattern = "squares";
        }
        else {
            EIA2_EndabgabeV2.backgroundPattern = "plain";
        }
        createBackground();
    }
    function setCanvasHeight() {
        let newHeight = parseInt(canvasHeight.value);
        EIA2_EndabgabeV2.canvas.height = newHeight;
        createBackground();
    }
    function setCanvasWidth() {
        let newWidth = parseInt(canvasWidth.value);
        EIA2_EndabgabeV2.canvas.width = newWidth;
        createBackground();
    }
    function createBackground(_color) {
        if (_color) {
            EIA2_EndabgabeV2.background = _color;
        }
        else
            EIA2_EndabgabeV2.background = EIA2_EndabgabeV2.backgroundColor.value;
        if (EIA2_EndabgabeV2.backgroundPattern == "dots") {
            let pattern = document.createElement("canvas").getContext("2d");
            pattern.beginPath();
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = EIA2_EndabgabeV2.background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(10, 10, 9, 0, 2 * Math.PI);
            pattern.strokeStyle = EIA2_EndabgabeV2.patternColor.value;
            pattern.stroke();
            pattern.closePath();
            EIA2_EndabgabeV2.crc2.fillStyle = EIA2_EndabgabeV2.crc2.createPattern(pattern.canvas, "repeat");
        }
        else if (EIA2_EndabgabeV2.backgroundPattern == "squares") {
            let pattern = document.createElement("canvas").getContext("2d");
            pattern.beginPath();
            pattern.canvas.width = 10;
            pattern.canvas.height = 10;
            pattern.fillStyle = EIA2_EndabgabeV2.background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.strokeStyle = EIA2_EndabgabeV2.patternColor.value;
            pattern.rect(0, 0, 5, 5);
            pattern.stroke();
            pattern.closePath();
            EIA2_EndabgabeV2.crc2.fillStyle = EIA2_EndabgabeV2.crc2.createPattern(pattern.canvas, "repeat");
        }
        else {
            EIA2_EndabgabeV2.crc2.fillStyle = EIA2_EndabgabeV2.background;
        }
        EIA2_EndabgabeV2.crc2.fillRect(0, 0, EIA2_EndabgabeV2.canvas.width, EIA2_EndabgabeV2.canvas.height);
        backgroundImage = EIA2_EndabgabeV2.crc2.getImageData(0, 0, EIA2_EndabgabeV2.canvas.width, EIA2_EndabgabeV2.canvas.height);
    }
    EIA2_EndabgabeV2.createBackground = createBackground;
    function handleFormInput(_event) {
        let target = _event.target;
        let id = target.id;
        switch (id) {
            case "colorPicker":
                let colorPicker = document.getElementById("colorPicker");
                for (let figure of EIA2_EndabgabeV2.figures) {
                    if (figure.active == true) {
                        figure.changeColor(colorPicker.value);
                    }
                }
                break;
            case "rotationValue":
                let rotationValue = document.getElementById("rotationValue");
                for (let figure of EIA2_EndabgabeV2.figures) {
                    if (figure.active == true) {
                        figure.changeRotation(parseInt(rotationValue.value));
                    }
                }
                break;
            case "scaleValue":
                let scaleValue = document.getElementById("scaleValue");
                for (let figure of EIA2_EndabgabeV2.figures) {
                    if (figure.active == true && figure.type != "Heart") {
                        figure.resize(parseFloat(scaleValue.value));
                    }
                }
            case "speed":
                let speed = document.getElementById("speed");
                for (let figure of EIA2_EndabgabeV2.figures) {
                    if (figure.active == true) {
                        figure.changeVelocity(parseInt(speed.value));
                    }
                }
        }
    }
    function setAnimation(_event) {
        let target = _event.target;
        let id = target.id;
        for (let figure of EIA2_EndabgabeV2.figures) {
            if (figure.active == true) {
                switch (id) {
                    case "trash":
                        deleteElement(figure);
                        break;
                    case "rotate":
                        figure.moveType = EIA2_EndabgabeV2.FORM_MOVE.ROTATE;
                        break;
                    case "move":
                        figure.moveType = EIA2_EndabgabeV2.FORM_MOVE.MOVE;
                        break;
                    case "neon":
                        figure.neon = true;
                        figure.threeD = false;
                        break;
                    case "threeD":
                        figure.neon = false;
                        figure.threeD = true;
                        break;
                    case "stop":
                        figure.neon = false;
                        figure.threeD = false;
                        break;
                    default:
                        break;
                }
            }
        }
    }
    function handleClick(_event) {
        let y = _event.clientY;
        let x = _event.clientX;
        for (let figure of EIA2_EndabgabeV2.figures) {
            if (figure.active == true) {
                figure.position.x = x;
                figure.position.y = y;
            }
        }
    }
    function deleteElement(_figure) {
        let index = EIA2_EndabgabeV2.figures.indexOf(_figure);
        EIA2_EndabgabeV2.figures.splice(index, 1);
        updateList();
    }
    function getName() {
        let pictureName = prompt("Please enter a name for your Picture!");
        if (pictureName == null || pictureName == "") {
            alert("Please enter a word or else the Picture cannot be saved");
        }
        else
            EIA2_EndabgabeV2.savePicture(pictureName);
    }
    function setActive(_event) {
        for (let entry of EIA2_EndabgabeV2.figures) {
            entry.active = false;
        }
        let target = _event.target;
        console.log(target.id);
        let num = parseInt(target.id);
        EIA2_EndabgabeV2.figures[num].setActive(true);
    }
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Endabgabe.js.map