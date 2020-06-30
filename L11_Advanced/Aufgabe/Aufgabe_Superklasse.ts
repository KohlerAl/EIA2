namespace L11_Aufgabe {
    export abstract class Cell {
        position: Vector;
        velocity: Vector;
        color: string; 

        constructor(_position: Vector) {
            this.position = _position; 
            this.velocity = new Vector(0, 0); 
            this.color = "000000";
        }

        draw(): void {
            //Just a happy little comment to avoid the error message :)
        }

        move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }

        abstract setColor(): void; 
    }
}