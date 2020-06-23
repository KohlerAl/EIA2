"use strict";
var L10_Virus;
(function (L10_Virus) {
    class BodyCell extends L10_Virus.Cell {
        constructor(_position, _colorIndex) {
            super(_position);
            let colors = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f", "#891911"];
            let nucleusColors = ["#888888", "#373737", "#4a4a4a", "#444444", "#4a4a4a"];
            this.nucleusPosX = _position.x + 2;
            this.nucleusPosY = _position.y - (25 * Math.random());
            this.color = colors[_colorIndex];
            this.nucleus = nucleusColors[_colorIndex];
            this.velocity.add(new L10_Virus.Vector(0, 12));
        }
        draw(_position) {
            L10_Virus.crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            // Create the Cell itself
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.ellipse(_position.x, _position.y, 40, 50, 0, startAngle, endAngle);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.strokeStyle = this.color;
            L10_Virus.crc2.fillStyle = this.color;
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.fill();
            //Draw Nucleus 
            //They are not perfect circles, to make them look more naturally
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(this.nucleusPosX, this.nucleusPosY, 10, Math.random(), 1.95 * Math.PI);
            L10_Virus.crc2.fillStyle = this.nucleus + "66";
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.y < 72)
                this.velocity = new L10_Virus.Vector(0, 10);
            if (this.position.y > 87)
                this.velocity = new L10_Virus.Vector(0, -10);
        }
    }
    L10_Virus.BodyCell = BodyCell;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=BodyCell.js.map