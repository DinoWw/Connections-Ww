export { selected, gameData, categoryByElement};



const selected = new Set();
let gameData = {};


const onGameDataLoaded = new Event("gamedataloaded");
await fetch('data/game2.json').then(async response => {

   // update so reference passed to buttonFunctions doesn't break
   // TODO: gamedata = data? mayb
   await response.json().then((data) => {
      normalizeFormat(data);
		gameData = data;
   });

}).then(() => {
	setTimeout(() => {
		window.dispatchEvent(onGameDataLoaded);
	}, 50);
});

// alters data
function normalizeFormat(data) {
   data.initial = data.initial.map(row => row.map(title => title.toUpperCase()));
   //data.categories.forEach(c => )
   // TODO: implement format assertions (with assert?)
}




const elementCategory = Object.fromEntries(
	gameData.categories
	.map(c => 
		c.elements
		.map(e => [e, c])
	).reduce((acc, els) => acc.concat(els), [])
);






function categoryByElement(sElement) {
    return elementCategory[sElement];
    //return elementCategory[sElement];
}