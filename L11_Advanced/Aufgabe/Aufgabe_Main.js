"use strict";
var L11_Aufgabe;
(function (L11_Aufgabe) {
    let cells = [];
    window.addEventListener("load", createImage);
    function createImage() {
        L11_Aufgabe.canvas = document.querySelector("canvas");
        L11_Aufgabe.crc2 = L11_Aufgabe.canvas.getContext("2d");
        createCells();
        window.setInterval(animation, 20);
    }
    function createCells() {
        let xPos;
        let yPos;
        let storage = 0;
        for (let x = 0; x < 10; x++) {
            yPos = 80;
            xPos = storage + 40;
            storage = xPos + 40;
            let position = new L11_Aufgabe.Vector(xPos, yPos);
            let cell = new L11_Aufgabe.BodyCell(position, false);
            cell.draw();
            cells.push(cell);
        }
    }
    function animation() {
        L11_Aufgabe.crc2.fillStyle = "white";
        L11_Aufgabe.crc2.fillRect(0, 0, 360, 560);
        for (let cell of cells) {
            cell.move(1 / 10);
            cell.draw();
            //cell.setColor(); 
        }
    }
})(L11_Aufgabe || (L11_Aufgabe = {}));
//# sourceMappingURL=Aufgabe_Main.js.map