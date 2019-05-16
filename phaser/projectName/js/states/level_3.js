//Define Play state and methods
var loadLevel_3 = function(game, player, platforms, enemies, orePots, exit) {
	//TEST LEVEL - just level 1 but without any platforms
	
	//empty out all the old level elements
	platforms.removeAll(true);
	enemies.removeAll(true);
	orePots.removeAll(true);
	exit.removeAll(true);

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
	var pot = orePots.create(100, 50, 'pot');
	pot.body.gravity.y = 150;	//make the ore fall
	pot = orePots.create(650, 450, 'pot');
	pot.body.gravity.y = 150;	//make the ore fall
	pot = orePots.create(750, 1050, 'pot');
	pot.body.gravity.y = 150;	//make the ore fall
	pot = orePots.create(1800, 50, 'pot');
	pot.body.gravity.y = 150;	//make the ore fall
	pot = orePots.create(1850, 850, 'pot');
	pot.body.gravity.y = 150;	//make the ore fall
	
	//spawn the level exit door thing
	var door = exit.create(1900, 1050, 'endGame');
	door.body.immovable = true;
}