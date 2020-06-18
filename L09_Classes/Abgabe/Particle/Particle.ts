namespace L09_Virus {
    export class Particle {
        position: Vector;
        velocity: Vector;
        radius: number;
        color: string;
        rotation: number;

        constructor(_position: Vector) {
            this.position = _position;

            let colors: string[] = ["#ffcc01", "#ffac16", "#ff9026", "#ffd644"];
            let numColors: number = colors.length;
            let color: string;
            let colorIndex: number;
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            this.color = color; 

            this.rotation = Math.random() * 360;

            this.radius = 1 + (Math.random() * 2);

            this.velocity = new Vector(0, 0);
            this.velocity.random(10, 100);
        }

        draw(_position: Vector): void {
            crc2.save();
            // Set Parameters for Angles, Shadows and Rotation 
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;

            crc2.beginPath();
            crc2.ellipse(_position.x, _position.y, this.radius, this.radius * Math.random() + this.radius, this.rotation, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = this.color + "88";
            crc2.fillStyle = this.color + "33";
            crc2.stroke();
            crc2.fill();
            crc2.fill();

        }

        move(_timeslice: number): void {
            // Offset = Geschwindigkeit
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.x *= 0;
            offset.y *= _timeslice * 1.5;
            // Zu der Posiition addieren 
            this.position.add(offset);

            // Überprüfen, ob der Partikel noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            
            if (this.position.x < 0)
                this.position.x += crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.x -= crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y -= crc2.canvas.height;
        }
    }
}