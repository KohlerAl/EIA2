"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let backgroundImage;
    let pattern = "plain";
    EIA2_Endabgabe.figures = [];
    let canvasWidth;
    let canvasHeight;
    let backgroundColorWrapper;
    let patterns;
    let forms;
    let animations;
    let form;
    let h3;
    let save;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        EIA2_Endabgabe.canvas = document.querySelector("canvas");
        EIA2_Endabgabe.crc2 = EIA2_Endabgabe.canvas.getContext("2d");
        canvasWidth = document.getElementById("canvasWidth");
        canvasHeight = document.getElementById("canvasHeight");
        backgroundColorWrapper = document.getElementById("backgroundColorWrapper");
        patterns = document.getElementById("patterns");
        patterns.addEventListener("click", createPattern);
        EIA2_Endabgabe.canvas = document.querySelector("canvas");
        EIA2_Endabgabe.canvas.addEventListener("click", handleClick);
        EIA2_Endabgabe.backgroundColor = document.getElementById("backgroundColor");
        EIA2_Endabgabe.backgroundColor.addEventListener("change", function () {
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
        canvasHeight.addEventListener("change", setCanvasHeight);
        canvasWidth.addEventListener("change", setCanvasWidth);
        EIA2_Endabgabe.findPictures();
        createBackground();
        window.setInterval(animate, 30);
    }
    function toggleCanvasProperty() {
        if (canvasWidth.style.display == "none") {
            canvasWidth.style.display = "inline";
            canvasHeight.style.display = "inline";
            backgroundColorWrapper.style.display = "inline";
            patterns.style.display = "inline";
        }
        else {
            canvasWidth.style.display = "none";
            canvasHeight.style.display = "none";
            backgroundColorWrapper.style.display = "none";
            patterns.style.display = "none";
        }
    }
    function createElement(_event) {
        let id = _event.target.id;
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
            default:
                break;
        }
    }
    function animate() {
        EIA2_Endabgabe.crc2.putImageData(backgroundImage, 0, 0);
        for (let figure of EIA2_Endabgabe.figures) {
            figure.move();
            figure.draw();
        }
    }
    function createPattern(_event) {
        let id = _event.target.id;
        if (id == "dots") {
            pattern = "dots";
        }
        else if (id == "squares") {
            pattern = "squares";
        }
        else {
            pattern = "plain";
        }
        createBackground();
    }
    function handleClick(_event) {
        let y = _event.clientY;
        let x = _event.clientX;
        console.log(x, y);
        for (let figure of EIA2_Endabgabe.figures) {
            if (figure.active == true) {
                console.log(figure.position);
                figure.position = new EIA2_Endabgabe.Vector(x, y);
            }
        }
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
        if (pattern == "dots") {
            let pattern = document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 20;
            pattern.canvas.height = 20;
            pattern.fillStyle = EIA2_Endabgabe.background;
            pattern.arc(10, 10, 9, 0, 2 * Math.PI);
            pattern.strokeStyle = "#111111";
            pattern.stroke();
            pattern.closePath();
            EIA2_Endabgabe.crc2.fillStyle = pattern;
        }
        else if (pattern == "squares") {
            let pattern = document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 5;
            pattern.canvas.height = 5;
            pattern.fillStyle = EIA2_Endabgabe.background;
            pattern.strokeStyle = "#111111";
            pattern.fillRect(0, 0, 5, 5);
            pattern.stroke();
            pattern.closePath();
            EIA2_Endabgabe.crc2.fillStyle = pattern;
        }
        else {
            EIA2_Endabgabe.crc2.fillStyle = EIA2_Endabgabe.background;
        }
        EIA2_Endabgabe.crc2.fillRect(0, 0, EIA2_Endabgabe.canvas.width, EIA2_Endabgabe.canvas.height);
        backgroundImage = EIA2_Endabgabe.crc2.getImageData(0, 0, EIA2_Endabgabe.canvas.width, EIA2_Endabgabe.canvas.height);
    }
    EIA2_Endabgabe.createBackground = createBackground;
    function handleFormInput(_event) {
        let id = _event.target.id;
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
                    if (figure.active == true) {
                        figure.resize(parseInt(scaleValue.value));
                    }
                }
        }
    }
    function setAnimation(_event) {
        let id = _event.target.id;
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
                    default:
                        break;
                }
            }
        }
    }
    /*  function setActive(_figure: Form) {
         for (let figure of figures) {
             if (figure.active == true) {
                 figure.active = false;
             }
         }
         _figure.active = true;
     }
  */
    function deleteElement(_figure) {
        let index = EIA2_Endabgabe.figures.indexOf(_figure);
        EIA2_Endabgabe.figures.splice(index, 1);
    }
    function getName() {
        let pictureName = prompt("Please enter a name for your Picture!");
        if (pictureName == null || pictureName == "") {
            alert("Please enter a word or else the Picture cannot be saved");
        }
        else
            EIA2_Endabgabe.savePicture(pictureName);
    }
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Endabgabe.js.map