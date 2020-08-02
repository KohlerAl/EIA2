"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Star extends EIA2_Endabgabe.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Star";
        }
        draw() {
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.translate(this.position.x, this.position.y);
            EIA2_Endabgabe.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_Endabgabe.crc2.moveTo(0, 0 - this.size.x / 2);
            for (let i = 0; i < 5; i++) {
                EIA2_Endabgabe.crc2.rotate(Math.PI / 5);
                EIA2_Endabgabe.crc2.lineTo(0, 0 - (this.size.x / 2 * this.size.x / 20));
                EIA2_Endabgabe.crc2.rotate(Math.PI / 5);
                EIA2_Endabgabe.crc2.lineTo(0, 0 - this.size.x / 2);
            }
            super.draw();
            EIA2_Endabgabe.crc2.fillStyle = this.color;
            EIA2_Endabgabe.crc2.restore();
            EIA2_Endabgabe.crc2.closePath();
        }
        changeColor(_newColor) {
            super.changeColor(_newColor);
        }
        changePosition(_x, _y) {
            super.changePosition(_x, _y);
        }
        changeRotation(_factor) {
            super.changeRotation(_factor);
        }
        resize(_factor) {
            super.resize(_factor);
        }
        move() {
            super.move(1);
            if (this.position.x < this.size.x)
                this.position.x += EIA2_Endabgabe.crc2.canvas.width;
            if (this.position.y < this.size.y)
                this.position.y += EIA2_Endabgabe.crc2.canvas.height;
            if (this.position.x > EIA2_Endabgabe.crc2.canvas.width - this.size.x)
                this.position.x -= EIA2_Endabgabe.crc2.canvas.width;
            if (this.position.y > EIA2_Endabgabe.crc2.canvas.height - this.size.y)
                this.position.y -= EIA2_Endabgabe.crc2.canvas.height;
        }
    }
    EIA2_Endabgabe.Star = Star;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Star.js.map