let v: number = 1;
v = v + 1;
console.log(v);

/** Einfache Datentypen
 *  1. v ist number -> Ergebnis in der Konsole: 1
 *  2. v ist string -> Ergebnis in der Konsole: 11
 *  3. Fehlermeldung, da boolean und number nicht addiert werden können
 *  4. Wenn man versucht, zu v eine Zeichenkette zu addieren, kommt eine Fehlermeldung, 
 *  dass die beiden Typen nicht kombinierbar sind
 *  5. Es hat vorhin funktioniert, weil aus v dann einfach auch ein string gemacht wurde
 */

let a: (string | number | boolean)[] = [7, true, "Hallo"];

/** Komplexe Datentypen
 *  Bei a[index] zwischen 0 und 2 werden die jeweiligen Werte ausgegeben 
 *  Bei allen anderen Zahlen wird undefined ausgegeben
 */

//a [4] = [101, 102]

/**
 * a[3] ist weiterhin undefined
 * bei a[4] wird [101, 102] ausgegeben -> An der Stelle 4 ist im Array ein Array
 */

let s: {
    zahl: number;
    wahr: boolean;
    text: string;
} = { "zahl": 7, "wahr": true, text: "Hallo" };

/**
 * Egal ob s["key"] oder s.key eingegeben wird, es wird ein Wert ausgegeben
 * Bei einem unbekannten Key wird undefined ausgegeben
 */

let v1: number = 1;
let v2: number = v1;

v1 = v1 + 5;
console.log("V1 ist " + v1);
console.log("V2 ist " + v2);

/**
 * Der Wert von v2 ist nach der Veränderung nicht mehr derselbe Wert wie v1 
 *  v1 ist dann 6, v2 ist weiterhin 1
 */

let x1: number[] = [1, 2, 3];
let x2: number[] = x1;

x1[1] = 7;
console.log("x1 ist " + x1);
console.log("x2 ist " + x2);

/**
 * Trotz der Änderung sind x1 und x2 gleich
 */