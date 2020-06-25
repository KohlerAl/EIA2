namespace L10_Virus {
    export class Macrophage extends Cell {

        constructor(_position: Vector) {
            super(_position); 
        }

        draw(): void {
            crc2.beginPath();
        crc2.arc(this.position.x + 40, this.position.y + 40, 40, 0, 2 * Math.PI);
        crc2.arc(this.position.x + 18, this.position.y + 12, 35, 0, 2 * Math.PI);
        crc2.arc(this.position.x + 80, this.position.y + 52, 30, 0, 2 * Math.PI);
        crc2.fillStyle = "#008080";
        crc2.closePath();
        crc2.fill();

        // Add a nucleus 
        crc2.beginPath();
        crc2.arc(this.position.x + 40, this.position.y + 40, 7, 0, 2 * Math.PI);
        crc2.fillStyle = "darkslategrey";
        crc2.closePath();
        crc2.fill();
        }
    }
}