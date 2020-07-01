"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Cell {
        constructor(_position) {
            this.type = "Cell";
            this.position = _position;
            this.velocity = new L11_Virus.Vector(0, 0);
        }
        move(_timeslice) {
            let offset = new L11_Virus.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    L11_Virus.Cell = Cell;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Cell.js.map