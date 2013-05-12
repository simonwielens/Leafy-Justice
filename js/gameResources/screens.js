/*
 * Add title screen graphics here
 */
gameResources.addScreenGraphics = function addScreenGraphics(name, source){
	this.screens.push({
		name: name,
		type: "image",
		src: source
	});
}
gameResources.addScreenGraphics("titleScreen","data/GUI/titleScreen.png");
gameResources.addScreenGraphics("storyScreen","data/GUI/scroll.png");