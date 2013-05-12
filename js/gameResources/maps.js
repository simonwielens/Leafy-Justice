/*
 * Add all levels here
 */

gameResources.addMap = function addMap(name, source){
	this.maps.push({
		name: name,
		type: "tmx",
		src: source
	});
};

gameResources.addMap("level1","data/level1_intro.tmx");
gameResources.addMap("level2","data/level2.tmx");
gameResources.addMap("level02","data/level02.tmx");
gameResources.addMap("level3","data/level3.tmx");
gameResources.addMap("level4","data/level4.tmx");