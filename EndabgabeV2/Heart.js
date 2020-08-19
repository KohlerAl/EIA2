"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    class Heart extends EIA2_EndabgabeV2.Form {
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
            EIA2_EndabgabeV2.crc2.beginPath();
            EIA2_EndabgabeV2.crc2.save();
            EIA2_EndabgabeV2.crc2.translate(this.position.x, this.position.y);
            EIA2_EndabgabeV2.crc2.rotate(this.rotation * Math.PI / 180);
            EIA2_EndabgabeV2.crc2.moveTo(75, 40);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(75, 37, 70, 25, 50, 25);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(20, 80, 40, 102, 75, 120);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
            EIA2_EndabgabeV2.crc2.bezierCurveTo(85, 25, 75, 37, 75, 40);
            super.draw();
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
            super.move(1);
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
    EIA2_EndabgabeV2.Heart = Heart;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Heart.js.map