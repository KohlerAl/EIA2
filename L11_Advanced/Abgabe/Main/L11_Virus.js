"use strict";
//Abgabe L11 von Alida Kohler, erstellt am 30.06.2020
//Konzipiert für ein Handy-Display mit dem Format 360x560
var L11_Virus;
(function (L11_Virus) {
    let cells = [];
    let backgroundImage;
    window.addEventListener("load", handleLoad);
    window.addEventListener("resize", handleResize);
    function handleResize() {
        cells = [];
        createImage();
    }
    function handleLoad() {
        alert("Don't let Corona win! To destroy the infected (red) cells, click on them before they can send out more viruses! ");
        createImage();
    }
    function createImage() {
        L11_Virus.canvas = document.querySelector("canvas");
        L11_Virus.crc2 = L11_Virus.canvas.getContext("2d");
        L11_Virus.canvas.addEventListener("click", handleClick);
        L11_Virus.resizeCanvas();
        L11_Virus.createBackground();
        createCells();
        window.setInterval(animation, 30);
    }
    function handleClick(_event) {
        let x = _event.clientX;
        let y = _event.clientY;
        for (let cell of cells) {
            if (cell instanceof L11_Virus.BodyCell && cell.status == L11_Virus.STATE_BODYCELL.INFECTED) {
                if (cell.position.x - 40 < x && cell.position.x + 40 > x && cell.position.y - 50 < y && cell.position.y + 50 > y) {
                    cell.status = L11_Virus.STATE_BODYCELL.KILLED;
                    cell.draw();
                    window.setTimeout(function () {
                        killBodyCell(cell);
                    }, 2000);
                }
            }
        }
    }
    function createCells() {
        //Depending on the size of the canvas, different numbers of cells are created
        let numCircles = (L11_Virus.width + L11_Virus.height) / 5;
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
        if (L11_Virus.width > 800) {
            numCircles = numCircles;
            j = Math.floor(L11_Virus.width / 50);
            nParticles = 400;
        }
        else {
            numCircles = numCircles / 2;
            j = 10;
            nParticles = 100;
        }
        //Create Cells for the Background
        for (let i = 0; i < numCircles; i++) {
            // Creating some random values for circle characteristics.
            xPos = Math.random() * L11_Virus.canvas.width;
            yPos = Math.random() * L11_Virus.canvas.height;
            let position = new L11_Virus.Vector(xPos, yPos);
            let cell = new L11_Virus.Background(position);
            cell.draw();
        }
        //  Create Macrophages
        for (let i = 0; i < 2; i++) {
            let position = new L11_Virus.Vector(L11_Virus.width - 200 + (200 * Math.random()), 400 + (200 * Math.random()));
            let macrophage = new L11_Virus.Macrophage(position);
            macrophage.draw();
        }
        backgroundImage = L11_Virus.crc2.getImageData(0, 0, L11_Virus.width, L11_Virus.height);
        //Create Antibodys
        for (let i = 0; i < j; i++) {
            xPos = Math.random() * L11_Virus.canvas.width / 1.5;
            yPos = 450 + (70 * Math.random());
            /* if (xPos > width / 2) {
                yPos = yPos + 50;
                xPos = xPos - width / 2 + 10;
            } */
            let position = new L11_Virus.Vector(xPos, yPos);
            let antibody = new L11_Virus.Antibody(position);
            antibody.draw();
            cells.push(antibody);
        }
        //Create bigger Cells for the foreground
        while (storage < L11_Virus.width) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position = new L11_Virus.Vector(xPos, yPos);
            let cell = new L11_Virus.BodyCell(position);
            cell.draw();
            cells.push(cell);
        }
        for (let i = 0; i < j; i++) {
            radius = 30;
            xPos = coronaPosition + radius + 10;
            coronaPosition = xPos + radius;
            yPos = 220 + (50 * Math.random());
            if (xPos > L11_Virus.width) {
                yPos = yPos + 100;
                xPos = xPos - L11_Virus.width + 10;
            }
            let position = new L11_Virus.Vector(xPos, yPos);
            let corona = new L11_Virus.Corona(position);
            corona.draw();
            cells.push(corona);
        }
        for (let i = 0; i < nParticles; i++) {
            xPos = Math.random() * L11_Virus.canvas.width;
            yPos = Math.random() * L11_Virus.canvas.height;
            // Call draw Cell and commit all needed values for the cell 
            let position = new L11_Virus.Vector(xPos, yPos);
            let cell = new L11_Virus.Particle(position);
            cell.draw();
            cells.push(cell);
        }
    }
    function animation() {
        L11_Virus.crc2.putImageData(backgroundImage, 0, 0);
        for (let cell of cells) {
            if (cell instanceof L11_Virus.Corona)
                cell.move(1 / 20);
            else if (cell instanceof L11_Virus.BodyCell)
                cell.move(1 / 30);
            else if (cell instanceof L11_Virus.Particle)
                cell.move(1 / 50);
            cell.draw();
        }
        isInfected();
    }
    function isInfected() {
        for (let unit of cells)
            switch (unit.type) {
                case "BodyCell":
                    let areaMin = unit.position.x - 40;
                    let areaMax = unit.position.x + 40;
                    for (let cell of cells) {
                        if (cell instanceof L11_Virus.Corona && cell.position.x > areaMin && cell.position.x < areaMax && cell.status == L11_Virus.STATE_CORONA.NORMAL) {
                            if (cell.isInfected()) {
                                startReaction(cell);
                                changeBodyCell(cell.position.x);
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
    }
    function startReaction(_corona) {
        _corona.status = L11_Virus.STATE_CORONA.INFECTING;
        window.setTimeout(function () {
            handleCoronaState(_corona, 1000);
        }, 3000);
    }
    function changeBodyCell(_virusPos) {
        for (let cell of cells) {
            let areaMin = cell.position.x - 40;
            let areaMax = cell.position.x + 40;
            if (cell instanceof L11_Virus.BodyCell && cell.status != L11_Virus.STATE_BODYCELL.KILLED && _virusPos > areaMin && _virusPos < areaMax) {
                cell.status = L11_Virus.STATE_BODYCELL.INFECTED;
                let bodyCell = cell;
                window.setTimeout(function () {
                    handleCellState(bodyCell);
                }, 3000);
            }
        }
    }
    function handleCellState(_cell) {
        if (_cell.status != L11_Virus.STATE_BODYCELL.KILLED) {
            let newCorona = new L11_Virus.Corona(_cell.position, L11_Virus.STATE_CORONA.PASSIVE);
            newCorona.draw();
            cells.push(newCorona);
            handleCoronaState(newCorona, 2000);
            killBodyCell(_cell);
        }
    }
    function handleCoronaState(_cell, _t) {
        window.setTimeout(function () {
            changeCoronaState(_cell);
        }, _t);
    }
    function killBodyCell(_cell) {
        let index = cells.indexOf(_cell);
        cells.splice(index, 1);
    }
    function changeCoronaState(_cell) {
        switch (_cell.status) {
            case L11_Virus.STATE_CORONA.INFECTING:
                _cell.status = L11_Virus.STATE_CORONA.PASSIVE;
                handleCoronaState(_cell, 1000);
                break;
            case L11_Virus.STATE_CORONA.PASSIVE:
                _cell.status = L11_Virus.STATE_CORONA.NORMAL;
                break;
            default:
                _cell.status = L11_Virus.STATE_CORONA.NORMAL;
        }
    }
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=L11_Virus.js.map