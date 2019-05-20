//tutorial level
var loadLevel_0 = function(game, player, platforms, enemies, orePots, exit, ores, specialEntities) {
	//empty out all the old level elements
	platforms.removeAll(true);
	enemies.removeAll(true);
	orePots.removeAll(true);
	exit.removeAll(true);
	ores.removeAll(true);
	specialEntities.removeAll(true);

	//reset the player's position
	player.body.x = 140;
	player.body.y = (game.world.height - 160);

	//create the ground
	var ground = platforms.create(0, game.world.height - 1, 'platform_med');
	ground.scale.setTo(7, 1);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
	ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it

	//make the left wall
	var ledge = platforms.create(-17, 0, 'wall_big');
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
	ledge = platforms.create(-17, 600, 'wall_big');
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
	//make the right wall
	ledge = platforms.create(1950, 0, 'wall_big');
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
	ledge = platforms.create(1950, 600, 'wall_big');
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
	
	//make the platforms for platforming
	ledge = platforms.create(0, 900, 'platform_med');		//platform A1
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(300, 900, 'platform_small');		//platform A2
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(-50, 650, 'platform_med');		//platform B
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(467, 650, 'platform_small');	//platform C
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(0, 400, 'platform_med');	//platform D
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(300, 400, 'platform_small');	//platform E
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(467, 200, 'platform_small');		//platform F
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(650, 200, 'platform_big');	//platform G
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1250, 200, 'platform_med');	//platform H
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1550, 200, 'platform_small');	//platform I
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1700, 450, 'platform_med');	//platform J
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(1400, 650, 'platform_big');	//platform K
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(800, 650, 'platform_big');	//platform L
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(650, 900, 'platform_small');	//platform M
	ledge.body.immovable = true;		//make wall immovable
	ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications

	//make the inner wall
	ledge = platforms.create(600, 1100, 'wall_small');	//wall A
	ledge.body.immovable = true;			//make wall immovable
	ledge.body.setSize(34, 150, 17, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(600, 800, 'wall_med');	//wall B
	ledge.body.immovable = true;			//make wall immovable
	ledge.body.setSize(34, 300, 17, 17);	//adjust bounding box according to specifications
	ledge = platforms.create(600, 200, 'wall_big');	//wall C
	ledge.body.immovable = true;			//make wall immovable
	ledge.body.setSize(34, 600, 17, 17);	//adjust bounding box according to specifications

	//spawn enemy pots
    var enemy = new Enemy(game, 'pot', 50, 550, 0, player, platforms);	//enemy 1
    game.add.existing(enemy);
    enemies.add(enemy);
    enemy = new Enemy(game, 'pot', 250, 300, 0, player, platforms);	//enemy 2
    game.add.existing(enemy);
    enemies.add(enemy);
    enemy = new Enemy(game, 'pot', 150, 300, 0, player, platforms);	//enemy 3
    game.add.existing(enemy);
    enemies.add(enemy);
    enemy = new Enemy(game, 'pot', 50, 300, 0, player, platforms);	//enemy 4
    game.add.existing(enemy);
    enemies.add(enemy);
	enemy = new Enemy(game, 'pot', 700, 100, 0, player, platforms);	//enemy 5
    game.add.existing(enemy);
    enemies.add(enemy);
	enemy = new Enemy(game, 'pot', 1150, 550, 0, player, platforms);	//enemy 6
    game.add.existing(enemy);
    enemies.add(enemy);


    //spawn some ore pots
	var pot = new OrePot(game, 'pot', 150, 800, orePots, ores);	//pot A
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1900, 550, orePots, ores);	//pot B
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1800, 550, orePots, ores);	//pot C
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1700, 550, orePots, ores);	//pot D
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1350, 550, orePots, ores);	//pot E
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1250, 550, orePots, ores);	//pot F
	game.add.existing(pot);
	orePots.add(pot);
	pot = new OrePot(game, 'pot', 1150, 550, orePots, ores);	//pot G
	game.add.existing(pot);
	orePots.add(pot);
	
	//spawn the level exit door thing
	var door = exit.create(1900, 1050, 'endGame');
	door.body.immovable = true;

	//create special entities

	//special trigger to spawn a wall at the end of the sword section, in order to contain any excess enemies
	var enemyContainer = specialEntities.create(1700, 200, 'platform_med');
	enemyContainer.body.immovable = true;			//make enemyContainer immovable
	enemyContainer.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
	enemyContainer.alpha = 0;						//make enemyContainer invisible
	enemyContainer.specialFunction = containEnemies;	//have it's special function be containing enemies
	enemyContainer.platforms = platforms;	//enemyContainer will need access to platforms in order to spawn the wall

	//spawn blacksmiths
	var blacksmith_1 = specialEntities.create(500,1050, 'player');	//blacksmith @ start of level
	blacksmith_1.body.immovable = true;
	blacksmith_1.specialFunction = talk_sword;	//temporary thing until I set up a dialogue system
	var blacksmith_2 = specialEntities.create(1900,317, 'player');	//blacksmith between end of sword course & start of hammer course
	blacksmith_2.body.immovable = true;
	blacksmith_2.specialFunction = talk_hammer;	//temporary thing until I set up a dialogue system
}

var containEnemies = function() {
	console.log('sealing off enemies...');
	//spawn a wall at the end of the sword section
	var wall = this.platforms.create(1500, -83, 'wall_med');
	wall.body.immovable = true;
	wall.body.setSize(34, 300, 17, 17);
	//remove the trigger to prevent wall spam
	this.kill();
}

var talk_sword = function() {
	console.log('talking to the blacksmith about sword...');
}

var talk_hammer = function() {
	console.log('talking to the blacksmith about hammer...');
}