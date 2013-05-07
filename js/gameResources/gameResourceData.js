var player = gameResourceData("gripe_run_right","data/kev/main_character/bird_walking_50px.png");
var enemy = gameResourceData("wheelie_right","data/sprite/wheelie_right.png");
var apple = gameResourceData("apple","data/sprite/apple.png");
var lawnmower = gameResourceData("lawnmower","data/sprite/lawnmower_96px.png");
var coin = gameResourceData("spinning_coin_gold","data/sprite/spinning_coin_gold.png");
var block = gameResourceData("block","data/sprite/block.png");
var birdSeed = gameResourceData("birdSeed","data/kev/bird_seed/seed2.png");
var mushroom = gameResourceData("mushroom","data/sprite/mushroom.png");
var healthIcon = gameResourceData("healthIcon","data/sprite/health.png");
var pelletBullet = gameResourceData("pelletBullet","data/sprite/mushroom.png")
var parrallaxBackground = gameResourceData("area01_bkg0","data/area01_parallax/area01_bkg0.png");
var parrallaxBackground2 = gameResourceData("area01_bkg1","data/area01_parallax/area01_bkg1.png");

var groundMapTiles = gameResourceData("ground_tiles","data/tilesets/ground_tiles.png");

var map1 = gameResourceData("area01_level_tiles","data/area01_tileset/area01_level_tiles.png");
var map2 = gameResourceData("blocks2","data/area01_tileset/blocks2.png");
var map3 = gameResourceData("metatiles32x32","data/area01_tileset/metatiles32x32.png");
var level1 = gameResourceTileData("level1","data/level1_intro.tmx");
var level2 = gameResourceTileData("level2","data/level2.tmx");
var level02 = gameResourceTileData("level02","data/level02.tmx");
var level3 = gameResourceTileData("level3","data/level3.tmx");
var level4 = gameResourceTileData("level4","data/level4.tmx");
var hud = gameResourceData("32x32_font","data/sprite/32x32_font.png");
var audio = gameResourceAudioData({name:"cling",channel:2});
var audio1 = gameResourceAudioData({name:"stomp"});
var audio2 = gameResourceAudioData({name:"Jump",source:"data/audio/rory/Jumping/"});

var flapping = gameResourceAudioData({name:"Flap_Loop",source:"data/audio/rory/Flapping/"});

var audiofoot = gameResourceAudioData({name:"Footsetps_single",source:"data/audio/rory/Footsteps/"});

var audioshoot = gameResourceAudioData({name:"shoot",source:"data/audio/rory/shooting/"});
var themeMusic = gameResourceAudioData({name:"blujay_theme", source:"data/audio/rory/"})
var happyMusic = gameResourceAudioData({name:"Happy_Theme", source:"data/audio/rory/"})
var audio3 = gameResourceAudioData({name:"DST-InertExponent",source:"data/audio/"});

var lawnmowerSound = gameResourceAudioData({name:"LawnMower",source:"data/audio/rory/"});

var titleScreen = gameResourceData("titleScreen","data/GUI/titleScreen.png");
var storyScreen = gameResourceData("storyScreen","data/GUI/scroll.png");


var sign1 = gameResourceData("sign1","data/kev/tiles/sign1.png");
var sign2 = gameResourceData("sign2","data/kev/tiles/sign2.png");
var sign3 = gameResourceData("sign3","data/kev/tiles/sign3.png");
var sign4 = gameResourceData("sign4","data/kev/tiles/sign4.png");
var sign5 = gameResourceData("sign5","data/kev/tiles/sign5.png");
var sign6 = gameResourceData("sign6","data/kev/tiles/sign6.png");
var sign7 = gameResourceData("sign7","data/kev/tiles/sign7.png");

var icecube = gameResourceData("icecube","data/kev/tiles/icecube.gif");

var all = gameResourceData("all","data/kev/berries/all.png");
var bed1 = gameResourceData("bed1","data/kev/tiles/bed1.gif");
var blocks1 = gameResourceData("blocks1","data/kev/tiles/blocks1.png");
var blocks2 = gameResourceData("blocks2","data/kev/tiles/blocks2.png");

var loads_eggs = gameResourceData("loads_eggs","data/kev/main_character/loads_eggs.png");

var wife_left = gameResourceData("wife_left_50px","data/kev/main_character/wife_left_50px.png");

gameResources.addPlayer(player);
gameResources.addBackground(parrallaxBackground);
gameResources.addBackground(parrallaxBackground2);
gameResources.addItem(apple);
gameResources.addEnemy(enemy);
gameResources.addEnemy(lawnmower);
gameResources.addItem(pelletBullet);
gameResources.addItem(coin);
gameResources.addItem(block);
gameResources.addItem(birdSeed);
gameResources.addItem(mushroom);
gameResources.addItem(healthIcon);
gameResources.addMap(map1, level1);
gameResources.addMap(map2, level2);
gameResources.addMap(map3, level3);
gameResources.addMap(map3, level4);
gameResources.addMap(groundMapTiles,level02);

gameResources.addHud(hud);
gameResources.addAudio(audio);
gameResources.addAudio(audio1);
gameResources.addAudio(audio2);
gameResources.addAudio(audio3);
gameResources.addAudio(audioshoot);

gameResources.addAudio(flapping);

gameResources.addAudio(audiofoot);
gameResources.addAudio(lawnmowerSound);
gameResources.addAudio(themeMusic);
gameResources.addAudio(happyMusic);

gameResources.addTitleScreen(titleScreen);
gameResources.addTitleScreen(storyScreen);


gameResources.addItem(sign1);
gameResources.addItem(sign2);
gameResources.addItem(sign3);
gameResources.addItem(sign4);
gameResources.addItem(sign5);
gameResources.addItem(sign6);
gameResources.addItem(sign7);
gameResources.addItem(icecube);

gameResources.addItem(all);
gameResources.addItem(bed1);
gameResources.addItem(blocks1);
gameResources.addItem(blocks2);
gameResources.addItem(loads_eggs);

gameResources.addItem(wife_left);
