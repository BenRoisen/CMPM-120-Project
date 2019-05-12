//Define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	preload: function() {
		console.log('MainMenu: Preload');
		// preload assets

		//load images.
		game.load.image('player', '../assets/PlayerAsset100w150h.png');	//player sprite
		game.load.image('sword', '../assets/SwordArmAsset75w100h.png');	//sword sprite
      game.load.image('pot', '../assets/Pot1(66 x 100).png');           //pot sprite
    	game.load.image('platform_small', '../assets/SmallPlatform(150x68)(bb150x34).png');
		game.load.image('platform_med', '../assets/Platform(300x68)(bb300x34).png');
		game.load.image('platform_big', '../assets/BigPlatform(600x68)(bb600x34).png');
		game.load.image('wall_small', '../assets/SmallPlatformVertical(68x150)(bb34x150).png');
		game.load.image('wall_med', '../assets/PlatformVertical(68x300)(bb34x300).png');
		game.load.image('wall_big', '../assets/BigPlatformVertical(68x600)(bb34x600).png');
		game.load.image('obsidian', '../assets/Obsidian(128x144).png');
		game.load.image('endGame', '../assets/endGame100w150h.png');
		
		
		game.load.image('swordHilt', '../assets/SwordHilt(114x60).png');	//UI hilt element
		game.load.image('swordBlade', '../assets/SwordBlade(91x60).png');	//UI blade element
      game.load.audio('slash', ['../assets/sword.mp3']);
	},
	create: function() {
		console.log('MainMenu: Create');
		//Display the instructions
		game.stage.backgroundColor = "#000000";	//create a black background
		game.add.text(16, 16, 'Welcome to Sword Game!', {fontSize: '32px', fill: '#fff' });
		game.add.text(16, 64, 'Use arrow keys to move', {fontSize: '16px', fill: '#fff' });
		game.add.text(16, 96, 'Use spacebar to attack', {fontSize: '16px', fill: '#fff' });
		game.add.text(16, 112, 'Make sure you have enough room to swing your sword without hitting a wall!', {fontSize: '16px', fill: '#fff' });
		game.add.text(16, 144, 'Collect ores from pots to win, but be careful!', {fontSize: '16px', fill: '#fff' });
		game.add.text(16, 160, 'Some pots are actually monsters in disguise!', {fontSize: '16px', fill: '#fff' });
		
		game.add.text(16, 512, 'Press [SPACE] to start', {fontSize: '32px', fill: '#fff' });
	},
	update: function() {
		//main menu logic - switch to play state if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};