namespace L04_Haushaltshilfe {
    export let data: Data = {
        produce: [
            {name: "Brot", unit: "Laib", price: 2.00},
            {name: "Eier", unit: "10er-Packung", price: 2.50},
            {name: "Milch", unit: "1L-Karton", price: 0.78},
            {name: "Mehl", unit: "1kg-Packung", price: 1.40},
            {name: "Äpfel", unit: "1kg", price: 2.00},
            {name: "Hefe", unit: "Würfel", price: 0.10},
            {name: "Nudeln", unit: "500g-Packung", price: 1.50},
            {name: "Klopapier", unit: "Packung", price: 2.50},
            {name: "Wasser", unit: "1L-Flasche", price: 0.50},
            {name: "Orangensaft", unit: "1L-Flasche", price: 1.00}
        ],
        money: [
            {name: "Geld abheben", unit: "Euro", price: 5.00},
            {name: "Geld einzahlen", unit: "Euro", price: 5.00}
        ], 
        household: [
            {name: "Gassi gehen", unit: "1 Stunde", price: 10},
            {name: "Putzen", unit: "Wohnung", price: 20},
            {name: "Medikamente besorgen", unit: "", price: 15},
            {name: "Post abholen", unit: "", price: 5},
            {name: "Post wegbringen", unit: "", price: 5},
            {name: "Rasen mähen", unit: "Garten", price: 20}
        ],
    }

    export let detail: Detail = {
        market: [
            {name: "Edeka"}, 
            {name: "Aldi"}, 
            {name: "Rewe"}, 
            {name: "Lidl"}
        ],
        zahlungsart: [
            {name: "Paypal"},
            {name: "Überweisung"},
            {name: "Bar"}
        ] 


    }
}