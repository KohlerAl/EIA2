"use strict";
//Abgabe L10 von Alida Kohler, erstellt am 23.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
var L10_Virus;
(function (L10_Virus) {
    let coronas = [];
    let largeCells = [];
    let particles = [];
    let smallCells = [];
    let antibodys = [];
    let stopCoronas = [];
    let infectedBodyCell = [];
    let backgroundImage;
    window.addEventListener("load", createImage);
    window.addEventListener("resize", handleResize);
    function handleResize() {
        coronas = [];
        largeCells = [];
        particles = [];
        smallCells = [];
        antibodys = [];
        stopCoronas = [];
        infectedBodyCell = [];
        createImage();
    }
    function createImage() {
        L10_Virus.canvas = document.querySelector("canvas");
        L10_Virus.crc2 = L10_Virus.canvas.getContext("2d");
        L10_Virus.resizeCanvas();
        L10_Virus.createBackground();
        createCells();
        window.setInterval(animation, 20);
    }
    function createCells() {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles = (L10_Virus.width + L10_Virus.height) / 5;
        //Declaring the minium and maximum size each cell can be
        //define some colours both for the cells themselves and for their nuclei
        let colors = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
        let numColors = colors.length;
        //Define some variables to be passed to the function drawCell after their value is set
        // as well as some other variables to distinguish different cases of cells and devices
        let xPos;
        let yPos;
        let radius;
        let colorIndex;
        let storage = 0;
        let coronaPosition = 10;
        let j;
        let nParticles;
        //To make the picture not too confusing on small screens, the number of cells to be shown is reduced again 
        if (L10_Virus.width > 800) {
            numCircles = numCircles;
            j = Math.floor(L10_Virus.width / 50);
            nParticles = 600;
        }
        else {
            numCircles = numCircles / 2;
            j = 15;
            nParticles = 100;
        }
        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * L10_Virus.canvas.width;
            yPos = Math.random() * L10_Virus.canvas.height;
            let position = new L10_Virus.Vector(xPos, yPos);
            let cell = new L10_Virus.Background(position);
            cell.draw(position);
            smallCells.push(cell);
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let macrophage = new L10_Virus.Macrophage();
            macrophage.draw(L10_Virus.width - 200 + (200 * Math.random()), 400 + (200 * Math.random()));
        }
        backgroundImage = L10_Virus.crc2.getImageData(0, 0, L10_Virus.width, L10_Virus.height);
        //Create Antibodys
        for (let i = 0; i < j; i++) {
            xPos = Math.random() * L10_Virus.canvas.width / 1.5;
            yPos = 450 + (70 * Math.random());
            /* if (xPos > width / 2) {
                yPos = yPos + 50;
                xPos = xPos - width / 2 + 10;
            } */
            let position = new L10_Virus.Vector(xPos, yPos);
            let antibody = new L10_Virus.Antibody(position);
            antibody.draw(position);
            antibodys.push(antibody);
        }
        //Create bigger Cells for the foreground
        while (storage < L10_Virus.width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            colorIndex = Math.round(Math.random() * (numColors - 1));
            let position = new L10_Virus.Vector(xPos, yPos);
            let cell = new L10_Virus.BodyCell(position, colorIndex);
            cell.draw(position);
            largeCells.push(cell);
        }
        for (let i = 0; i < j; i++) {
            radius = 30;
            xPos = coronaPosition + radius + 10;
            coronaPosition = xPos + radius;
            yPos = 220 + (50 * Math.random());
            if (xPos > L10_Virus.width) {
                yPos = yPos + 100;
                xPos = xPos - L10_Virus.width + 10;
            }
            let position = new L10_Virus.Vector(xPos, yPos);
            let corona = new L10_Virus.Corona(position);
            corona.draw(position);
            coronas.push(corona);
        }
        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * L10_Virus.canvas.width;
            yPos = Math.random() * L10_Virus.canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position = new L10_Virus.Vector(xPos, yPos);
            let cell = new L10_Virus.Particle(position);
            cell.draw(position);
            particles.push(cell);
        }
    }
    function animation() {
        L10_Virus.crc2.putImageData(backgroundImage, 0, 0);
        for (let cell of infectedBodyCell) {
            cell.move(1 / 50);
            cell.draw(cell.position);
        }
        for (let cell of antibodys) {
            cell.move(1 / 20);
            cell.draw(cell.position);
        }
        for (let bodyCell of largeCells) {
            bodyCell.move(1 / 30);
            bodyCell.draw(bodyCell.position);
        }
        for (let corona of coronas) {
            corona.move(1 / 20);
            corona.draw(corona.position);
        }
        for (let corona of stopCoronas) {
            corona.draw(corona.position);
        }
        for (let particle of particles) {
            particle.move(1 / 50);
            particle.draw(particle.position);
        }
        isInfected();
    }
    function isInfected() {
        for (let corona of coronas) {
            if (corona.isInfected()) {
                startReaction(corona);
                changeBodyCell(corona.position.x);
            }
        }
    }
    function startReaction(_corona) {
        let index = coronas.indexOf(_corona);
        stopCoronas.push(_corona);
        coronas.splice(index, 1);
        window.setTimeout(function () {
            endReaction(_corona);
        }, 3000);
    }
    function endReaction(_corona) {
        let index = stopCoronas.indexOf(_corona);
        stopCoronas.splice(index, 1);
        let newPosition = new L10_Virus.Vector(L10_Virus.width + 100 * Math.random(), 400);
        let newCorona = new L10_Virus.Corona(newPosition);
        newCorona.draw(newPosition);
        coronas.push(newCorona);
    }
    function changeBodyCell(_virusPos) {
        for (let cell of largeCells) {
            let areaMin = cell.position.x - 40;
            let areaMax = cell.position.x + 40;
            if (_virusPos > areaMin && _virusPos < areaMax) {
                let index = largeCells.indexOf(cell);
                largeCells.splice(index, 1);
                let newPosition = new L10_Virus.Vector(cell.position.x, cell.position.y);
                let infectedCell = new L10_Virus.BodyCell(newPosition, 4);
                infectedCell.draw(newPosition);
                infectedBodyCell.push(infectedCell);
            }
        }
    }
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=L10_Virus.js.map