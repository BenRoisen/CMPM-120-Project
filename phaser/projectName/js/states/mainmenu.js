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
		game.load.image('ground', '../assets/platform.png');
	},
	create: function() {
		console.log('MainMenu: Create');
		//Display the instructions
		game.stage.backgroundColor = "#000000";	//create a black background
		game.add.text(16, 16, 'Welcome to Sword Game!', {fontSize: '32px', fill: '#fff' });
		game.add.text(16, 64, 'Use arrow keys to move', {fontSize: '16px', fill: '#fff' });
		game.add.text(16, 512, 'Press [SPACE] to start', {fontSize: '32px', fill: '#fff' });
	},
	update: function() {
		//main menu logic - switch to play state if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};