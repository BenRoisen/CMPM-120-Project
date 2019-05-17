//Define Play state and methods
var loadLevel_2 = function(game, player, platforms, enemies, orePots, exit) {
	//TEST LEVEL - just level 1 but without walls
	
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
	ledge = platforms.create(0, 200, 'platform_big');		//platform A
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(0, 900, 'platform_big');		//platform B
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(550, 600, 'platform_big');	//platform C
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(800, 200, 'platform_small');	//platform D
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(850, 950, 'platform_med');	//platform E
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1150, 600, 'wall_big');		//wall F
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(34, 600, 17, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1150, 350, 'platform_small');	//platform G
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1200, 600, 'platform_big');	//platform H
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1450, 200, 'platform_big');	//platform I
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1850, 800, 'platform_small');	//platform J
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1700, 995, 'platform_med');	//platform K
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications

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