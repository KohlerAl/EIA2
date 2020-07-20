namespace EIA2_Endabgabe {
    let url: string = "https://agkeia.herokuapp.com/";
    let options: string[];

    export interface PicturePart {
        active: boolean,
        size: Vector,
        positionX: number,
        positionY: number,
        rotation: number,
        moveType: FORM_MOVE,
        color: string,
        velocity: Vector,
        neon: boolean;
        threeD: boolean;
        type: string
    }


    export function savePicture(_name: string): void {
        if (options) {
            checkNames(_name)
        }
        if (true) {
            insertPicture(_name);
        }
    }

    function checkNames(_name: string): boolean {
        for (let i: number = 0; i < options.length; i++) {
            if (options[i] == _name) {
                alert("This name is already taken! Please choose another one!");
                return false;
            }
        }
        return true;

    }

    function insertPicture(_name: string): void {
        let information: PicturePart[] = [];
        information.push()
        for (let figure of figures) {
            let form: PicturePart = {
                "active": figure.active,
                "size": figure.size,
                "positionX": Math.floor(figure.position.x),
                "positionY": Math.floor(figure.position.y),
                "rotation": figure.rotation,
                "moveType": figure.moveType,
                "color": figure.color,
                "velocity": figure.velocity,
                "neon": figure.neon,
                "threeD": figure.threeD,
                "type": figure.type,

            }
            information.push(form);
        }
        sendData(information, _name);
    }

    export async function findPictures(): Promise<void> {
        let response: Response = await fetch(url + "?" + "getPicture=yes");
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|{|}|"|_id|insertName|]/g, "");
        let prettier: string = pretty.replace(/,,,/g, ",");
        createDatalist(prettier);
    }

    async function sendData(_information: PicturePart[], _name: string): Promise<void> {
        let name: string = _name.replace(" ", "_")
        let canvasInfo: string[] = [];
        let width: string = (Math.floor(canvas.width)).toString();
        let height: string = (Math.floor(canvas.height)).toString();
        canvasInfo.push(width, height, background);
        let canvasLook: string = JSON.stringify(canvasInfo);
        let canvasQuery: URLSearchParams = new URLSearchParams(canvasLook)

        let info: string = JSON.stringify(_information);
        let query: URLSearchParams = new URLSearchParams(info);
        let response: Response = await fetch(url + "?savePicture&" + name + "&" + canvasQuery.toString() + "&" + query.toString());
        await fetch(url + "?insertName&" + name);

        let responseText: string = await response.text();
        if (responseText != "") {
            alert("Your picture " + _name + " has been saved!")
        }
        else {
            alert("There was a mistake while saving your Picture"); 
        }
        findPictures();
    }

    function createDatalist(_response: string) {
        let masterpiece: HTMLDataListElement = <HTMLDataListElement>document.getElementById("masterpiece");
        options = _response.split(",");
        while (masterpiece.firstChild) {
            masterpiece.removeChild(masterpiece.firstChild);
        }

        for (let entry of options) {
            if (entry == "") {
                //Skip this
            }
            else {
                let option: HTMLOptionElement = document.createElement("option");
                option.setAttribute("name", entry);
                option.value = entry;
                masterpiece.appendChild(option);
            }
        }
    }

    export async function loadPicture(): Promise<void> {
        figures = [];
        let name: string = creations.value;
        let response: Response = await fetch(url + "?" + "findPicture&" + name);
        let responseText: string = await response.text();
        let pretty: string = responseText.replace(/\\|\[|{|}|"|_id|savePicture|]/g, "");
        let removeName: string = pretty.replace(name, "");
        let prettier: string = removeName.replace(/,,,/g, ",");
        let removeKey: string = prettier.replace(/type:|active:|size:|neon:|positionX:|positionY:|rotation:|x:|y:|moveType:|color:|velocity:/g, "")
        let data: string[] = removeKey.split(",");
        canvas.width = parseInt(data[1]);
        canvas.height = parseInt(data[2]);
        createBackground(data[3]);
        data.splice(0, 4);
        console.log(data);
        let info: string[] = [];
        for (let i: number = 0; i < data.length; i++) {
            switch (data[i]) {
                case ("Triangle"):
                    let triangle: Triangle = new Triangle(info);
                    triangle.draw();
                    info = [];
                    figures.push(triangle);
                    break;
                case ("Ellipse"):
                    let ellipse: Ellipse = new Ellipse(info);
                    ellipse.draw();
                    info = [];
                    figures.push(ellipse);
                    break;
                case ("Circle"):
                    let circle: Circle = new Circle(info);
                    circle.draw();
                    info = [];
                    figures.push(circle);
                    break;
                case ("Square"):
                    let square: Square = new Square(info);
                    square.draw();
                    info = [];
                    figures.push(square);
                    break;
                case ("Line"):
                    let figure: Line = new Line(info);
                    figure.draw();
                    info = [];
                    figures.push(figure);
                    break;
                default:
                    info.push(data[i]);
                    break;
            }
        }
    }
}