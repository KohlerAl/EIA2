namespace L07_Household {
    //Aufgabe07 erstellt am 03.06.2020 von Alida Kohler

    export interface Item {
        name: string; 
        unit: string; 
        price: number; 
    }

    export interface Data {
        [category: string]: Item[]; 
    }

    export interface Element {
        name: string; 
    }

    export interface Detail {
        [product: string]: Element[]; 
    }
}