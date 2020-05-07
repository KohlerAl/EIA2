 namespace L03_Haushaltshilfe {
    window.addEventListener("load", handleLoad); 
    let form: HTMLDivElement = <HTMLDivElement>document.getElementById("form"); 
    let confirm: HTMLButtonElement = <HTMLButtonElement>document.getElementById("confirm");
    let cash:  HTMLInputElement = <HTMLInputElement>document.getElementById("cash");
    let shopping: HTMLInputElement = <HTMLInputElement>document.getElementById("shopping");
    let house: HTMLInputElement = <HTMLInputElement>document.getElementById("house");

    let grocery: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("grocery"); 
    let money: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("money");
    let household: HTMLFieldSetElement = <HTMLFieldSetElement>document.getElementById("household");  

    function handleLoad(): void {
        form.addEventListener("change", handleChange);
        confirm.addEventListener("click", showInput)
    }

    function showInput(): void {

        if (cash.checked == true) {
            console.log("cash"); 
            grocery.disabled = true; 
            money.disabled = false;
            household.disabled = true; 
        }
        else if (shopping.checked == true) {
            console.log("shopping"); 
            grocery.disabled = false; 
            money.disabled = true;
            household.disabled = true; 
        }
        else if (house.checked == true) {
            console.log("house"); 
            grocery.disabled = true; 
            money.disabled = true;
            household.disabled = false; 
        }
    }

    function handleChange(_event: Event): void {
    
        let order: HTMLDivElement = <HTMLDivElement>document.querySelector("div#order");
        order.innerHTML = "";

        let formData: FormData = new FormData(document.forms[0]);
        for (let entry of formData) {
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" +  entry[1] + "']");
            console.log(item); 
            console.log(entry); 
            
            let price: number = Number(item.getAttribute("price"));

            order.innerHTML += name + "  € " + price;
        }
    }

}