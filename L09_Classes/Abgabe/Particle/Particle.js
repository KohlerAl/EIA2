"use strict";
var L09_Virus;
(function (L09_Virus) {
    class Particle {
        constructor(_position) {
            this.position = _position;
            let colors = ["#ffcc01", "#ffac16", "#ff9026", "#ffd644"];
            let numColors = colors.length;
            let color;
            let colorIndex;
            colorIndex = Math.round(Math.random() * (numColors - 1));
            color = colors[colorIndex];
            this.color = color;
            this.rotation = Math.random() * 360;
            this.radius = 1 + (Math.random() * 2);
            this.velocity = new L09_Virus.Vector(0, 0);
            this.velocity.random(10, 100);
        }
        draw(_position) {
            L09_Virus.crc2.save();
            // Set Parameters for Angles, Shadows and Rotation 
            let startAngle = (Math.PI / 180);
            let endAngle = (Math.PI / 180) * 360;
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.ellipse(_position.x, _position.y, this.radius, this.radius * Math.random() + this.radius, this.rotation, startAngle, endAngle);
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.strokeStyle = this.color + "88";
            L09_Virus.crc2.fillStyle = this.color + "33";
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.fill();
            L09_Virus.crc2.fill();
        }
        move(_timeslice) {
            // Offset = Geschwindigkeit
            let offset = new L09_Virus.Vector(this.velocity.x, this.velocity.y);
            // Mit der Zeit multiplizieren
            offset.x *= 0;
            offset.y *= _timeslice * 1.5;
            // Zu der Posiition addieren 
            this.position.add(offset);
            // Überprüfen, ob der Partikel noch auf dem Canvas liegt und gegebenenfalls die Position verändern
            if (this.position.x < 0)
                this.position.x += L09_Virus.crc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09_Virus.crc2.canvas.height;
            if (this.position.x > L09_Virus.crc2.canvas.width)
                this.position.x -= L09_Virus.crc2.canvas.width;
            if (this.position.y > L09_Virus.crc2.canvas.height)
                this.position.y -= L09_Virus.crc2.canvas.height;
        }
    }
    L09_Virus.Particle = Particle;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Particle.js.map