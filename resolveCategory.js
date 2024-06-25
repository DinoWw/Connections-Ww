function resolveCategory(category){


    // this part relies on global set selected

    const tiles = document.getElementById("tiles");

    let correctEls = [];
    for(tEl of tiles.children){
        if(tEl.localName == 'template') continue;
        console.log(tEl.localName)
        if(category.elements.some(name => tEl.firstElementChild.firstElementChild.innerHTML == name)){
            correctEls.push(tEl);
        }
    };
    console.log("correct: ", correctEls)
    if(correctEls.length != 4){
        return false;
    }
    // else 

    // TODO: fix row
    collectElements(0, ...correctEls);


    // TODO: clear correctEls
};


// moraju bit parent divovi u ovom elemnts !!!
function collectElements(row, ...elements){
    if(elements.length != 4){
        throw new Error("cudno koristenje collectElements");
    }

    console.log(elements)
    

    elements.forEach((el, i)=> {
        const [x1, y1] = [ el.x, el.y ]; // TODO: izracunat iz oredera il ljepse stavit u prop
                
        translateElement(el, x1, y1, i, row);

        const tile2 = tileByCoordinates(i, row);
        translateElement(tile2, i, row, x1, y1);
    })

    // TODO: ranzmjestit ostale elemente da ima mjesta


    // TODO: implement, see script js, also setitimeoutat ga
    fixTileOrder();

}


// TODO: Very bad, rework by storing elements in matrix
function tileByCoordinates(x, y){

    const tiles = document.getElementById("tiles");

    for(let tile of tiles.children) {
        if(tile.x == x && tile.y == y){
            return tile;
        }
    }
    
    // else
    return undefined;

}