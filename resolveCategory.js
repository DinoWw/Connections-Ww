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
