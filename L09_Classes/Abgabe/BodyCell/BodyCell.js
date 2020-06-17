"use strict";
var L09_Virus;
(function (L09_Virus) {
    class BodyCell {
        constructor(_position, _colorIndex) {
            this.position = _position;
            let colors = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f", "#891911"];
            let nucleusColors = ["#888888", "#373737", "#4a4a4a", "#444444", "#4a4a4a"];
            this.nucleusPosX = _position.x + 2;
            this.nucleusPosY = _position.y - (25 * Math.random());
            /* = this.positio;
            this.nucleusPos.y =   this.position.y - (25 * Math.random()) */
            this.color = colors[_colorIndex];
            this.nucleus = nucleusColors[_colorIndex];
            this.velocity = new L09_Virus.Vector(0, 2);
            //this.velocity.add();
        }
        draw(_position) {
            L09_Virus.crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            // Create the Cell itself
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.ellipse(_position.x, _position.y, 40, 50, 0, startAngle, endAngle);
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.strokeStyle = this.color;
            L09_Virus.crc2.fillStyle = this.color;
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.fill();
            //Draw Nucleus 
            //They are not perfect circles, to make them look more naturally
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(this.nucleusPosX, this.nucleusPosY, 10, Math.random(), 1.95 * Math.PI);
            L09_Virus.crc2.fillStyle = this.nucleus + "66";
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.fill();
        }
        move(_timeslice) {
            // Offset = Geschwindigkeit
            let offset = new L09_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.x *= 0;
            offset.y *= _timeslice;
            // Zu der Posiition addieren 
            this.position.add(offset);
            if (this.position.y < 75)
                offset.y = Math.abs(offset.y);
            if (this.position.y > 85)
                offset.y = -1 * offset.y;
        }
    }
    L09_Virus.BodyCell = BodyCell;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=BodyCell.js.map