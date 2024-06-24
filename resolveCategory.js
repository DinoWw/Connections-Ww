function resolveCategory(category){


    // this part relies on global set selected

    let correctEls = [];

    tiles.forEach((tEl) => {
        if(selected.any(name => tEl.firstElementChild.firstElementChild.innerHTML == name)){
            correctEl.push(tEl);
        }
    });

    if(correctEls != 4){
        return false;
    }
    // else 

    correctEls.forEach(el => {
        //TODO: continue
        console.log(el.id);
    });

    // TODO: clear correctEls
};



// TODO: jako jako uzasna globalna varijabla, fix
let AXxjs = 0;
// moraju bit parent divovi u ovom elemnts !!!
function collectElements(row, ...elements){
    if(elements.length != 4){
        throw new Error("cudno koristenje collectElements");
    }

    

    elements.forEach((el, i)=> {
        AXxjs ++;
        const [x1, y1] = [ el.x, el.y ]; // TODO: izracunat iz oredera il ljepse stavit u prop
                
        translationAnimation(x1, y1, row, i, `tr_${AXxjs}`)

        el.firstElementChild.classList.add("tr1")
        el.add("invis");
        setTimeout(() => {
            el.classList.remove("invis");
            E.style = `order: ${4 * 0 + 0};`;
        }, animationDuration * 1000);
    })

    // TODO: implement, see script js
    fixTileOrder();

}

