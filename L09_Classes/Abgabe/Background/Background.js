"use strict";
var L09_Virus;
(function (L09_Virus) {
    class Background {
        constructor(_position) {
            this.velocity = new L09_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
        }
        draw(_position) {
            L09_Virus.crc2.save();
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
            L09_Virus.crc2.shadowColor = "gray";
            L09_Virus.crc2.shadowOffsetX = 1;
            L09_Virus.crc2.shadowOffsetY = 1;
            L09_Virus.crc2.shadowBlur = 5;
            let rotation = Math.random() * 360;
            // Creating a pattern, to give the Cells a bit of texture
            let pattern = document.createElement("canvas").getContext("2d");
            pattern.canvas.width = 2;
            pattern.canvas.height = 2;
            pattern.fillStyle = color + "55";
            pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
            pattern.arc(2, 2, Math.floor(Math.random() * 2), 0, 2 * Math.PI);
            pattern.strokeStyle = color + "55";
            pattern.stroke();
            L09_Virus.crc2.fillStyle = L09_Virus.crc2.createPattern(pattern.canvas, "repeat");
            // Create the Cell itself
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.ellipse(_position.x, _position.y, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.strokeStyle = color + "88";
            L09_Virus.crc2.fillStyle = pattern;
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.fill();
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(_position.x + 2, _position.y - 3, 3, Math.random(), 1.7 * Math.PI);
            L09_Virus.crc2.fillStyle = nucleusColor + "33";
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.fill();
        }
        move(_timeslice) {
            // Offset = Geschwindigkeit
            let offset = new L09_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.scale(_timeslice);
            // Zu der Posiition addieren 
            this.position.add(offset);
            // Überprüfen, ob der Asteroid noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            // Wenn er größer als height ist, height von der Position abziehen 
            if (this.position.y > L09_Virus.width) {
                this.position.y -= L09_Virus.width;
            }
        }
    }
    L09_Virus.Background = Background;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Background.js.map