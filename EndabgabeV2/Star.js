"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    class Star extends EIA2_EndabgabeV2.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Star";
        }
        draw() {
            EIA2_EndabgabeV2.crc2.beginPath();
            EIA2_EndabgabeV2.crc2.save();
            EIA2_EndabgabeV2.crc2.translate(this.position.x, this.position.y);
            EIA2_EndabgabeV2.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_EndabgabeV2.crc2.moveTo(0, 0 - this.size.x / 2);
            for (let i = 0; i < 5; i++) {
                EIA2_EndabgabeV2.crc2.rotate(Math.PI / 5);
                EIA2_EndabgabeV2.crc2.lineTo(0, 0 - (this.size.x / 2 * this.size.x / 20));
                EIA2_EndabgabeV2.crc2.rotate(Math.PI / 5);
                EIA2_EndabgabeV2.crc2.lineTo(0, 0 - this.size.x / 2);
            }
            super.draw();
            EIA2_EndabgabeV2.crc2.fillStyle = this.color;
            EIA2_EndabgabeV2.crc2.restore();
            EIA2_EndabgabeV2.crc2.closePath();
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
                this.position.x += EIA2_EndabgabeV2.crc2.canvas.width;
            if (this.position.y < this.size.y)
                this.position.y += EIA2_EndabgabeV2.crc2.canvas.height;
            if (this.position.x > EIA2_EndabgabeV2.crc2.canvas.width - this.size.x)
                this.position.x -= EIA2_EndabgabeV2.crc2.canvas.width;
            if (this.position.y > EIA2_EndabgabeV2.crc2.canvas.height - this.size.y)
                this.position.y -= EIA2_EndabgabeV2.crc2.canvas.height;
        }
    }
    EIA2_EndabgabeV2.Star = Star;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Star.js.map