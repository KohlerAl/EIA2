"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    let FORM_MOVE;
    (function (FORM_MOVE) {
        FORM_MOVE["ROTATE"] = "rotate";
        FORM_MOVE["MOVE"] = "move";
    })(FORM_MOVE = EIA2_Endabgabe.FORM_MOVE || (EIA2_Endabgabe.FORM_MOVE = {}));
    class Form {
        constructor(_info) {
            this.velocity = new EIA2_Endabgabe.Vector(5, 5);
            console.log(_info);
            if (_info) {
                if (_info[0] == "true") {
                    this.active = true;
                    console.log("This is true");
                }
                else
                    this.active = false;
                this.size = new EIA2_Endabgabe.Vector(parseInt(_info[1]), parseInt(_info[2]));
                this.position = new EIA2_Endabgabe.Vector(parseInt(_info[3]), parseInt(_info[4]));
                console.log(this.position);
                this.rotation = parseInt(_info[5]);
                if (_info[6] == "move")
                    this.moveType = FORM_MOVE.MOVE;
                else
                    this.moveType = FORM_MOVE.ROTATE;
                this.color = _info[7];
                this.velocity = new EIA2_Endabgabe.Vector(parseInt(_info[8]), parseInt(_info[9]));
                if (_info[10] == "true") {
                    this.neon = true;
                }
                else
                    this.neon = false;
                if (_info[11] == "true") {
                    this.threeD = true;
                }
                else
                    this.threeD = false;
            }
            else {
                this.color = "#ffffff";
                this.size = new EIA2_Endabgabe.Vector(40, 40);
                this.position = new EIA2_Endabgabe.Vector(50, 50);
                this.rotation = 0;
                this.active = true;
                this.moveType = FORM_MOVE.MOVE;
                this.neon = false;
                this.threeD = false;
            }
        }
        draw() {
            if (this.neon == true) {
                EIA2_Endabgabe.crc2.globalCompositeOperation = "lighter";
                EIA2_Endabgabe.crc2.shadowColor = this.color;
                EIA2_Endabgabe.crc2.lineWidth = 8;
                EIA2_Endabgabe.crc2.shadowOffsetX = 2;
                EIA2_Endabgabe.crc2.shadowOffsetY = 2;
                EIA2_Endabgabe.crc2.shadowBlur = 15;
                EIA2_Endabgabe.crc2.strokeStyle = "#ffffff88";
            }
            else if (this.threeD == true) {
                EIA2_Endabgabe.crc2.fillStyle = "414141";
                EIA2_Endabgabe.crc2.shadowBlur = 10;
                EIA2_Endabgabe.crc2.shadowColor = "cyan";
                EIA2_Endabgabe.crc2.shadowOffsetX = -5;
                EIA2_Endabgabe.crc2.shadowOffsetY = 0;
                EIA2_Endabgabe.crc2.lineWidth = 2;
                EIA2_Endabgabe.crc2.strokeStyle = "#ff3a1f80";
                EIA2_Endabgabe.crc2.fill();
            }
            else {
                EIA2_Endabgabe.crc2.strokeStyle = this.color;
                EIA2_Endabgabe.crc2.fillStyle = this.color;
                EIA2_Endabgabe.crc2.lineWidth = 4;
                EIA2_Endabgabe.crc2.fill();
            }
            if (this.active == true) {
                EIA2_Endabgabe.crc2.strokeStyle = "red";
                EIA2_Endabgabe.crc2.lineWidth = 4;
                EIA2_Endabgabe.crc2.stroke();
            }
            else {
                EIA2_Endabgabe.crc2.strokeStyle = this.color;
                EIA2_Endabgabe.crc2.stroke();
            }
        }
        move(_rotateValue) {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset = new EIA2_Endabgabe.Vector(this.velocity.x, this.velocity.y);
                    offset.scale(1 / 50);
                    this.position.add(offset);
                    break;
                case FORM_MOVE.ROTATE:
                    this.rotation += _rotateValue;
                    break;
                default:
                    break;
            }
        }
        changeColor(_newColor) {
            this.color = _newColor;
        }
        changeRotation(_factor) {
            this.rotation = _factor;
        }
        resize(_factor) {
            this.size.scale(_factor);
        }
        changePosition(_x, _y) {
            this.position.x = _x;
            this.position.y = _y;
        }
    }
    EIA2_Endabgabe.Form = Form;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Form.js.map