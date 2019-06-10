//Define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: Preload');
		//display a loading message
		var loadText = game.add.text(game.width - 160, game.height - 32, 'Loading...', {fontSize: '32px', fill: '#fff' });
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
      game.load.image('titleScreen', '../assets/StartScreenX2.png');
      game.load.image('titleText', '../assets/SpaceToBeginX2.png');
      game.load.image('winScreen', '../assets/WinScreen.png');
      game.load.image('white', '../assets/white.png');
      game.load.image('keyE', '../assets/computer_key_E.png');
      game.load.image('keyL', '../assets/computer_key_Arrow_Left.png');
      game.load.image('keyR', '../assets/computer_key_Arrow_Right.png');

      //load atlas'
		game.load.atlas('monsterAtlas', '../assets/MonsterAtlas.png', '../assets/MonsterAtlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      game.load.atlas('playerAtlas', '../assets/CharacterAtlas.png', '../assets/CharacterAtlas.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      game.load.atlas('doorAtlas', '../assets/Door.png', '../assets/Door.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      game.load.atlas('bigOreAtlas', '../assets/BigOre.png', '../assets/BigOre.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
		
		game.load.image('swordHilt', '../assets/SwordHilt(114x60).png');	//UI hilt element
		game.load.image('swordBlade', '../assets/SwordBlade2(91x60).png');	//UI blade element

      game.load.audio('slash', ['../assets/sword.mp3']);
      game.load.audio('shatter', ['../assets/SwordShatter01.mp3']);
      game.load.audio('potBreak', ['../assets/PotBreak01.mp3']);
      game.load.audio('jump', ['../assets/Jump.mp3']);
      game.load.audio('run', ['../assets/Run.mp3']);
      game.load.audio('swing', ['../assets/Swing.mp3']);
      game.load.audio('smash', ['../assets/Smash.mp3']);
      game.load.audio('oof', ['../assets/PlayerOof.mp3']);
      game.load.audio('pickup', ['../assets/ObsidianPickup.mp3']);
      game.load.audio('roll', ['../assets/MonsterRoll.mp3']);
      game.load.audio('monsterDeath', ['../assets/MonsterDeath.mp3']);
      game.load.audio('repairHit', ['../assets/RepairHit.mp3']);
      game.load.audio('repairFin', ['../assets/RepairFin.mp3']);
      game.load.audio('doorOpen', ['../assets/DoorOpen.mp3']);
      game.load.audio('music', ['../assets/LABOTHsoundtrack.mp3']);

    	//load dialogue assets
    	game.load.text('tutorial_dialogue', '../assets/dialogue_tutorial.json');
    	game.load.audio('oldMan_1', ['../assets/Tutorial/OldManLine01.mp3']);
    	game.load.audio('oldMan_2', ['../assets/Tutorial/OldManLine02.mp3']);
    	game.load.audio('oldMan_3', ['../assets/Tutorial/OldManLine03.mp3']);
    	game.load.audio('oldMan_4', ['../assets/Tutorial/OldManLine04.mp3']);
    	game.load.atlas('smithyAtlas', '../assets/Tutorial/SmithyAtlas.png', '../assets/Tutorial/SmithyTutorial.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);

    	//load tilemaps
    	game.load.tilemap('level01', '../assets/Tilemaps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('level02', '../assets/Tilemaps/Level2.json', null, Phaser.Tilemap.TILED_JSON);
    	game.load.tilemap('level03', '../assets/Tilemaps/Level3.json', null, Phaser.Tilemap.TILED_JSON);
    	//load tilemap assets
    	game.load.image('gid1Platform', '../assets/Tilemaps/gid1Platform.png');
    	game.load.image('gid2Platform', '../assets/Tilemaps/gid2Platform.png');
    	game.load.image('gid3Platform', '../assets/Tilemaps/gid3Platform.png');
    	game.load.image('gid4Platform', '../assets/Tilemaps/gid4Platform.png');
    	game.load.image('gid5Platform', '../assets/Tilemaps/gid5Platform.png');
    	game.load.image('gid6Platform', '../assets/Tilemaps/gid6Platform.png');
    	game.load.image('gid7Platform', '../assets/Tilemaps/gid7Platform.png');
    	game.load.image('gid8Platform', '../assets/Tilemaps/gid8Platform.png');
    	game.load.image('gid9Platform', '../assets/Tilemaps/gid9Platform.png');
    	game.load.image('CollisionBox', '../assets/Tilemaps/CollisionBox.png');
    	game.load.image('background_0', '../assets/Tilemaps/TutorialBackground.png');
    	game.load.image('background_1', '../assets/Level1Background.png');
    	game.load.image('background_2', '../assets/Tilemaps/Level2BG.png');
    	game.load.image('background_3', '../assets/Tilemaps/Level3BG.png');
      game.load.image('bigOreBG'    , '../assets/BigOreBG.png');
      game.load.image('bigOreFG'    , '../assets/BigOreFG.png');
	},
	create: function() {
		console.log('MainMenu: Create');
		//Display the instructions
		game.stage.backgroundColor = "#000000";	//create a black background
		var titlescreen = game.add.image(0,0,'titleScreen');
      titlescreen.scale.x = 0.5;
      titlescreen.scale.y = 0.5;
      var titletext = game.add.image(game.width/2,game.height/2,'titleText');
      titletext.scale.x = 0.5;
      titletext.scale.y = 0.5;
      titletext.anchor.x = 0.5;
      titletext.anchor.y = 0.5;
	},
	update: function() {
		//main menu logic - switch to play state if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play', true, false, false);
		}
	}
};