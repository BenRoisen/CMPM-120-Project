var game;

//don't make the game until the browser finishes loading, otherwise it might not find all the .js files and will promptly die
window.onload = function() {
	game = new Phaser.Game(1000, 600, Phaser.AUTO);

	//add the states to the game
	game.state.add('MainMenu', MainMenu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);

	//make the game start at the MainMenu state
	game.state.start('MainMenu');
}