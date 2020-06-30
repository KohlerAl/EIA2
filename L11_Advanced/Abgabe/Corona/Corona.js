"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Corona extends L11_Virus.Cell {
        constructor(_position) {
            super(_position);
            this.isInfecting = false;
            this.velocity.random(30, 80);
        }
        draw() {
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            for (let i = 0; i < 7; i++) {
                L11_Virus.crc2.beginPath();
                L11_Virus.crc2.rotate(45);
                L11_Virus.crc2.moveTo(0, 25);
                L11_Virus.crc2.lineTo(0, 30);
                L11_Virus.crc2.strokeStyle = "#777777";
                L11_Virus.crc2.lineWidth = 3;
                L11_Virus.crc2.stroke();
                L11_Virus.crc2.closePath();
                L11_Virus.crc2.beginPath();
                L11_Virus.crc2.arc(0, 30, 8, 0, 1 * Math.PI);
                L11_Virus.crc2.fillStyle = "#cb341a";
                L11_Virus.crc2.fill();
            }
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(0, 0, 25, 0, 2 * Math.PI);
            L11_Virus.crc2.fillStyle = "#ae2d16";
            L11_Virus.crc2.fill();
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.restore();
        }
        move(_timeslice) {
            if (this.isInfecting == false) {
                /* if (this.position.y < 250) {
                    super.move(_timeslice * 2)
                } */
                /* else {
                    super.move(_timeslice);
                } */
                super.move(_timeslice);
                // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
                // Wenn er größer als height ist, height von der Position abziehen 
                if (this.position.x < -30)
                    this.position.x += L11_Virus.crc2.canvas.width;
                if (this.position.y < -30)
                    this.position.y += L11_Virus.crc2.canvas.height;
                if (this.position.x > L11_Virus.crc2.canvas.width + 30)
                    this.position.x -= L11_Virus.crc2.canvas.width;
                if (this.position.y > L11_Virus.crc2.canvas.height + 30)
                    this.position.y -= L11_Virus.crc2.canvas.height;
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
    L11_Virus.Corona = Corona;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Corona.js.map