"use strict";
var L02_Load;
(function (L02_Load) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log(_event);
    }
})(L02_Load || (L02_Load = {}));
/*
 * In der Konsole werden die Eigenschaften von Event ausgegeben. Es ist ein load-Event, das target document
 */
(function (L02_Load) {
    document.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        console.log(_event);
    }
})(L02_Load || (L02_Load = {}));
/**
 *  Es wird nichts ausgegeben.
 */
(function (L02_Load) {
    window.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad(_event) {
        console.log(_event);
    }
})(L02_Load || (L02_Load = {}));
/**
 * Es wird wieder was ausgegeben, das target ist document
 */
//# sourceMappingURL=L02_01.js.map