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
            this.color = "#ffffff";
            this.size = new EIA2_Endabgabe.Vector(40, 40);
            this.position = new EIA2_Endabgabe.Vector(0, 0);
            this.rotation = 0;
            this.active = true;
            this.moveType = FORM_MOVE.MOVE;
            this.hitAreaX = new EIA2_Endabgabe.Vector(this.position.x + this.size.x / 2, this.position.x - this.size.x / 2);
            this.hitAreaY = new EIA2_Endabgabe.Vector(this.position.y + this.size.y / 2, this.position.y - this.size.y / 2);
        }
        move() {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset = new EIA2_Endabgabe.Vector(this.velocity.x, this.velocity.y);
                    offset.scale(1 / 50);
                    this.position.add(offset);
                    break;
                case FORM_MOVE.ROTATE:
                    this.rotation += 0.01;
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
            console.log(this.size);
        }
        changePosition(_x, _y) {
            this.position.x = _x;
            this.position.y = _y;
        }
    }
    EIA2_Endabgabe.Form = Form;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Form.js.map