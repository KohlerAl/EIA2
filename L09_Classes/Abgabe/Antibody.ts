namespace L09_Virus {
    export class Antibody {
        position: Vector;

        draw(_xPos: number, _yPos: number): void {
            crc2.save();
            crc2.translate(_xPos, _yPos);
            crc2.beginPath();
            crc2.rotate(Math.random() * 360);
            crc2.moveTo(0, 0);
            crc2.lineTo(0, 24);
            crc2.strokeStyle = "#114d89"
            crc2.lineWidth = 2;
            crc2.stroke();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(0, 36, 12, 0, 1 * Math.PI, true);
            crc2.stroke();
            crc2.restore();
        }
    }
}