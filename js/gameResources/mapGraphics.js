/*
 * Add all graphics for the levels here
 */

gameResources.addGraphics = function addGraphics(name, source){
	this.mapGraphics.push({
		name: name,
		type: "image",
		src: source
	});
}
gameResources.addGraphics("area01_level_tiles","data/area01_tileset/area01_level_tiles.png");
gameResources.addGraphics("blocks2","data/area01_tileset/blocks2.png");
gameResources.addGraphics("metatiles32x32","data/area01_tileset/metatiles32x32.png");
gameResources.addGraphics("ground_tiles","data/tilesets/ground_tiles.png");