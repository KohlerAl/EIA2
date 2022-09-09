namespace lektion03 {
    window.addEventListener("load", handleLoad); 

    function handleLoad(): void {

        // tslint:disable-next-line: quotemark
        let allBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type="checkbox"]'); 
        console.log(allBoxes); 

        for (let box of allBoxes) {
            box.addEventListener("pointerdown", handleCheck); 
        }

        let add: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#add"); 
        add.addEventListener("pointerdown", addProduct)
    }

    function handleCheck(_event: PointerEvent): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target; 
        console.log(target.value); 

        let parent: HTMLDivElement = <HTMLDivElement>target.parentElement; 

        if (parent.classList.contains("checked")) {
            parent.classList.remove("checked"); 
        }

        else {
            parent.classList.add("checked"); 
        }
    }

    function addProduct(): void {
        let formData: FormData = new FormData(document.forms[0]);

        for (let entry of formData) {
            console.log(entry[0] + "  " + entry[1]); 
        }
    }
}