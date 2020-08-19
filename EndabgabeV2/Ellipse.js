"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    class Ellipse extends EIA2_EndabgabeV2.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Ellipse";
        }
        draw() {
            EIA2_EndabgabeV2.crc2.beginPath();
            EIA2_EndabgabeV2.crc2.save();
            EIA2_EndabgabeV2.crc2.translate(this.position.x, this.position.y);
            EIA2_EndabgabeV2.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_EndabgabeV2.crc2.ellipse(0, 0, this.size.x, this.size.y / 2, this.rotation, 0, 2 * Math.PI);
            super.draw();
            EIA2_EndabgabeV2.crc2.fillStyle = this.color;
            EIA2_EndabgabeV2.crc2.stroke();
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
            super.move(0.01);
            if (this.position.x < 0)
                this.position.x += EIA2_EndabgabeV2.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += EIA2_EndabgabeV2.crc2.canvas.height;
            if (this.position.x > EIA2_EndabgabeV2.crc2.canvas.width)
                this.position.x -= EIA2_EndabgabeV2.crc2.canvas.width;
            if (this.position.y > EIA2_EndabgabeV2.crc2.canvas.height)
                this.position.y -= EIA2_EndabgabeV2.crc2.canvas.height;
        }
    }
    EIA2_EndabgabeV2.Ellipse = Ellipse;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Ellipse.js.map