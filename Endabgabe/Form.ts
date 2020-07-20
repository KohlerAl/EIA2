namespace EIA2_Endabgabe {
    export enum FORM_MOVE {
        ROTATE = "rotate",
        MOVE = "move",
    }
    export abstract class Form {
        public color: string;
        public size: Vector;
        public position: Vector;
        public rotation: number;
        public moveType: FORM_MOVE;
        public active: boolean;
        public velocity: Vector = new Vector(5, 5);
        public type: string;
        public neon: boolean;
        public threeD: boolean;

        public constructor(_info?: string[]) {
            console.log(_info);
            if (_info) {
                if (_info[0] == "true") {
                    this.active = true;
                    console.log("This is true");
                }
                else
                    this.active = false;
                this.size = new Vector(parseInt(_info[1]), parseInt(_info[2]));
                this.position = new Vector(parseInt(_info[3]), parseInt(_info[4]));
                console.log(this.position);
                this.rotation = parseInt(_info[5]);
                if (_info[6] == "move")
                    this.moveType = FORM_MOVE.MOVE;
                else
                    this.moveType = FORM_MOVE.ROTATE;
                this.color = _info[7];
                this.velocity = new Vector(parseInt(_info[8]), parseInt(_info[9]));
                if (_info[10] == "true") {
                    this.neon == true;
                }
                else
                    this.neon == false;
                if (_info[11] == "true") {
                    this.threeD == true;
                }
                else
                    this.threeD == false;
            }
            else {
                this.color = "#ffffff";
                this.size = new Vector(40, 40);
                this.position = new Vector(50, 50);
                this.rotation = 0;
                this.active = true;
                this.moveType = FORM_MOVE.MOVE;
                this.neon = false;
                this.threeD = false; 
            }
        }

        abstract draw(): void;

        public move(_rotateValue: number): void {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
                    offset.scale(1 / 50);
                    this.position.add(offset);
                    break;
                case FORM_MOVE.ROTATE:
                    this.rotation += _rotateValue;
                    break;
                default:
                    break;
            }

        }

        public changeColor(_newColor: string): void {
            this.color = _newColor;
        }

        public changeRotation(_factor: number): void {
            this.rotation = _factor;
        }

        public resize(_factor: number): void {
            this.size.scale(_factor);
        }

        public changePosition(_x: number, _y: number): void {
            this.position.x = _x;
            this.position.y = _y;
        }
    }
}