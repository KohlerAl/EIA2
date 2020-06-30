"use strict";
var L11_Virus;
(function (L11_Virus) {
    let STATE;
    (function (STATE) {
        STATE[STATE["NORMAL"] = 0] = "NORMAL";
        STATE[STATE["INFECTED"] = 1] = "INFECTED";
        STATE[STATE["DEAD"] = 2] = "DEAD";
        STATE[STATE["KILLED"] = 3] = "KILLED";
    })(STATE = L11_Virus.STATE || (L11_Virus.STATE = {}));
    class BodyCell extends L11_Virus.Cell {
        constructor(_position, _isInfected) {
            super(_position);
            this.task(_isInfected);
            let colorIndex = Math.round(Math.random() * 3);
            let colors = ["#1bd080", "#55f6a2", "#54b27d", "#00ab5f"];
            this.color = colors[colorIndex];
            this.nucleusPosX = this.position.x + 2;
            this.nucleusPosY = this.position.y - 2;
            this.nucleus = "#888888";
            this.velocity.add(new L11_Virus.Vector(0, 12));
        }
        task(_status) {
            this.status = _status;
        }
        draw() {
            if (this.status == STATE.INFECTED) {
                this.color = "#891911";
            }
            else if (this.status == STATE.DEAD || this.status == STATE.KILLED) {
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