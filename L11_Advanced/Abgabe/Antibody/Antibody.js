"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Antibody extends L11_Virus.Cell {
        constructor(_position) {
            super(_position);
            this.velocity.random(7, 10);
            this.rotation = Math.random() * 360;
        }
        draw() {
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.rotate(this.rotation);
            L11_Virus.crc2.moveTo(0, 0);
            L11_Virus.crc2.lineTo(0, 24);
            L11_Virus.crc2.strokeStyle = "#114d89";
            L11_Virus.crc2.lineWidth = 2;
            L11_Virus.crc2.stroke();
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(0, 36, 12, 0, 1 * Math.PI, true);
            L11_Virus.crc2.stroke();
            L11_Virus.crc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.x < 0)
                this.position.x += L11_Virus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L11_Virus.crc2.canvas.height;
            if (this.position.x > L11_Virus.crc2.canvas.width)
                this.position.x -= L11_Virus.crc2.canvas.width;
            if (this.position.y > L11_Virus.crc2.canvas.height)
                this.position.y -= L11_Virus.crc2.canvas.height;
        }
    }
    L11_Virus.Antibody = Antibody;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Antibody.js.map