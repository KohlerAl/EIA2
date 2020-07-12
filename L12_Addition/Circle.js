"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Circle extends EIA2_Endabgabe.Form {
        constructor() {
            super();
            this.type = "Circle";
        }
        draw() {
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.translate(this.position.x, this.position.y);
            EIA2_Endabgabe.crc2.rotate(this.rotation);
            EIA2_Endabgabe.crc2.arc(this.position.x, this.position.y, this.size.x, 0, 2 * Math.PI);
            if (this.active == true) {
                EIA2_Endabgabe.crc2.strokeStyle = "red";
                EIA2_Endabgabe.crc2.lineWidth = 2;
            }
            else {
                EIA2_Endabgabe.crc2.strokeStyle = this.color;
            }
            EIA2_Endabgabe.crc2.fillStyle = this.color;
            EIA2_Endabgabe.crc2.stroke();
            EIA2_Endabgabe.crc2.fill();
            EIA2_Endabgabe.crc2.restore();
            EIA2_Endabgabe.crc2.closePath();
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.stroke();
            EIA2_Endabgabe.crc2.fill();
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
            super.move();
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
    EIA2_Endabgabe.Circle = Circle;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Circle.js.map