"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Macrophage extends L11_Virus.Cell {
        constructor(_position) {
            super(_position);
            this.type = "Macrophage";
        }
        draw() {
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(this.position.x + 40, this.position.y + 40, 40, 0, 2 * Math.PI);
            L11_Virus.crc2.arc(this.position.x + 18, this.position.y + 12, 35, 0, 2 * Math.PI);
            L11_Virus.crc2.arc(this.position.x + 80, this.position.y + 52, 30, 0, 2 * Math.PI);
            L11_Virus.crc2.fillStyle = "#008080";
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
            // Add a nucleus 
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(this.position.x + 40, this.position.y + 40, 7, 0, 2 * Math.PI);
            L11_Virus.crc2.fillStyle = "darkslategrey";
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
        }
    }
    L11_Virus.Macrophage = Macrophage;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Macrophage.js.map