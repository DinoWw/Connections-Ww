// shuffle button
function shuffle() {
   const tiles = document.querySelectorAll(".tile:not(.solved)");

   const available = [...Array(tiles.length).keys()];
   // shuffle code. It IS correct, https://blog.codinghorror.com/the-danger-of-naivete/
   for (let i = available.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [available[i], available[j]] = [available[j], available[i]];
   }


   [...tiles].forEach((tile) => {
      let order = available.pop();
      tile.style.order = order;
      tile.x = order % 4;
      tile.y = Math.floor(order / 4);
   });


}

// deselect button
function deselectAllHandler(){
   if (document.querySelector("#deselect").classList.contains("unclickable")) return;
   deselectAll(true);
}

function deselectAll(visuallyDeselect) {
   if(visuallyDeselect){
      const tiles = document.querySelectorAll(".tile")
      for (let tile of tiles) {
         if (selected.has(tile.firstElementChild.firstElementChild.textContent)) {
            tile.firstElementChild.classList.toggle("selected")
            //console.log('!:', tile.firstElementChild.firstElementChild.textContent)
         }
      }
   }
   remAllFromSelected();
}

// submit button 
function submit() {
   if (!document.querySelector("#submit").classList.contains("unclickable")) {
      let selectedArr = Array.from(selected)

      //TODO: rework, would be nice if selectedArr contined DOM objects
      for (let category of json.categories) {
         if (category.elements.every(e => selectedArr.includes(e))) {

            console.log("success")
            // visually
            resolveCategory(category);
            deselectAll(false);
            break;
         }
      }
      if (selected.size != 0) {
         // Dino_ww: mislim da se ovaj kod slucajno runa zbog mene
         console.log("fail")
         addMistake()
         deselectAll(true); //? 
         // locsk elements, animation
      }
   }
}