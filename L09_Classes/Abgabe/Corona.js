"use strict";
var L09_Virus;
(function (L09_Virus) {
    class Corona {
        constructor(_position) {
            this.velocity = new L09_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
        }
        draw(_pos) {
            L09_Virus.crc2.save();
            L09_Virus.crc2.translate(_pos.x, _pos.y);
            for (let i = 0; i < 7; i++) {
                L09_Virus.crc2.beginPath();
                L09_Virus.crc2.rotate(45);
                L09_Virus.crc2.moveTo(0, 25);
                L09_Virus.crc2.lineTo(0, 30);
                L09_Virus.crc2.strokeStyle = "#777777";
                L09_Virus.crc2.lineWidth = 3;
                L09_Virus.crc2.stroke();
                L09_Virus.crc2.closePath();
                L09_Virus.crc2.beginPath();
                L09_Virus.crc2.arc(0, 30, 8, 0, 1 * Math.PI);
                L09_Virus.crc2.fillStyle = "#cb341a";
                L09_Virus.crc2.fill();
            }
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(0, 0, 25, 0, 2 * Math.PI);
            L09_Virus.crc2.fillStyle = "#ae2d16";
            L09_Virus.crc2.fill();
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.restore();
        }
        move(_timeslice) {
            // Offset = Geschwindigkeit
            let offset = new L09_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.scale(_timeslice);
            // Zu der Posiition addieren 
            this.position.add(offset);
            // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            // Wenn er größer als height ist, height von der Position abziehen 
            if (this.position.y > L09_Virus.width) {
                this.position.y -= L09_Virus.width;
            }
        }
    }
    L09_Virus.Corona = Corona;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Corona.js.map