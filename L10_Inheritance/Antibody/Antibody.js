"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Antibody {
        constructor(_position) {
            this.position = _position;
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(2, 5);
            this.rotation = Math.random() * 360;
        }
        draw(_position) {
            L10_Virus.crc2.save();
            L10_Virus.crc2.translate(_position.x, _position.y);
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
            // Offset = Geschwindigkeit
            let offset = new L10_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.x *= 0;
            offset.y *= _timeslice;
            // Zu der Posiition addieren 
            this.position.add(offset);
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