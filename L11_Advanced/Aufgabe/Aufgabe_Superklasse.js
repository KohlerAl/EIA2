"use strict";
var L11_Aufgabe;
(function (L11_Aufgabe) {
    class Cell {
        constructor(_position) {
            this.position = _position;
            this.velocity = new L11_Aufgabe.Vector(0, 0);
            this.color = "000000";
        }
        draw() {
            //Just a happy little comment to avoid the error message :)
        }
        move(_timeslice) {
            let offset = new L11_Aufgabe.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    L11_Aufgabe.Cell = Cell;
})(L11_Aufgabe || (L11_Aufgabe = {}));
//# sourceMappingURL=Aufgabe_Superklasse.js.map