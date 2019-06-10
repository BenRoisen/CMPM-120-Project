//define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	init: function(points, isVictory) {
		this.score = points;	//carry over score from Play state
		this.won = isVictory;	//whether we won or died
		game.sound.stopAll();	//stop playing the player running sound
		game.sound.removeAll();
	},
	preload: function() {
		console.log('GameOver: Preload');
		game.sound.stopAll();	//stop playing the player running sound again, because it's a persistent bugger
		game.sound.removeAll();
	},
	create: function() {
		console.log('GameOver: Create');
		game.stage.backgroundColor = "#000000";	//create a black background
		
		if(this.won) {
			var winscreen = game.add.image(0,0,'winScreen');
         game.add.text(250, 435, this.score, {font: 'Lucida Casual', fontStyle: 'italic', fontSize: '96px', fill: '#fff' });
		}
		else {
			var lossscreen = game.add.image(0,0,'lossScreen');
		}
		game.sound.pauseAll();//destroy();	//send all the fucking sounds to the abyss to make that damn running sound cease
		game.sound.removeAll();
	},
	update: function() {
		game.sound.mute = true;
		//restart game if player hits the spacebar
		if(game.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.sound.mute = false;
			game.sound.stopAll();
			game.sound.removeAll();
			game.state.start('Play', true, false, true);
		}

      if(game.input.keyboard.isDown(Phaser.Keyboard.M)) {
         game.sound.mute = false;
         game.sound.stopAll();
         game.sound.removeAll();
         game.state.start('MainMenu');
      }
	}
};