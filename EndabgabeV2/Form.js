"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    let FORM_MOVE;
    (function (FORM_MOVE) {
        FORM_MOVE["ROTATE"] = "rotate";
        FORM_MOVE["MOVE"] = "move";
    })(FORM_MOVE = EIA2_EndabgabeV2.FORM_MOVE || (EIA2_EndabgabeV2.FORM_MOVE = {}));
    class Form {
        constructor(_info) {
            this.velocity = new EIA2_EndabgabeV2.Vector(5, 5);
            this.color = "#ffffff";
            this.size = new EIA2_EndabgabeV2.Vector(40, 40);
            this.position = new EIA2_EndabgabeV2.Vector(50, 50);
            this.rotation = 0;
            this.active = true;
            this.moveType = FORM_MOVE.MOVE;
            this.neon = false;
            this.threeD = false;
        }
        draw() {
            if (this.neon == true) {
                EIA2_EndabgabeV2.crc2.globalCompositeOperation = "lighter";
                EIA2_EndabgabeV2.crc2.shadowColor = this.color;
                EIA2_EndabgabeV2.crc2.lineWidth = 8;
                EIA2_EndabgabeV2.crc2.shadowOffsetX = 2;
                EIA2_EndabgabeV2.crc2.shadowOffsetY = 2;
                EIA2_EndabgabeV2.crc2.shadowBlur = 15;
                EIA2_EndabgabeV2.crc2.strokeStyle = "#ffffff88";
            }
            else if (this.threeD == true) {
                EIA2_EndabgabeV2.crc2.fillStyle = "414141";
                EIA2_EndabgabeV2.crc2.shadowBlur = 10;
                EIA2_EndabgabeV2.crc2.shadowColor = "cyan";
                EIA2_EndabgabeV2.crc2.shadowOffsetX = -5;
                EIA2_EndabgabeV2.crc2.shadowOffsetY = 0;
                EIA2_EndabgabeV2.crc2.lineWidth = 2;
                EIA2_EndabgabeV2.crc2.strokeStyle = "#ff3a1f80";
                EIA2_EndabgabeV2.crc2.fill();
            }
            else {
                EIA2_EndabgabeV2.crc2.strokeStyle = this.color;
                EIA2_EndabgabeV2.crc2.fillStyle = this.color;
                EIA2_EndabgabeV2.crc2.lineWidth = 4;
                EIA2_EndabgabeV2.crc2.fill();
            }
            if (this.active == true) {
                EIA2_EndabgabeV2.crc2.strokeStyle = "red";
                EIA2_EndabgabeV2.crc2.lineWidth = 4;
                EIA2_EndabgabeV2.crc2.stroke();
            }
            else {
                EIA2_EndabgabeV2.crc2.strokeStyle = this.color;
                EIA2_EndabgabeV2.crc2.stroke();
            }
        }
        move(_rotateValue) {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset = new EIA2_EndabgabeV2.Vector(this.velocity.x, this.velocity.y);
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
        restoreFigure(_info) {
            if (_info[0] == "true")
                this.setActive(true);
            else
                this.setActive(false);
            this.resize(parseInt(_info[1]));
            this.changePosition(parseInt(_info[2]), parseInt(_info[3]));
            this.changeRotation(parseInt(_info[4]));
            if (_info[5] == "FORM_MOVE.MOVE")
                this.setAnimation(FORM_MOVE.MOVE);
            else
                this.setAnimation(FORM_MOVE.ROTATE);
            this.changeColor(_info[6]);
            this.changeVelocity(parseInt(_info[7]));
            if (_info[9] == "true")
                this.neon = true;
            if (_info[10] == "true")
                this.threeD = true;
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
        setActive(_active) {
            this.active = _active;
        }
        setAnimation(_move) {
            this.moveType = _move;
        }
        changeVelocity(_speed) {
            this.velocity.x = _speed;
            this.velocity.y = _speed;
        }
    }
    EIA2_EndabgabeV2.Form = Form;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Form.js.map