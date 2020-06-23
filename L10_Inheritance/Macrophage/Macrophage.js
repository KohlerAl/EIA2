"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Macrophage extends L10_Virus.Cell {
        constructor(_position) {
            super(_position);
        }
        draw(_position) {
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(_position.x + 40, _position.y + 40, 40, 0, 2 * Math.PI);
            L10_Virus.crc2.arc(_position.x + 18, _position.y + 12, 35, 0, 2 * Math.PI);
            L10_Virus.crc2.arc(_position.x + 80, _position.y + 52, 30, 0, 2 * Math.PI);
            L10_Virus.crc2.fillStyle = "#008080";
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
            // Add a nucleus 
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(_position.x + 40, _position.y + 40, 7, 0, 2 * Math.PI);
            L10_Virus.crc2.fillStyle = "darkslategrey";
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
        }
    }
    L10_Virus.Macrophage = Macrophage;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Macrophage.js.map