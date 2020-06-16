"use strict";
var L09_Virus;
(function (L09_Virus) {
    class Macrophage {
        draw(_xPosition, _yPosition) {
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(_xPosition + 40, _yPosition + 40, 40, 0, 2 * Math.PI);
            L09_Virus.crc2.arc(_xPosition + 18, _yPosition + 12, 35, 0, 2 * Math.PI);
            L09_Virus.crc2.arc(_xPosition + 80, _yPosition + 52, 30, 0, 2 * Math.PI);
            L09_Virus.crc2.fillStyle = "#008080";
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.fill();
            // Add a nucleus 
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(_xPosition + 40, _yPosition + 40, 7, 0, 2 * Math.PI);
            L09_Virus.crc2.fillStyle = "darkslategrey";
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.fill();
        }
    }
    L09_Virus.Macrophage = Macrophage;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Macrophage.js.map