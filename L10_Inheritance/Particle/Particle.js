"use strict";
var L10_Virus;
(function (L10_Virus) {
    class Particle extends L10_Virus.Cell {
        constructor(_position) {
            super(_position);
            let colors = ["#ffcc01", "#ffac16", "#ff9026", "#ffd644"];
            let numColors = colors.length;
            let color;
            let colorIndex;
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            this.color = color;
            this.rotation = Math.random() * 360;
            this.radius = 1 + (Math.random() * 2);
            this.velocity.random(0, 100);
        }
        draw() {
            L10_Virus.crc2.save();
            // Set Parameters for Angles, Shadows and Rotation 
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            L10_Virus.crc2.beginPath();
            L10_Virus.crc2.ellipse(this.position.x, this.position.y, this.radius, this.radius * Math.random() + this.radius, this.rotation, startAngle, endAngle);
            L10_Virus.crc2.closePath();
            L10_Virus.crc2.strokeStyle = this.color + "88";
            L10_Virus.crc2.fillStyle = this.color + "33";
            L10_Virus.crc2.stroke();
            L10_Virus.crc2.fill();
            L10_Virus.crc2.fill();
        }
        move(_timeslice) {
            super.move(_timeslice);
            // Überprüfen, ob der Partikel noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            if (this.position.x < 0)
                this.position.x += L10_Virus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Virus.crc2.canvas.height;
            if (this.position.x > L10_Virus.crc2.canvas.width)
                this.position.x -= L10_Virus.crc2.canvas.width;
            if (this.position.y > L10_Virus.crc2.canvas.height)
                this.position.y -= L10_Virus.crc2.canvas.height;
        }
    }
    L10_Virus.Particle = Particle;
})(L10_Virus || (L10_Virus = {}));
//# sourceMappingURL=Particle.js.map