"use strict";
var L11_Virus;
(function (L11_Virus) {
    let STATE_CORONA;
    (function (STATE_CORONA) {
        STATE_CORONA["NORMAL"] = "normal";
        STATE_CORONA["INFECTING"] = "infecting";
        STATE_CORONA["PASSIVE"] = "passive";
    })(STATE_CORONA = L11_Virus.STATE_CORONA || (L11_Virus.STATE_CORONA = {}));
    class Corona extends L11_Virus.Cell {
        constructor(_position, _status, _target) {
            super(_position);
            this.velocity.random(30, 80);
            if (_status) {
                this.status = _status;
            }
            else {
                this.status = STATE_CORONA.NORMAL;
            }
            if (_target)
                this.target = _target;
            this.type = "Corona";
        }
        set task(_status) {
            this.status = _status;
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
            if (this.target) {
                let move = L11_Virus.Vector.getDifference(this.target, this.position);
                move.scale(0.01);
                this.position.add(move);
            }
            else {
                switch (this.status) {
                    case STATE_CORONA.INFECTING:
                        break;
                    case STATE_CORONA.PASSIVE:
                        super.move(_timeslice * 2);
                        break;
                    default:
                        super.move(_timeslice);
                }
            }
            if (this.position.x < -30)
                this.position.x += L11_Virus.crc2.canvas.width;
            if (this.position.y < -30)
                this.position.y += L11_Virus.crc2.canvas.height;
            if (this.position.x > L11_Virus.crc2.canvas.width + 30)
                this.position.x -= L11_Virus.crc2.canvas.width;
            if (this.position.y > L11_Virus.crc2.canvas.height + 30)
                this.position.y -= L11_Virus.crc2.canvas.height;
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