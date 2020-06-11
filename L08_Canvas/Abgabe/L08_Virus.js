"use strict";
//Abgabe L08 von Alida Kohler, erstellt am 08.06.2020
var L08_Virus;
(function (L08_Virus) {
    let canvas = document.querySelector("canvas");
    let crc2 = canvas.getContext("2d");
    let width;
    let height;
    window.addEventListener("load", createImage);
    window.addEventListener("resize", createImage);
    function createImage() {
        resizeCanvas();
        createBackground();
        createCells();
    }
    function createBackground() {
        //To make the Background look more interesting, I create a simple pattern, imitating cells. 
        //The opacity is not very high so that the pattern does not distract form the bigger cells. 
        let pattern = document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 100;
        pattern.canvas.height = 40;
        pattern.fillStyle = "#97a0db3a";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 20);
        pattern.lineTo(20, 20);
        pattern.lineTo(40, 0);
        pattern.lineTo(60, 0);
        pattern.lineTo(100, 20);
        pattern.lineTo(60, 40);
        pattern.lineTo(40, 40);
        pattern.lineTo(20, 20);
        //Draw the pattern for the cell membranes
        pattern.strokeStyle = "#88888844";
        pattern.stroke();
        pattern.closePath();
        //Draw the nuclei 
        pattern.beginPath();
        pattern.arc(50, 20, 2, 0, 2 * Math.PI);
        pattern.fillStyle = "#88888844";
        pattern.fill();
        //Since the pattern cuts some cells in half, I draw two semicircles, one at the top and one at the bottom
        //By repeating the pattern, whole circles are created.
        pattern.beginPath();
        pattern.arc(95, 40, 2, 1 * Math.PI, 0);
        pattern.fillStyle = "#88888844";
        pattern.fill();
        pattern.beginPath();
        pattern.arc(95, 0, 2, 0 * Math.PI, 1 * Math.PI);
        pattern.fillStyle = "#88888844";
        pattern.fill();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function resizeCanvas() {
        //Make the Canvas as big as the screen of the used device 
        width = window.innerWidth;
        canvas.setAttribute("width", width + "px");
        height = window.innerHeight;
        canvas.setAttribute("height", height + "px");
        //Set a light blue Background-color, fill a rectangle with it 
        crc2.fillStyle = "#97a0db33";
        //The rectangle is bigger as the canvas, making sure there are no margins in the background-color
        crc2.fillRect(0, 0, width, height);
    }
    function createCells() {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles = (width + height) / 5;
        //Declaring the minium and maximum size each cell can be
        let maxRadius = 20;
        let minRadius = 5;
        //define some colours both for the cells themselves and for their nuclei
        let colors = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
        let bigCellColors = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f"];
        let particleColors = ["#ffcc01", "#ffac16", "#ff9026", "#ffd644"];
        let nucleusColors = ["#888888", "#373737", "#4a4a4a", "#444444"];
        let numColors = colors.length;
        //Define some variables to be passed to the function drawCell after their value is set
        // as well as some other variables to distinguish different cases of cells and devices
        let xPos;
        let yPos;
        let radius;
        let colorIndex;
        let color;
        let nucleusColor;
        let bigCell;
        let particle;
        let storage = 0;
        let coronaPosition = 10;
        let j;
        let antibody = 10;
        //To make the picture not too confusing on small screens, the number of cells to be shown is reduced again 
        if (width > 800) {
            numCircles = numCircles;
            j = Math.floor(width / 50);
            console.log(j);
        }
        else {
            numCircles = numCircles / 2;
            j = 3;
        }
        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;
            radius = minRadius + (Math.random() * (maxRadius - minRadius));
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            nucleusColor = nucleusColors[colorIndex];
            bigCell = false;
            particle = false;
            // Call draw Cell and commit all needed values for the cell 
            drawCell(xPos, yPos, radius, color, nucleusColor, bigCell, particle);
        }
        //Create bigger Cells for the foreground
        while (storage < width) {
            maxRadius = 40;
            minRadius = 30;
            yPos = 80;
            radius = minRadius + (Math.random() * (maxRadius - minRadius));
            xPos = storage + radius;
            storage = xPos + radius;
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = bigCellColors[colorIndex];
            nucleusColor = nucleusColors[colorIndex];
            bigCell = true;
            particle = false;
            // Call draw Cell and commit all needed values for the cell 
            drawCell(xPos, yPos, radius, color, nucleusColor, bigCell, particle);
        }
        for (let i = 0; i < j; i++) {
            radius = 50;
            xPos = coronaPosition + radius;
            coronaPosition = xPos + radius;
            yPos = 200 + (50 * Math.random());
            createCoronaCell(xPos, yPos);
            if (i < j - 1) {
                xPos = coronaPosition + radius + 10;
                yPos = 320 + (50 * Math.random());
                createCoronaCell(xPos, yPos);
            }
        }
        for (let i = 0; i < 4; i++) {
            radius = 15;
            xPos = antibody + radius;
            antibody = xPos + radius;
            yPos = 500 + (20 * Math.random());
            createAntibodies(xPos, yPos);
            if (i < 3) {
                xPos = antibody + radius + 10;
                yPos = 530 + (20 * Math.random());
                createAntibodies(xPos, yPos);
            }
        }
        createMacrophage(180, 480);
        createMacrophage(300, 460);
        for (let i = 0; i < 100; i++) {
            maxRadius = 3;
            minRadius = 1;
            xPos = Math.random() * canvas.width;
            yPos = Math.random() * canvas.height;
            radius = minRadius + (Math.random() * (maxRadius - minRadius));
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = particleColors[colorIndex];
            nucleusColor = nucleusColors[colorIndex];
            bigCell = false;
            particle = true;
            // Call draw Cell and commit all needed values for the cell 
            drawCell(xPos, yPos, radius, color, nucleusColor, bigCell, particle);
        }
    }
    function drawCell(_xPos, _yPos, _radius, _color, _nucleusColor, _size, _particle) {
        crc2.save();
        // Set Parameters for Angles, Shadows and Rotation 
        let startAngle = (Math.PI / 180);
        let endAngle = (Math.PI / 180) * 360;
        crc2.shadowColor = "gray";
        crc2.shadowOffsetX = 1;
        crc2.shadowOffsetY = 1;
        crc2.shadowBlur = 5;
        let rotation = Math.random() * 360;
        // Creating a pattern, to give the Cells a bit of texture
        let pattern = document.createElement('canvas').getContext('2d');
        pattern.canvas.width = 2;
        pattern.canvas.height = 2;
        pattern.fillStyle = _color + "33";
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.arc(2, 2, Math.floor(Math.random() * 2), 0, 2 * Math.PI);
        pattern.strokeStyle = _color + "55";
        pattern.stroke();
        crc2.fillStyle = crc2.createPattern(pattern.canvas, "repeat");
        // Create the Cell itself
        crc2.beginPath();
        if (_size == true) {
            rotation = 0;
            crc2.ellipse(_xPos, _yPos, _radius, _radius * Math.random() + _radius, rotation, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = _color;
            crc2.fillStyle = _color;
        }
        else {
            crc2.ellipse(_xPos, _yPos, _radius, _radius * Math.random() + _radius, rotation, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = _color + "88";
            crc2.fillStyle = pattern;
        }
        crc2.stroke();
        crc2.fill();
        if (_particle == false) {
            //Draw Nucleus 
            //They are not perfect circles, to make them look more naturally
            crc2.beginPath();
            if (_size == true) {
                crc2.arc(_xPos + 2, _yPos - (25 * Math.random()), 10, Math.random(), 1.95 * Math.PI);
                crc2.fillStyle = _nucleusColor + "66";
            }
            else {
                crc2.arc(_xPos + 2, _yPos - 3, 3, Math.random(), 1.7 * Math.PI);
                crc2.fillStyle = _nucleusColor + "33";
            }
            crc2.closePath();
            crc2.fill();
        }
    }
    function createCoronaCell(_xPosition, _yPosition) {
        crc2.restore();
        crc2.shadowColor = "rgba(173, 216, 230, 0)";
        crc2.save();
        crc2.translate(_xPosition, _yPosition);
        for (let i = 0; i < 9; i++) {
            crc2.beginPath();
            crc2.rotate(30);
            crc2.moveTo(0, 40);
            crc2.lineTo(0, 45);
            crc2.strokeStyle = "#777777";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(0, 45, 10, 0, 1 * Math.PI);
            crc2.fillStyle = "#cb341a";
            crc2.fill();
        }
        crc2.beginPath();
        crc2.arc(0, 0, 40, 0, 2 * Math.PI);
        crc2.fillStyle = "#ae2d16";
        crc2.fill();
        crc2.closePath();
        crc2.restore();
    }
    function createAntibodies(_xPos, _yPos) {
        crc2.save();
        crc2.translate(_xPos, _yPos);
        crc2.beginPath();
        crc2.rotate(Math.random() * 360);
        crc2.moveTo(0, 0);
        crc2.lineTo(0, 24);
        crc2.strokeStyle = "#114d89";
        crc2.lineWidth = 2;
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(0, 36, 12, 0, 1 * Math.PI, true);
        crc2.stroke();
        crc2.restore();
    }
    function createMacrophage(_xPosition, _yPosition) {
        crc2.beginPath();
        crc2.arc(_xPosition + 40, _yPosition + 40, 40, 0, 2 * Math.PI);
        crc2.arc(_xPosition + 18, _yPosition + 12, 35, 0, 2 * Math.PI);
        crc2.arc(_xPosition + 80, _yPosition + 52, 30, 0, 2 * Math.PI);
        crc2.fillStyle = "#29657c";
        crc2.closePath();
        crc2.fill();
        // Add a nucleus 
        crc2.beginPath();
        crc2.arc(_xPosition + 40, _yPosition + 40, 7, 0, 2 * Math.PI);
        crc2.fillStyle = "darkslategrey";
        crc2.closePath();
        crc2.fill();
    }
})(L08_Virus || (L08_Virus = {}));
//# sourceMappingURL=L08_Virus.js.map