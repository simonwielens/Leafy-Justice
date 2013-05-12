/*
 * Add all the different backgrounds here
 */
gameResources.addHUD = function addHUD(name, source){
	this.hud.push({
		name: name,
		type: "image",
		src: source
	});
}

gameResources.addHUD("32x32_font","data/sprite/32x32_font.png");