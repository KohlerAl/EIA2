"use strict";
//Abgabe L10 von Alida Kohler, erstellt am 23.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
var L10_Virus;
(function (L10_Virus) {
    /* let coronas: Corona[] = [];
    let largeCells: BodyCell[] = [];
    let particles: Particle[] = [];
    let smallCells: Background[] = [];
    let antibodys: Antibody[] = []; */
    let cells = [];
    let backgroundImage;
    window.addEventListener("load", createImage);
    window.addEventListener("resize", handleResize);
    function handleResize() {
        cells = [];
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
        //Define some variables to be passed to the function drawCell after their value is set
        // as well as some other variables to distinguish different cases of cells and devices
        let xPos;
        let yPos;
        let radius;
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
            cell.draw();
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let position = new L10_Virus.Vector(L10_Virus.width - 200 + (200 * Math.random()), 400 + (200 * Math.random()));
            let macrophage = new L10_Virus.Macrophage(position);
            macrophage.draw();
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
            antibody.draw();
            cells.push(antibody);
        }
        //Create bigger Cells for the foreground
        while (storage < L10_Virus.width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position = new L10_Virus.Vector(xPos, yPos);
            let cell = new L10_Virus.BodyCell(position, false);
            cell.draw();
            cells.push(cell);
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
            corona.draw();
            cells.push(corona);
        }
        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * L10_Virus.canvas.width;
            yPos = Math.random() * L10_Virus.canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position = new L10_Virus.Vector(xPos, yPos);
            let cell = new L10_Virus.Particle(position);
            cell.draw();
            cells.push(cell);
        }
    }
    function animation() {
        L10_Virus.crc2.putImageData(backgroundImage, 0, 0);
        for (let cell of cells) {
            if (cell instanceof L10_Virus.Antibody || cell instanceof L10_Virus.Corona)
                cell.move(1 / 20);
            else if (cell instanceof L10_Virus.BodyCell)
                cell.move(1 / 30);
            else if (cell instanceof L10_Virus.Particle)
                cell.move(1 / 50);
            cell.draw();
        }
        isInfected();
    }
    function isInfected() {
        for (let cell of cells) {
            if (cell instanceof L10_Virus.Corona && cell.isInfected()) {
                startReaction(cell);
                changeBodyCell(cell.position.x);
            }
        }
    }
    function startReaction(_corona) {
        _corona.isInfecting = true;
        window.setTimeout(function () {
            endReaction(_corona);
        }, 3000);
    }
    function endReaction(_corona) {
        _corona.isInfecting = false;
    }
    function changeBodyCell(_virusPos) {
        for (let cell of cells) {
            let areaMin = cell.position.x - 40;
            let areaMax = cell.position.x + 40;
            if (cell instanceof L10_Virus.BodyCell && _virusPos > areaMin && _virusPos < areaMax) {
                let index = cells.indexOf(cell);
                cells.splice(index, 1);
                let newPosition = new L10_Virus.Vector(cell.position.x, cell.position.y);
                let infectedCell = new L10_Virus.BodyCell(newPosition, true);
                infectedCell.draw();
                for (let cell of cells) {
                    if (cell instanceof L10_Virus.Corona) {
                        cell.draw();
                    }
                }
                cells.push(infectedCell);
            }
        }
    }
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=L10_Virus.js.map