//Define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: Preload');
		// preload assets

		//load images.
		game.load.image('player', '../assets/PlayerStandingKey.png');	//player sprite
      game.load.image('playerSmash', '../assets/PlayerSmashingKey.png');
      game.load.image('playerSwing', '../assets/PlayerSwingingKey.png');
		game.load.image('swordArm', '../assets/SwordWArm(60x51).png');	//sword sprite
      game.load.image('pot', '../assets/Pot1(66 x 100).png');           //pot sprite
    	game.load.image('platform_small', '../assets/SmallPlatform(150x68)(bb150x34).png');
		game.load.image('platform_med', '../assets/Platform(300x68)(bb300x34).png');
		game.load.image('platform_big', '../assets/BigPlatform(600x68)(bb600x34).png');
		game.load.image('wall_small', '../assets/SmallPlatformVertical(68x150)(bb34x150).png');
		game.load.image('wall_med', '../assets/PlatformVertical(68x300)(bb34x300).png');
		game.load.image('wall_big', '../assets/BigPlatformVertical(68x600)(bb34x600).png');
		game.load.image('obsidian', '../assets/Obsidian(128x144).png');
		game.load.image('endGame', '../assets/endGame100w150h.png');
      game.load.image('background', '../assets/CaveBackground.png' ); // background sprite
    	game.load.image('dialogueBox', '../assets/DialogueBox.png');
      game.load.image('titlescreen', '../assets/StartScreenX2.png');
      game.load.image('titletext', '../assets/SpaceToBeginX2.png');

      //load atlas'
		game.load.atlas('monsterAtlas', '../assets/MonsterAtlas.png', '../assets/MonsterAtlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      game.load.atlas('playerAtlas', '../assets/CharacterAtlas.png', '../assets/CharacterAtlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
		game.load.image('swordHilt', '../assets/SwordHilt(114x60).png');	//UI hilt element
		game.load.image('swordBlade', '../assets/SwordBlade2(91x60).png');	//UI blade element
      game.load.audio('slash', ['../assets/sword.mp3']);
      game.load.audio('shatter', ['../assets/SwordShatter01.mp3']);
      game.load.audio('potBreak', ['../assets/PotBreak01.mp3']);

    	//load dialogue text
    	game.load.text('tutorial_dialogue', '../assets/dialogue_tutorial.json');

    	//load tilemaps
    	// game.load.tilemap('level01', '../assets/tiled_level.json', null, Phaser.Tilemap.TILED_JSON);
    	// game.load.spritesheet('tilesheet', '../assets/tilesheet_complete.png', 32, 32);
    	// game.load.tilemap('level01', '../assets/Level01.json', null, Phaser.Tilemap.TILED_JSON);
    	// game.load.spritesheet('tilesheet', '../assets/Level01.png', 2000, 1200);
    	
    	//WORKING
    	// game.load.tilemap('level01', '../assets/RealLevel01.json', null, Phaser.Tilemap.TILED_JSON);
    	// game.load.spritesheet('tilesheet', '../assets/Level01Platform.png', 300, 60);

		//game.load.tilemap('level01', '../assets/New_RealLevel01.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level01', '../assets/RealLevel01_3.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.spritesheet('tilesheet', '../assets/Level01Platform.png', 300, 121);    	
    	game.load.image('gid1Platform', '../assets/gid1Platform.png');
    	game.load.image('gid2Platform', '../assets/gid2Platform.png');
    	game.load.image('gid3Platform', '../assets/gid3Platform.png');
	},
	create: function() {
		console.log('MainMenu: Create');
		//Display the instructions
		game.stage.backgroundColor = "#000000";	//create a black background
		var titlescreen = game.add.image(0,0,'titlescreen');
      titlescreen.scale.x = 0.5;
      titlescreen.scale.y = 0.5;
      var titletext = game.add.image(game.world.width/2,game.world.height/2,'titletext');
      titletext.scale.x = 0.5;
      titletext.scale.y = 0.5;
      titletext.anchor.x = 0.5;
      titletext.anchor.y = 0.5;
	},
	update: function() {
		//main menu logic - switch to play state if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};