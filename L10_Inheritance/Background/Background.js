"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Background {
        constructor(_position) {
            this.velocity = new L10_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
        }
        draw(_position) {
            L10_Virus.crc2.save();
            let colors = ["#fbcde2", "#c57ea2", "#f5aacf", "#fdddec"];
            let nucleusColors = ["#888888", "#373737", "#4a4a4a", "#444444"];
            let numColors = colors.length;
            let radius = 5 + (Math.random() * 15);
            let colorIndex = Math.round(Math.random() * (numColors - 1));
            let color = colors[colorIndex];
            let nucleusColor = nucleusColors[colorIndex];
            // Set Parameters for Angles, Shadows and Rotation 
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            L10_Virus.crc2.shadowColor = "gray";
            L10_Virus.crc2.shadowOffsetX = 1;
            L10_Virus.crc2.shadowOffsetY = 1;
            L10_Virus.crc2.shadowBlur = 5;
            let rotation = Math.random() * 360;
            // Creating a pattern, to give the Cells a bit of texture
            let pattern = document.createElement('canvas').getContext('2d');
            pattern.canvas.width = 2;
            pattern.canvas.height = 2;
            pattern.fillStyle = color + "55";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(2, 2, Math.floor(Math.random() * 2), 0, 2 * Math.PI);
            pattern.strokeStyle = color + "55";
            pattern.stroke();
            L10_Virus.crc2.fillStyle = L10_Virus.crc2.createPattern(pattern.canvas, "repeat");
            // Create the Cell itself
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.ellipse(_position.x, _position.y, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.strokeStyle = color + "88";
            L10_Virus.crc2.fillStyle = pattern;
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.arc(_position.x + 2, _position.y - 3, 3, Math.random(), 1.7 * Math.PI);
            L10_Virus.crc2.fillStyle = nucleusColor + "33";
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.fill();
        }
        move(_timeslice) {
            // Offset = Geschwindigkeit
            let offset = new L10_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.scale(_timeslice);
            // Zu der Posiition addieren 
            this.position.add(offset);
            // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            // Wenn er größer als height ist, height von der Position abziehen 
            if (this.position.y > L10_Virus.width) {
                this.position.y -= L10_Virus.width;
            }
        }
    }
    L10_Virus.Background = Background;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Background.js.map