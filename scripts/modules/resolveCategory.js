
import { createCategoryTile, createTile, fixTileOrder } from "./tiles.js";
import { translateElement } from "./translateElement.js";
import { incrementSolvedCatetegoriesCount, gameData } from "./globals.js";

export { resolveCategory };



// category - object; elems - DOM element array
function resolveCategory(category, elems, animate = true) {
    if (category == undefined) throw new Error("cannot resolve undefined category");
    let correctEls = elems;

    if (correctEls.length != 4) {
        throw new Error("cannot resolve, wrong number of elements");
    }

    // else if all are already ordered, do just merge them

    // TODO: code duplication, el should be event.target 
    //      or smthing and code should be refactored into a function
    if (correctEls.every((el, i) => el.x == i && el.y == gameData.solvedCategoriesCount) || !animate) {

        const tileHome = document.getElementById("tiles");
        if (!animate) {
            collectElements(gameData.solvedCategoriesCount, correctEls, false);
        }
        correctEls.forEach(el => {
            el.parentNode.removeChild(el);
        });
        const newTile = createCategoryTile(category, gameData.solvedCategoriesCount);
        tileHome.appendChild(newTile);

        incrementSolvedCatetegoriesCount();

        return;
    }
    // else

    collectElements(gameData.solvedCategoriesCount, correctEls);

    correctEls[0].addEventListener("animationend", () => {

        correctEls.forEach(el => {
            el.parentNode.removeChild(el);
        });

        const tileHome = document.getElementById("tiles");
        const newTile = createCategoryTile(category, gameData.solvedCategoriesCount);
        tileHome.appendChild(newTile);

        incrementSolvedCatetegoriesCount();

        return;

    })
};



// elements contains DOM elements of the outermost div a tile has
function collectElements(row, elements, animate = true) {
    if (elements.length != 4) {
        throw new Error("cudno koristenje collectElements");
    }


    // handle if tile is in row it should be in
    const frees = [];
    const doubles = [];
    elements.forEach((el, i) => {
        let [x1, y1] = [el.x, el.y];
        let [x2, y2] = [i, row];

        if (animate) {
            translateElement(el, x1, y1, x2, y2);
        }
        else {
            // next x and next y
            el.nx = x2;
            el.ny = y2;
        }

        frees.push([x1, y1]);
        doubles.push([x2, y2]);
    });

    for (let i = doubles.length - 1; i >= 0; i--) {
        const d = doubles[i];
        const j = frees.findIndex(a => a[0] == d[0] && a[1] == d[1]);
        if (j != -1) {
            frees.splice(j, 1);
            doubles.splice(i, 1);
        }
    }

    doubles.forEach(d => {
        const t1 = tileByCoordinates(...d);
        const [x2, y2] = frees.pop();
        if (animate) {
            translateElement(t1, ...d, x2, y2);
        }
        else {
            // next x and next y
            t1.nx = x2;
            t1.ny = y2;
        }
    });

    if (!animate) {
        const updatePos = (el) => {
            el.x = el.nx;
            el.y = el.ny;
        }
        doubles.forEach((pos) => {
            let t = tileByCoordinates(...pos)
            updatePos(tileByCoordinates(...pos))
        });
        elements.forEach(updatePos);
        fixTileOrder();
    }


}


// TODO: Very bad, rework by storing elements in matrix
function tileByCoordinates(x, y) {

    const tiles = document.getElementById("tiles");

    for (let tile of tiles.children) {
        if (tile.x == x && tile.y == y) {
            return tile;
        }
    }

    // else
    console.error("ERROR: could not find tile on ", x, y)
    return undefined;

}