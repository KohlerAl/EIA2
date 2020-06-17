namespace L09_Virus {
    export class Background {
        position: Vector;
        velocity: Vector;

        constructor(_position: Vector) {
            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);
        }

        draw(_position: Vector): void {
            crc2.save();

            let colors: string[] = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
            let nucleusColors: string[] = ["#888888", "#373737", "#4a4a4a", "#444444"];
            let numColors: number = colors.length; 
            let radius = 5 + (Math.random() * 15);
            let colorIndex = Math.round(Math.random() * (numColors - 1));
            let color = colors[colorIndex];
            let nucleusColor = nucleusColors[colorIndex];
            // Set Parameters for Angles, Shadows and Rotation 
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            crc2.shadowColor = "gray";
            crc2.shadowOffsetX = 1;
            crc2.shadowOffsetY = 1;
            crc2.shadowBlur = 5;
            let rotation: number = Math.random() * 360;

            // Creating a pattern, to give the Cells a bit of texture
            let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 2;
            pattern.canvas.height = 2;

            pattern.fillStyle = color + "55";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(2, 2, Math.floor(Math.random() * 2), 0, 2 * Math.PI);
            pattern.strokeStyle = color + "55";
            pattern.stroke();

            crc2.fillStyle = <CanvasRenderingContext2D>crc2.createPattern(pattern.canvas, "repeat");

            // Create the Cell itself
            crc2.beginPath();

            crc2.ellipse(_position.x, _position.y, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = color + "88";
            crc2.fillStyle = pattern;
            crc2.stroke();
            crc2.fill();

            crc2.beginPath();
            crc2.arc(_position.x + 2, _position.y - 3, 3, Math.random(), 1.7 * Math.PI);
            crc2.fillStyle = nucleusColor + "33";

            crc2.closePath();
            crc2.fill();

        }

        move(_timeslice: number): void {
            // Offset = Geschwindigkeit
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.scale(_timeslice);
            // Zu der Posiition addieren 
            this.position.add(offset);

            // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            // Wenn er größer als height ist, height von der Position abziehen 
            if (this.position.y > width) {
                this.position.y -= width;
            }
        }
    }
}