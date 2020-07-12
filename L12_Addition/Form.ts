namespace EIA2_Endabgabe {
    export enum FORM_MOVE {
        ROTATE = "rotate",
        MOVE = "move",
        LIGHTEN = "lighten", 
        SIZECHANGE = "sizeChange"
    }
    export abstract class Form {
        public color: string; 
        public size: Vector; 
        public position: Vector; 
        public rotation: number; 
        public moveType: FORM_MOVE; 
        public active: boolean = true; 
        public hitAreaX: Vector; 
        public hitAreaY: Vector; 
        public velocity: Vector = new Vector(5, 5); 
        private scaleFactor: boolean = false; 
        public type: string; 
        

        public constructor() {
            this.color = "#ffffff"; 
            this.size = new Vector (40, 40); 
            this.position= new Vector (0, 0); 
            this.rotation = 0; 
            this.moveType = FORM_MOVE.MOVE;  
            this.hitAreaX = new Vector(this.position.x + this.size.x/2, this.position.x - this.size.x/2); 
            this.hitAreaY = new Vector(this.position.y + this.size.y/2, this.position.y - this.size.y/2); 
        }

        abstract draw(): void; 

        public move(): void {
            switch (this.moveType) {
                case FORM_MOVE.MOVE:
                    let offset: Vector = new Vector(this.velocity.x, this.velocity.y); 
                    offset.scale(1/50); 
                    this.position.add(offset); 
                    break;
                case FORM_MOVE.ROTATE: 
                    this.rotation += 0.01; 
                    break; 
                case FORM_MOVE.SIZECHANGE: 
                    let scaleValue: Vector = new Vector(0.05, 0.05); 
                    if (this.size.x < 10) {
                        this.scaleFactor = true; 
                    } else if (this.size.x > 40){
                        this.scaleFactor = false; 
                    }

                    if(this.scaleFactor == true) {
                        this.size.add(scaleValue); 
                    }
                    else {
                        this.size.substract(scaleValue); 
                    }
                    break; 

                    //FARBANIMATION FEHLT
            
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
            console.log(this.size); 
        }

        public changePosition(_x: number, _y: number): void {
            this.position.x = _x; 
            this.position.y = _y; 
        }
    }
}