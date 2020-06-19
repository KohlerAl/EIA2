namespace L09_Virus {
    export class Corona {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(30, 80);
        }

        draw(_pos: Vector): void {
            crc2.save();
            crc2.translate(_pos.x, _pos.y);

            for (let i = 0; i < 7; i++) {
                crc2.beginPath();
                crc2.rotate(45);
                crc2.moveTo(0, 25);
                crc2.lineTo(0, 30);
                crc2.strokeStyle = "#777777";
                crc2.lineWidth = 3;
                crc2.stroke();
                crc2.closePath();
                crc2.beginPath();
                crc2.arc(0, 30, 8, 0, 1 * Math.PI);
                crc2.fillStyle = "#cb341a";
                crc2.fill();
            }
            crc2.beginPath();
            crc2.arc(0, 0, 25, 0, 2 * Math.PI);
            crc2.fillStyle = "#ae2d16";
            crc2.fill();
            crc2.closePath();
            crc2.restore();
        }

        move(_timeslice: number): void {
            // Offset = Geschwindigkeit
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            if(this.position.y < 250) {
                offset.scale(_timeslice * 2);
            }
            else {
            offset.scale(_timeslice);}
            // Zu der Posiition addieren 
            this.position.add(offset);

            // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            // Wenn er größer als height ist, height von der Position abziehen 
            if (this.position.x < - 30)
                this.position.x += crc2.canvas.width;
            if (this.position.y < - 30)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width + 30)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height + 30)
                this.position.y -= crc2.canvas.height;
        }

        isInfected(): boolean {
            if (this.position.y < 119) {
                return true;
            }
            else {
                return false;
            }
        }
    }
}