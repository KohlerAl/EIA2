"use strict";
var EIA2_Endabgabe;
(function (EIA2_Endabgabe) {
    class Moon extends EIA2_Endabgabe.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Moon";
        }
        draw() {
            EIA2_Endabgabe.crc2.beginPath();
            EIA2_Endabgabe.crc2.save();
            EIA2_Endabgabe.crc2.translate(this.position.x, this.position.y);
            EIA2_Endabgabe.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_Endabgabe.crc2.arc(0, 0, this.size.x, 0, 2 * Math.PI);
            EIA2_Endabgabe.crc2.globalCompositeOperation = "lighter";
            EIA2_Endabgabe.crc2.shadowColor = "#ffffff66";
            EIA2_Endabgabe.crc2.lineWidth = 4;
            EIA2_Endabgabe.crc2.shadowOffsetX = 5;
            EIA2_Endabgabe.crc2.shadowOffsetY = 5;
            EIA2_Endabgabe.crc2.shadowBlur = 10;
            if (this.active == true) {
                EIA2_Endabgabe.crc2.strokeStyle = "red";
                ;
                EIA2_Endabgabe.crc2.stroke();
            }
            else {
                EIA2_Endabgabe.crc2.strokeStyle = this.color;
                EIA2_Endabgabe.crc2.stroke();
            }
            EIA2_Endabgabe.crc2.restore();
            EIA2_Endabgabe.crc2.closePath();
            /* crc2.beginPath();
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.rotate(this.rotation* Math.PI / 180);
            crc2.arc(this.size.x/4, this.size.x/4, this.size.x/1.5, 0, 2 * Math.PI);
            crc2.globalAlpha = 0.1;
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.restore();
            crc2.closePath();  */
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
    EIA2_Endabgabe.Moon = Moon;
})(EIA2_Endabgabe || (EIA2_Endabgabe = {}));
//# sourceMappingURL=Moon.js.map