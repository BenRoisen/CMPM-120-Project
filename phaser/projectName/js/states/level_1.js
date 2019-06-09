//Define Play state and methods
var loadLevel_1 = function(game, player, platforms, enemies, orePots, exit, ores, specialEntities, decorations, bigOres, background) {
	//empty out all the old level elements
	platforms.removeAll(true);
	enemies.removeAll(true);
	orePots.removeAll(true);
	exit.removeAll(true);
	ores.removeAll(true);
	specialEntities.removeAll(true);
	decorations.removeAll(true);

	background.loadTexture('background_1');
	game.world.resize(2000,600);

	//create the ground
	var ground = platforms.create(0, game.world.height - 1, 'platform_med');
	ground.scale.setTo(7, 1);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
	ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it

	//extract data from the tilemap
	var map = game.add.tilemap('level01');
	// console.log(this.map);
	var spawners = game.add.group();
	var potSpawners = game.add.group();
	var exits = game.add.group();
	var playerPoints = game.add.group();
	map.createFromObjects('Platforms', 1, 'gid1Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 2, 'gid2Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 3, 'gid3Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 4, 'gid4Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 5, 'gid5Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 6, 'gid6Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 7, 'gid7Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 8, 'gid8Platform', 0, true, true, decorations);
	map.createFromObjects('Platforms', 9, 'gid9Platform', 0, true, true, decorations);
	map.createFromObjects('Collision', 10, 'CollisionBox', 0, true, true, platforms);
	map.createFromObjects('Collision', 14, 'CollisionBox', 0, true, true, exits);
	map.createFromObjects('Collision', 15, 'CollisionBox', 0, true, true, playerPoints);
	map.createFromObjects('Collision', 17, 'CollisionBox', 0, true, true, potSpawners);
	
	//make all platforms immovable
	platforms.forEach(function(element) {
		element.body.immovable = true;
	});

	//spawn enemy pots
    var i;
	for (i = 0; i < spawners.length; i++) {
		var element = spawners.getChildAt(i);
		var enemy = new Enemy(game, 'pot', element.x, element.y, 0, player, platforms);	//enemy 1
     	game.add.existing(enemy);
    	enemies.add(enemy);
 		console.log('SPAWNING ENEMY AT ' + element.x + ', ' + element.y);
	}

    //spawn some ore pots
    var j;
	for (j = 0; j < potSpawners.length; j++) {
		var element = potSpawners.getChildAt(j);
		var pot = new OrePot(game, 'pot', element.x, element.y, orePots, ores);
		game.add.existing(pot);
		orePots.add(pot);
 		console.log('SPAWNING POT AT ' + element.x + ', ' + element.y);
	}
	
	//spawn the level exit door thing
	var k;
	for (k = 0; k < exits.length; k++) {
		var element = exits.getChildAt(k);
		var door = exit.create(element.x, element.y, 'doorAtlas', 'Mineshaft1');
		door.animations.add('open', ['Mineshaft2','Mineshaft3'], 5, false);
		door.openSound = game.add.audio('smash');	//temporary sound until we get the door open noise
		door.body.immovable = true;
      console.log('SPAWNING DOOR AT ' + element.x + ', ' + element.y);
	}

	var l;
	for (l = 0; l < playerPoints.length; l++) {
		var element = playerPoints.getChildAt(l);
		player.body.moves = false;
		player.x = element.x;
		player.y = element.y;
		player.body.moves = true;
		// var door = exit.create(element.x, element.y, 'endGame');
		// door.body.immovable = true;
      console.log('SPAWNING PLAYER AT ' + element.x + ', ' + element.y);
	}

   bigore = new BigOre(game, 'obsidian', game.world.width - 100, game.world.height - 1000, player);
   game.add.existing(bigore);
   bigOres.add(bigore);

	spawners.removeAll(true);
	potSpawners.removeAll(true);
	exits.removeAll(true);
	playerPoints.removeAll(true);
}