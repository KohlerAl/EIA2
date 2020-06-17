"use strict";
//Abgabe L09 von Alida Kohler, erstellt am 16.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
var L09_Virus;
(function (L09_Virus) {
    L09_Virus.canvas = document.querySelector("canvas");
    L09_Virus.crc2 = L09_Virus.canvas.getContext("2d");
    L09_Virus.coronas = [];
    L09_Virus.largeCells = [];
    L09_Virus.particles = [];
    L09_Virus.smallCells = [];
    L09_Virus.antibodys = [];
    L09_Virus.macrophages = [];
    L09_Virus.stopCoronas = [];
    window.addEventListener("load", createImage);
    window.addEventListener("resize", createImage);
    function createImage() {
        L09_Virus.resizeCanvas();
        L09_Virus.createBackground();
        createCells();
        //window.setInterval(animation, 20);
    }
    function createCells() {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles = (L09_Virus.width + L09_Virus.height) / 5;
        //Declaring the minium and maximum size each cell can be
        let maxRadius = 20;
        let minRadius = 5;
        //define some colours both for the cells themselves and for their nuclei
        let colors = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
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
        let nParticles;
        //To make the picture not too confusing on small screens, the number of cells to be shown is reduced again 
        if (L09_Virus.width > 800) {
            numCircles = numCircles;
            j = Math.floor(L09_Virus.width / 50);
            nParticles = 800;
        }
        else {
            numCircles = numCircles / 2;
            j = 15;
            nParticles = 150;
        }
        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * L09_Virus.canvas.width;
            yPos = Math.random() * L09_Virus.canvas.height;
            radius = minRadius + (Math.random() * (maxRadius - minRadius));
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            nucleusColor = nucleusColors[colorIndex];
            bigCell = false;
            particle = false;
            let position = new L09_Virus.Vector(xPos, yPos);
            let cell = new L09_Virus.Background(position);
            cell.draw(position, radius, color, nucleusColor, bigCell, particle);
            L09_Virus.smallCells.push(cell);
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let macrophage = new L09_Virus.Macrophage();
            macrophage.draw(L09_Virus.width - 200 + (100 * Math.random()), 400 + (200 * Math.random()));
        }
        //Create Antibodys
        for (let i = 0; i < 7; i++) {
            xPos = Math.random() * L09_Virus.canvas.width / 1.5;
            yPos = 450 + (20 * Math.random());
            if (xPos > L09_Virus.width / 2) {
                yPos = yPos + 50;
                xPos = xPos - L09_Virus.width / 2 + 10;
            }
            let antibody = new L09_Virus.Antibody();
            antibody.draw(xPos, yPos);
        }
        //Create bigger Cells for the foreground
        while (storage < L09_Virus.width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position = new L09_Virus.Vector(xPos, yPos);
            let cell = new L09_Virus.BodyCell(position);
            cell.draw(position);
            L09_Virus.largeCells.push(cell);
        }
        L09_Virus.backgroundImage = L09_Virus.crc2.getImageData(0, 0, L09_Virus.width, L09_Virus.height);
        for (let i = 0; i < j; i++) {
            radius = 30;
            xPos = coronaPosition + radius + 10;
            coronaPosition = xPos + radius;
            yPos = 220 + (50 * Math.random());
            if (xPos > L09_Virus.width) {
                yPos = yPos + 100;
                xPos = xPos - L09_Virus.width + 10;
            }
            let position = new L09_Virus.Vector(xPos, yPos);
            let corona = new L09_Virus.Corona(position);
            corona.draw(position);
            L09_Virus.coronas.push(corona);
        }
        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * L09_Virus.canvas.width;
            yPos = Math.random() * L09_Virus.canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position = new L09_Virus.Vector(xPos, yPos);
            let cell = new L09_Virus.Particle(position);
            cell.draw(position);
            L09_Virus.particles.push(cell);
        }
    }
    function animation() {
        L09_Virus.crc2.putImageData(L09_Virus.backgroundImage, 0, 0);
        for (let particle of L09_Virus.particles) {
            particle.move(1 / 50);
            particle.draw(particle.position);
        }
        for (let corona of L09_Virus.coronas) {
            corona.move(1 / 50);
            corona.draw(corona.position);
        }
        for (let corona of L09_Virus.stopCoronas) {
            corona.draw(corona.position);
        }
        isInfected();
        /* for (let bodyCell of largeCells) {
            bodyCell.move(1 / 20);
            bodyCell.draw(bodyCell.position);
        } */
    }
    function isInfected() {
        for (let corona of L09_Virus.coronas) {
            if (corona.isInfected()) {
                startReaction(corona);
            }
        }
    }
    function startReaction(_corona) {
        let index = L09_Virus.coronas.indexOf(_corona);
        L09_Virus.stopCoronas.push(_corona);
        L09_Virus.coronas.splice(index, 1);
        window.setTimeout(function () {
            endReaction(_corona);
        }, 3000);
    }
    function endReaction(_corona) {
        let index = L09_Virus.stopCoronas.indexOf(_corona);
        L09_Virus.stopCoronas.splice(index, 1);
        let newPosition = new L09_Virus.Vector(L09_Virus.width + 100 * Math.random(), 400);
        let newCorona = new L09_Virus.Corona(newPosition);
        newCorona.draw(newPosition);
        L09_Virus.coronas.push(newCorona);
    }
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=L09_Virus.js.map