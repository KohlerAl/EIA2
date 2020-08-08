"use strict";
var L11_Virus;
(function (L11_Virus) {
    class Background {
        constructor(_position) {
            this.position = _position;
        }
        draw() {
            L11_Virus.crc2.save();
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
            L11_Virus.crc2.fillStyle = L11_Virus.crc2.createPattern(pattern.canvas, "repeat");
            // Create the Cell itself
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.ellipse(this.position.x, this.position.y, radius, radius * Math.random() + radius, rotation, startAngle, endAngle);
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.strokeStyle = color + "88";
            L11_Virus.crc2.fillStyle = pattern;
            L11_Virus.crc2.stroke();
            L11_Virus.crc2.fill();
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(this.position.x + 2, this.position.y - 3, 3, Math.random(), 1.7 * Math.PI);
            L11_Virus.crc2.fillStyle = nucleusColor + "33";
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
        }
    }
    L11_Virus.Background = Background;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Background.js.map