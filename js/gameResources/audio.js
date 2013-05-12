/*
 * Add all audio here
 */

gameResources.addAudio = function addAudio(settings){
	this.audio.push({
		name: settings.name,
		type: "audio",
		src: typeof settings.source !== 'undefined' ? settings.source : "data/audio/",
		channel: typeof settings.channel !== 'undefined' ? settings.channel : 1
	});
};

gameResources.addAudio({name:"cling",channel:2});
gameResources.addAudio({name:"stomp"});
gameResources.addAudio({name:"Jump",source:"data/audio/rory/Jumping/"});
gameResources.addAudio({name:"Flap_Loop",source:"data/audio/rory/Flapping/"});
gameResources.addAudio({name:"Footsetps_single",source:"data/audio/rory/Footsteps/"});
gameResources.addAudio({name:"shoot",source:"data/audio/rory/shooting/"});
gameResources.addAudio({name:"blujay_theme", source:"data/audio/rory/"})
gameResources.addAudio({name:"Happy_Theme", source:"data/audio/rory/"})
gameResources.addAudio({name:"DST-InertExponent",source:"data/audio/"});
gameResources.addAudio({name:"LawnMower",source:"data/audio/rory/"});