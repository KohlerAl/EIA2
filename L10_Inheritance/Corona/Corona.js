"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Corona extends L10_Virus.Cell {
        constructor(_position) {
            super(_position);
            this.isInfecting = false;
            this.velocity.random(30, 80);
        }
        draw() {
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 7; i++) {
                L10_Virus.crc2.beginPath();
                L10_Virus.crc2.rotate(45);
                L10_Virus.crc2.moveTo(0, 25);
                L10_Virus.crc2.lineTo(0, 30);
                L10_Virus.crc2.strokeStyle = "#777777";
                L10_Virus.crc2.lineWidth = 3;
                L10_Virus.crc2.stroke();
                L10_Virus.crc2.closePath();
                L10_Virus.crc2.beginPath();
                L10_Virus.crc2.arc(0, 30, 8, 0, 1 * Math.PI);
                L10_Virus.crc2.fillStyle = "#cb341a";
                L10_Virus.crc2.fill();
            }
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(0, 0, 25, 0, 2 * Math.PI);
            L10_Virus.crc2.fillStyle = "#ae2d16";
            L10_Virus.crc2.fill();
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.restore();
        }
        move(_timeslice) {
            if (this.isInfecting == false) {
                if (this.position.y < 250) {
                    super.move(_timeslice * 2);
                }
                else {
                    super.move(_timeslice);
                }
                // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
                // Wenn er größer als height ist, height von der Position abziehen 
                if (this.position.x < -30)
                    this.position.x += L10_Virus.crc2.canvas.width;
                if (this.position.y < -30)
                    this.position.y += L10_Virus.crc2.canvas.height;
                if (this.position.x > L10_Virus.crc2.canvas.width + 30)
                    this.position.x -= L10_Virus.crc2.canvas.width;
                if (this.position.y > L10_Virus.crc2.canvas.height + 30)
                    this.position.y -= L10_Virus.crc2.canvas.height;
            }
        }
        isInfected() {
            if (this.position.y < 125) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    L10_Virus.Corona = Corona;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Corona.js.map