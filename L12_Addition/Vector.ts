namespace EIA2_Endabgabe {
    export class Vector {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        public static getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }

        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        public scale(_factor: number): void {
            this.x = _factor * this.x;
            this.y = this.y * _factor;
        }

        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y;
        }

        public substract(_addend: Vector): void {
            this.x -= _addend.x;
            this.y -= _addend.y;
        }

    }
}
