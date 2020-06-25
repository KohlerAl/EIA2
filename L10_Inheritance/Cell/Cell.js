"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Cell {
        constructor(_position) {
            this.position = _position;
            this.velocity = new L10_Virus.Vector(0, 0);
        }
        draw() {
            //Just a happy little comment to avoid the error message :)
        }
        move(_timeslice) {
            let offset = new L10_Virus.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    L10_Virus.Cell = Cell;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Cell.js.map