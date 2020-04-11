
namespace L02_Load {
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log(_event);
    }
}

/*
 * In der Konsole werden die Eigenschaften von Event ausgegeben. Es ist ein load-Event, das target document
 */

namespace L02_Load {
    document.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        console.log(_event);
    }
}
/**
 *  Es wird nichts ausgegeben.
 */

namespace L02_Load {
    window.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(_event: Event): void {
        console.log(_event);
    }
}

/**
 * Es wird wieder was ausgegeben, das target ist document
 */

