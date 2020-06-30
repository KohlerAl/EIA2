namespace L11_Virus {
    export abstract class Cell {
        public position: Vector;
        public velocity: Vector;

        constructor(_position: Vector) {
            this.position = _position; 
            this.velocity = new Vector(0, 0); 
        }

        abstract draw(): void 

        public move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
}