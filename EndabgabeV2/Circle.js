"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    class Circle extends EIA2_EndabgabeV2.Form {
        constructor(_info) {
            if (_info)
                super(_info);
            else
                super();
            this.type = "Circle";
        }
        draw() {
            EIA2_EndabgabeV2.crc2.beginPath();
            EIA2_EndabgabeV2.crc2.save();
            EIA2_EndabgabeV2.crc2.translate(this.position.x, this.position.y);
            EIA2_EndabgabeV2.crc2.arc(0, 0, this.size.x, 0, 2 * Math.PI);
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
        setActive(_active) {
            super.setActive(_active);
        }
        setAnimation(_move) {
            super.setAnimation(_move);
        }
        changeVelocity(_speed) {
            super.changeVelocity(_speed);
        }
        move() {
            super.move(0);
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
    EIA2_EndabgabeV2.Circle = Circle;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Circle.js.map