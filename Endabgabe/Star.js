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
            for (var i = 0; i < 5; i++) {
                EIA2_Endabgabe.crc2.rotate(Math.PI / 5);
                EIA2_Endabgabe.crc2.lineTo(0, 0 - (this.size.x / 2 * this.size.x / 20));
                EIA2_Endabgabe.crc2.rotate(Math.PI / 5);
                EIA2_Endabgabe.crc2.lineTo(0, 0 - this.size.x / 2);
            }
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