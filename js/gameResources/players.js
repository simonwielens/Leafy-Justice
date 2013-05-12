/*
 * Add all player graphics here
 */
gameResources.addPlayerGraphics = function addPlayerGraphics(name, source){
	this.players.push({
		name: name,
		type: "image",
		src: source
	});
}
gameResources.addPlayerGraphics("gripe_run_right","data/kev/main_character/bird_walking_50px.png");