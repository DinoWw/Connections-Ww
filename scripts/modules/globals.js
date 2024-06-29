export { selected, gameData, categoryByElement, fillGameStructures };



const selected = new Set();
let gameData = {};



// alters data
function normalizeFormat(data) {
   data.initial = data.initial.map(row => row.map(title => title.toUpperCase()));
   //data.categories.forEach(c => )
   // TODO: implement format assertions (with assert?)
}




let elementCategory = {};

function fillGameStructures(jsonData){
   gameData = jsonData;
   
   elementCategory = Object.fromEntries(
      gameData.categories
      .map(c => 
         c.elements
         .map(e => [e, c])
      ).reduce((acc, els) => acc.concat(els), [])
   );
}






function categoryByElement(sElement) {
    return elementCategory[sElement];
    //return elementCategory[sElement];
}