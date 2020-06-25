"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Antibody extends L10_Virus.Cell {
        constructor(_position) {
            super(_position);
            this.velocity.random(7, 10);
            this.rotation = Math.random() * 360;
        }
        draw() {
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(this.position.x, this.position.y);
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.rotate(this.rotation);
            L10_Virus.crc2.moveTo(0, 0);
            L10_Virus.crc2.lineTo(0, 24);
            L10_Virus.crc2.strokeStyle = "#114d89";
            L10_Virus.crc2.lineWidth = 2;
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(0, 36, 12, 0, 1 * Math.PI, true);
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.x < 0)
                this.position.x += L10_Virus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Virus.crc2.canvas.height;
            if (this.position.x > L10_Virus.crc2.canvas.width)
                this.position.x -= L10_Virus.crc2.canvas.width;
            if (this.position.y > L10_Virus.crc2.canvas.height)
                this.position.y -= L10_Virus.crc2.canvas.height;
        }
    }
    L10_Virus.Antibody = Antibody;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Antibody.js.map