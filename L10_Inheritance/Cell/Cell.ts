namespace L10_Virus {
    export class Cell {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            this.position = _position; 
            this.velocity = new Vector(0, 0); 
        }

        draw(_position: Vector): void {
            //console.log("draw-Method of Cell"); 
        }

        move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
}