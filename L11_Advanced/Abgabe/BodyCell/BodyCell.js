"use strict";
var L11_Virus;
(function (L11_Virus) {
    let STATE_BODYCELL;
    (function (STATE_BODYCELL) {
        STATE_BODYCELL["NORMAL"] = "normal";
        STATE_BODYCELL["INFECTED"] = "infected";
        STATE_BODYCELL["KILLED"] = "killed";
    })(STATE_BODYCELL = L11_Virus.STATE_BODYCELL || (L11_Virus.STATE_BODYCELL = {}));
    class BodyCell extends L11_Virus.Cell {
        constructor(_position, _isInfected) {
            super(_position);
            if (_isInfected) {
                this.status = _isInfected;
            }
            else {
                this.status = STATE_BODYCELL.NORMAL;
            }
            let colorIndex = Math.round(Math.random() * 3);
            let colors = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f"];
            this.color = colors[colorIndex];
            this.nucleusPosX = this.position.x + 2;
            this.nucleusPosY = this.position.y - 2;
            this.nucleus = "#888888";
            this.velocity.add(new L11_Virus.Vector(0, 12));
            this.type = "BodyCell";
        }
        set task(_status) {
            this.status = _status;
        }
        draw() {
            if (this.status == STATE_BODYCELL.INFECTED) {
                this.color = "#891911";
            }
            else if (this.status == STATE_BODYCELL.KILLED) {
                this.color = "#000000";
            }
            L11_Virus.crc2.save();
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            // Create the Cell itself
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.ellipse(this.position.x, this.position.y, 40, 50, 0, startAngle, endAngle);
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.strokeStyle = this.color;
            L11_Virus.crc2.fillStyle = this.color;
            L11_Virus.crc2.stroke();
            L11_Virus.crc2.fill();
            //Draw Nucleus 
            //They are not perfect circles, to make them look more naturally
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(this.nucleusPosX, this.nucleusPosY, 10, Math.random(), 1.95 * Math.PI);
            L11_Virus.crc2.fillStyle = this.nucleus + "66";
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
        }
        move(_timeslice) {
            super.move(_timeslice);
            if (this.position.y < 72)
                this.velocity = new L11_Virus.Vector(0, 10);
            if (this.position.y > 87)
                this.velocity = new L11_Virus.Vector(0, -10);
        }
    }
    L11_Virus.BodyCell = BodyCell;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=BodyCell.js.map