//Define Play state and methods
var loadLevel_3 = function(game, player, platforms, enemies, orePots, exit, ores) {
	//TEST LEVEL - just level 1 but without any platforms
	
	//empty out all the old level elements
	platforms.removeAll(true);
	enemies.removeAll(true);
	orePots.removeAll(true);
	exit.removeAll(true);
	ores.removeAll(true);

	//reset the player's position
	player.body.x = 140;
	player.body.y = (game.world.height - 160);

	//create the ground
	var ground = platforms.create(0, game.world.height - 1, 'platform_med');
	ground.scale.setTo(7, 1);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
	ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it

	//make the platforms for platforming
	
	//spawn enemy pots
    var enemy = new Enemy(game, 'pot', 150, 800, 0, player, platforms);
    game.add.existing(enemy);
    enemies.add(enemy);
    enemy = new Enemy(game, 'pot', 1250, 1100, 0, player, platforms);
    game.add.existing(enemy);
    enemies.add(enemy);
    enemy = new Enemy(game, 'pot', 1400, 100, 0, player, platforms);
    game.add.existing(enemy);
    enemies.add(enemy);

    //spawn some ore pots
	var pot = new OrePot(game, 'pot', 100, 50, orePots, ores);
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 650, 450, orePots, ores);
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 750, 1050, orePots, ores);
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1800, 50, orePots, ores);
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1850, 850, orePots, ores);
	game.add.existing(pot);
	orePots.add(pot);
	
	//spawn the level exit door thing
	var door = exit.create(1900, 1050, 'endGame');
	door.body.immovable = true;
}