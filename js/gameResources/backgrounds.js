/*
 * Add all the different backgrounds here
 */
gameResources.addBackground = function addBackground(name, source){
	this.backgrounds.push({
		name: name,
		type: "image",
		src: source
	});
}
gameResources.addBackground("area01_bkg0","data/area01_parallax/area01_bkg0.png");
gameResources.addBackground("area01_bkg1","data/area01_parallax/area01_bkg1.png");