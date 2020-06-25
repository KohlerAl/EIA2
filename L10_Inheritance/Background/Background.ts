namespace L10_Virus {
    export class Background extends Cell {

        constructor(_position: Vector) {
            super(_position); 
        }

        draw(): void {
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

            crc2.ellipse(this.position.x, this.position.y, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
            crc2.closePath();
            crc2.strokeStyle = color + "88";
            crc2.fillStyle = pattern;
            crc2.stroke();
            crc2.fill();

            crc2.beginPath();
            crc2.arc(this.position.x + 2, this.position.y - 3, 3, Math.random(), 1.7 * Math.PI);
            crc2.fillStyle = nucleusColor + "33";

            crc2.closePath();
            crc2.fill();

        }

    }
}