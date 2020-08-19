"use strict";
var EIA2_EndabgabeV2;
(function (EIA2_EndabgabeV2) {
    class Vector {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        static getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x = _factor * this.x;
            this.y = this.y * _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        substract(_addend) {
            this.x -= _addend.x;
            this.y -= _addend.y;
        }
    }
    EIA2_EndabgabeV2.Vector = Vector;
})(EIA2_EndabgabeV2 || (EIA2_EndabgabeV2 = {}));
//# sourceMappingURL=Vector.js.map