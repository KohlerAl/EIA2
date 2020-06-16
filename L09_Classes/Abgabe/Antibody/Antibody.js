"use strict";
var L09_Virus;
(function (L09_Virus) {
    class Antibody {
        draw(_xPos, _yPos) {
            L09_Virus.crc2.save();
            L09_Virus.crc2.translate(_xPos, _yPos);
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.rotate(Math.random() * 360);
            L09_Virus.crc2.moveTo(0, 0);
            L09_Virus.crc2.lineTo(0, 24);
            L09_Virus.crc2.strokeStyle = "#114d89";
            L09_Virus.crc2.lineWidth = 2;
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(0, 36, 12, 0, 1 * Math.PI, true);
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.restore();
        }
    }
    L09_Virus.Antibody = Antibody;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Antibody.js.map