"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Heart extends EIA2_Endabgabe.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.position.x = 100;
            this.position.y = 100;
            this.type = "Heart";
        }
        draw() {
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.translate(this.position.x, this.position.y);
            EIA2_Endabgabe.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_Endabgabe.crc2.moveTo(75, 40);
            EIA2_Endabgabe.crc2.bezierCurveTo(75, 37, 70, 25, 50, 25);
            EIA2_Endabgabe.crc2.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            EIA2_Endabgabe.crc2.bezierCurveTo(20, 80, 40, 102, 75, 120);
            EIA2_Endabgabe.crc2.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            EIA2_Endabgabe.crc2.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            EIA2_Endabgabe.crc2.bezierCurveTo(85, 25, 75, 37, 75, 40);
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
                EIA2_Endabgabe.crc2.strokeStyle = "#ff3a1f00";
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
                EIA2_Endabgabe.crc2.stroke();
            }
            else {
                EIA2_Endabgabe.crc2.stroke();
            }
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
            if (this.position.x < 0)
                this.position.x += EIA2_Endabgabe.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += EIA2_Endabgabe.crc2.canvas.height;
            if (this.position.x > EIA2_Endabgabe.crc2.canvas.width)
                this.position.x -= EIA2_Endabgabe.crc2.canvas.width;
            if (this.position.y > EIA2_Endabgabe.crc2.canvas.height)
                this.position.y -= EIA2_Endabgabe.crc2.canvas.height;
        }
    }
    EIA2_Endabgabe.Heart = Heart;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Heart.js.map