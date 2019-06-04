//define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	init: function(points, isVictory) {
		this.score = points;	//carry over score from Play state
		this.won = isVictory;	//whether we won or died
		game.sound.stopAll();	//stop playing the player running sound
	},
	preload: function() {
		console.log('GameOver: Preload');
		game.sound.stopAll();	//stop playing the player running sound again, because it's a persistent bugger
	},
	create: function() {
		console.log('GameOver: Create');
		game.stage.backgroundColor = "#000000";	//create a black background
		
		if(this.won) {
			game.add.text(16, 16, 'YOU WIN!', {fontSize: '32px', fill: '#0f0' });					//green text because you won & that's good
			game.add.text(16, 48, 'Final Score: ' + this.score, {fontSize: '32px', fill: '#0f0' });
			game.add.text(16, 80, 'Press [SPACE] to retry', {fontSize: '32px', fill: '#0f0' });
		}
		else {
			game.add.text(16, 16, 'GAME OVER!', {fontSize: '32px', fill: '#f00' });					//red text because you're dead
			game.add.text(16, 48, 'Final Score: ' + this.score, {fontSize: '32px', fill: '#f00' });
			game.add.text(16, 80, 'Press [SPACE] to retry', {fontSize: '32px', fill: '#f00' });
		}
		game.sound.destroy();	//send all the fucking sounds to the abyss to make that damn running sound cease
	},
	update: function() {
		//restart game if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};