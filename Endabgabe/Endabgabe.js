"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    EIA2_Endabgabe.figures = [];
    let backgroundImage;
    let backgroundPattern = "plain";
    let canvasWidth;
    let canvasHeight;
    let backgroundColorWrapper;
    let patterns;
    let patternColor;
    let patternColorWrapper;
    let forms;
    let animations;
    let form;
    let h3;
    let save;
    let allForms;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        EIA2_Endabgabe.canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = EIA2_Endabgabe.canvas.getContext("2d");
        canvasWidth = document.getElementById("canvasWidth");
        canvasHeight = document.getElementById("canvasHeight");
        backgroundColorWrapper = document.getElementById("backgroundColorWrapper");
        patternColorWrapper = document.getElementById("patternColorWrapper");
        patternColor = document.getElementById("patternColor");
        patterns = document.getElementById("patterns");
        patterns.addEventListener("click", createPattern);
        EIA2_Endabgabe.canvas = document.querySelector("canvas");
        EIA2_Endabgabe.canvas.addEventListener("click", handleClick);
        EIA2_Endabgabe.backgroundColor = document.getElementById("backgroundColor");
        EIA2_Endabgabe.backgroundColor.addEventListener("change", function () {
            createBackground();
        });
        patternColor.addEventListener("change", function () {
            createBackground();
        });
        save = document.getElementById("save");
        save.addEventListener("click", getName);
        form = document.querySelector("form");
        form.addEventListener("change", handleFormInput);
        forms = document.getElementById("forms");
        forms.addEventListener("click", createElement);
        EIA2_Endabgabe.creations = document.getElementById("creations");
        EIA2_Endabgabe.creations.addEventListener("change", EIA2_Endabgabe.loadPicture);
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
        EIA2_Endabgabe.canvas.width = 500;
        EIA2_Endabgabe.canvas.height = 700;
        EIA2_Endabgabe.findPictures();
        createBackground();
        window.setInterval(animate, 30);
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
        for (let figure of EIA2_Endabgabe.figures) {
            figure.active = false;
        }
        switch (id) {
            case "triangle":
                let triangle = new EIA2_Endabgabe.Triangle();
                triangle.draw();
                EIA2_Endabgabe.figures.push(triangle);
                break;
            case "ellipse":
                let ellipse = new EIA2_Endabgabe.Ellipse();
                ellipse.draw();
                EIA2_Endabgabe.figures.push(ellipse);
                break;
            case "square":
                let square = new EIA2_Endabgabe.Square();
                square.draw();
                EIA2_Endabgabe.figures.push(square);
                break;
            case "circle":
                let circle = new EIA2_Endabgabe.Circle();
                circle.draw();
                EIA2_Endabgabe.figures.push(circle);
                break;
            case "line":
                let line = new EIA2_Endabgabe.Line();
                line.draw();
                EIA2_Endabgabe.figures.push(line);
                break;
            case "heart":
                let heart = new EIA2_Endabgabe.Heart();
                heart.draw();
                EIA2_Endabgabe.figures.push(heart);
                break;
            case "star":
                let star = new EIA2_Endabgabe.Star();
                star.draw();
                EIA2_Endabgabe.figures.push(star);
                break;
            default:
                break;
        }
        updateList();
    }
    function updateList() {
        while (allForms.firstChild) {
            allForms.removeChild(allForms.firstChild);
        }
        let title = document.createElement("span");
        title.innerText = "All Elements on your canvas are listed here!";
        allForms.appendChild(title);
        for (let entry of EIA2_Endabgabe.figures) {
            let list = document.createElement("span");
            list.setAttribute("id", EIA2_Endabgabe.figures.indexOf(entry).toString());
            list.innerText = entry.type + "  color: " + entry.color;
            list.addEventListener("click", setActive);
            allForms.appendChild(list);
        }
    }
    EIA2_Endabgabe.updateList = updateList;
    function animate() {
        EIA2_Endabgabe.crc2.putImageData(backgroundImage, 0, 0);
        for (let figure of EIA2_Endabgabe.figures) {
            figure.move(0.5);
            figure.draw();
        }
    }
    function createPattern(_event) {
        let target = _event.target;
        let id = target.id;
        if (id == "dots") {
            backgroundPattern = "dots";
        }
        else if (id == "squares") {
            backgroundPattern = "squares";
        }
        else {
            backgroundPattern = "plain";
        }
        createBackground();
    }
    function setCanvasHeight() {
        let newHeight = parseInt(canvasHeight.value);
        EIA2_Endabgabe.canvas.height = newHeight;
        createBackground();
    }
    function setCanvasWidth() {
        let newWidth = parseInt(canvasWidth.value);
        EIA2_Endabgabe.canvas.width = newWidth;
        createBackground();
    }
    function createBackground(_color) {
        if (_color) {
            EIA2_Endabgabe.background = _color;
        }
        else
            EIA2_Endabgabe.background = EIA2_Endabgabe.backgroundColor.value;
        if (backgroundPattern == "dots") {
            let pattern = document.createElement('canvas').getContext('2d');
            pattern.beginPath();
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = EIA2_Endabgabe.background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(10, 10, 9, 0, 2 * Math.PI);
            pattern.strokeStyle = patternColor.value;
            pattern.stroke();
            pattern.closePath();
            EIA2_Endabgabe.crc2.fillStyle = EIA2_Endabgabe.crc2.createPattern(pattern.canvas, "repeat");
        }
        else if (backgroundPattern == "squares") {
            let pattern = document.createElement('canvas').getContext('2d');
            pattern.beginPath();
            pattern.canvas.width = 10;
            pattern.canvas.height = 10;
            pattern.fillStyle = EIA2_Endabgabe.background;
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.strokeStyle = patternColor.value;
            pattern.rect(0, 0, 5, 5);
            pattern.stroke();
            pattern.closePath();
            EIA2_Endabgabe.crc2.fillStyle = EIA2_Endabgabe.crc2.createPattern(pattern.canvas, "repeat");
        }
        else {
            EIA2_Endabgabe.crc2.fillStyle = EIA2_Endabgabe.background;
        }
        EIA2_Endabgabe.crc2.fillRect(0, 0, EIA2_Endabgabe.canvas.width, EIA2_Endabgabe.canvas.height);
        backgroundImage = EIA2_Endabgabe.crc2.getImageData(0, 0, EIA2_Endabgabe.canvas.width, EIA2_Endabgabe.canvas.height);
    }
    EIA2_Endabgabe.createBackground = createBackground;
    function handleFormInput(_event) {
        let target = _event.target;
        let id = target.id;
        switch (id) {
            case "colorPicker":
                let colorPicker = document.getElementById("colorPicker");
                for (let figure of EIA2_Endabgabe.figures) {
                    if (figure.active == true) {
                        figure.changeColor(colorPicker.value);
                    }
                }
                break;
            case "rotationValue":
                let rotationValue = document.getElementById("rotationValue");
                for (let figure of EIA2_Endabgabe.figures) {
                    if (figure.active == true) {
                        figure.changeRotation(parseInt(rotationValue.value));
                    }
                }
                break;
            case "scaleValue":
                let scaleValue = document.getElementById("scaleValue");
                for (let figure of EIA2_Endabgabe.figures) {
                    if (figure.active == true && figure.type != "Heart") {
                        figure.resize(parseFloat(scaleValue.value));
                    }
                }
            case "speed":
                let speed = document.getElementById("speed");
                for (let figure of EIA2_Endabgabe.figures) {
                    if (figure.active == true) {
                        figure.velocity.x = parseInt(speed.value);
                        figure.velocity.y = parseInt(speed.value);
                    }
                }
        }
    }
    function setAnimation(_event) {
        let target = _event.target;
        let id = target.id;
        for (let figure of EIA2_Endabgabe.figures) {
            if (figure.active == true) {
                switch (id) {
                    case "trash":
                        deleteElement(figure);
                        break;
                    case "rotate":
                        figure.moveType = EIA2_Endabgabe.FORM_MOVE.ROTATE;
                        break;
                    case "move":
                        figure.moveType = EIA2_Endabgabe.FORM_MOVE.MOVE;
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
        for (let figure of EIA2_Endabgabe.figures) {
            if (figure.active == true) {
                figure.position.x = x;
                figure.position.y = y;
            }
        }
    }
    function deleteElement(_figure) {
        let index = EIA2_Endabgabe.figures.indexOf(_figure);
        EIA2_Endabgabe.figures.splice(index, 1);
        updateList();
    }
    function getName() {
        let pictureName = prompt("Please enter a name for your Picture!");
        if (pictureName == null || pictureName == "") {
            alert("Please enter a word or else the Picture cannot be saved");
        }
        else
            EIA2_Endabgabe.savePicture(pictureName);
    }
    function setActive(_event) {
        for (let entry of EIA2_Endabgabe.figures) {
            entry.active = false;
        }
        let target = _event.target;
        console.log(target.id);
        let num = parseInt(target.id);
        EIA2_Endabgabe.figures[num].active = true;
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map