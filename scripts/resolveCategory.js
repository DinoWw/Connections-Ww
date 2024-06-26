
// TODO: ugly global
let nextRowSolved = 0;
function resolveCategory(category) {


    const tiles = document.getElementById("tiles");

    let correctEls = [];
    for (tEl of tiles.children) {
        if (tEl.localName == 'template') continue;
        console.log(tEl.localName)
        if (category.elements.some(name => tEl.firstElementChild.firstElementChild.innerHTML == name)) {
            correctEls.push(tEl);
        }
    };
    console.log("correct: ", correctEls)
    if (correctEls.length != 4) {
        return false;
    }
    // else 

    // TODO: fix row
    collectElements(nextRowSolved, ...correctEls);

    correctEls[0].addEventListener("animationend", () => {
        correctEls.forEach(el => {
            el.parentNode.removeChild(el);
        })

        const tileHome = document.getElementById("tiles");
        const newTile = createTile(category.title, 0, nextRowSolved, true);
        newTile.firstElementChild.style.backgroundColor = category.color
        nextRowSolved++

        tileHome.appendChild(newTile);

    })
};


// moraju bit parent divovi u ovom elemnts !!!
function collectElements(row, ...elements) {
    if (elements.length != 4) {
        throw new Error("cudno koristenje collectElements");
    }

    console.log(elements)



    // TO DO-not: this is horrible code for edge case where a tile is in a row it is supposed to be in
    const frees = [];
    const doubles = [];
    elements.forEach((el, i) => {
        let [x1, y1] = [el.x, el.y];
        let [x2, y2] = [i, row];

        translateElement(el, x1, y1, x2, y2);

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
        translateElement(t1, ...d, ...frees.pop());
    })



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