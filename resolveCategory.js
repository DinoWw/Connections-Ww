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
        //translateElement(el, x1, y1, i, row);
    })

    // TODO: ranzmjestit ostale elemente da ima mjesta


    // TODO: implement, see script js, also setitimeoutat ga
    fixTileOrder();

}


function fixTileOrder(){
    
}
