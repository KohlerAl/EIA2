namespace L09_Virus {
    export class Macrophage {
        position: Vector; 

        draw(_xPosition: number, _yPosition: number): void {
            crc2.beginPath();
        crc2.arc(_xPosition + 40, _yPosition + 40, 40, 0, 2 * Math.PI);
        crc2.arc(_xPosition + 18, _yPosition + 12, 35, 0, 2 * Math.PI);
        crc2.arc(_xPosition + 80, _yPosition + 52, 30, 0, 2 * Math.PI);
        crc2.fillStyle = "#008080";
        crc2.closePath();
        crc2.fill();

        // Add a nucleus 
        crc2.beginPath();
        crc2.arc(_xPosition + 40, _yPosition + 40, 7, 0, 2 * Math.PI);
        crc2.fillStyle = "darkslategrey";
        crc2.closePath();
        crc2.fill();
        }
    }
}