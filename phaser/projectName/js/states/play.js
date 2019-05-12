//Define Play state and methods
var Play = function(game) {};
Play.prototype = {
	init: function() {
		console.log('Play: preload');
		//create all the variables we need
		this.background;
		this.player;
		this.platforms;
		this.swords;	//keeps track of the sword
		this.score = 0;	//keeps track of score (# of ore pieces)
		this.scoreText;
		this.ores;			//group to hold ores
		this.health = 10;	//health of the player
		this.invincible = false;	//toggles temporary player invincibility after taking damage
		this.swordState = 5;
	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		//enable arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
		//this.background = TODO LATER
		game.stage.backgroundColor = "#888888";	//create a blue background

		//set the world size
		game.world.setBounds(0, 0, 2000, 1200)	//for now, world is 2x size of screen

		//create a group to hold collidable platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;	//enable collisions

		//create the player
		this.player = new Player(game, 'player', 0, 1, this.platforms);	//player(game, key, frame, scale)
		game.add.existing(this.player);
		game.camera.follow(this.player);	//make camera follow player

		//create the ground
		var ground = this.platforms.create(0, game.world.height - 1, 'platform_med');
		ground.scale.setTo(7, 1);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
		ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it

		//make the left wall
		var ledge = this.platforms.create(0, 0, 'wall_big');
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
		ledge = this.platforms.create(0, 600, 'wall_big');
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
		//make the right wall
		ledge = this.platforms.create(1950, 0, 'wall_big');
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1950, 600, 'wall_big');
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(34, 600, 17, 0);	//adjust bounding box according to specifications
		//make the platforms for platforming
		ledge = this.platforms.create(0, 200, 'platform_big');		//platform A
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(0, 900, 'platform_big');		//platform B
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(550, 600, 'platform_big');	//platform C
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(800, 200, 'platform_small');	//platform D
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(850, 950, 'platform_med');	//platform E
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1150, 600, 'wall_big');		//wall F
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(34, 600, 17, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1150, 350, 'platform_small');	//platform G
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1200, 600, 'platform_big');	//platform H
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1450, 200, 'platform_big');	//platform I
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(600, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1850, 800, 'platform_small');	//platform J
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(150, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(1700, 995, 'platform_med');	//platform K
		ledge.body.immovable = true;		//make wall immovable
		ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications

		//spawn enemy pots
    	this.enemies = game.add.group();
    	this.enemy = new Enemy(game, 'pot', 150, 800, 0, this.player, this.platforms);
    	game.add.existing(this.enemy);
    	this.enemies.add(this.enemy);
    	this.enemy = new Enemy(game, 'pot', 1250, 1100, 0, this.player, this.platforms);
    	game.add.existing(this.enemy);
    	this.enemies.add(this.enemy);
    	this.enemy = new Enemy(game, 'pot', 1400, 100, 0, this.player, this.platforms);
    	game.add.existing(this.enemy);
    	this.enemies.add(this.enemy);
    	

		//set up scoreText to display player ore count
		this.scoreText = game.add.text(16, 16, 'Score: 0 Health: 10', {fontSize: '32px', fill: '#000' });
		this.scoreText.fixedToCamera = true;	//make it move with the camera

		//set up ores
		this.ores = game.add.group();
		this.ores.enableBody = true;
		// //spawn some ores
		// var ore = this.ores.create(100, 50, 'obsidian');
		// ore.scale.setTo(0.5);
		// ore.body.gravity.y = 150;	//make the ore fall
		// ore = this.ores.create(650, 450, 'obsidian');
		// ore.scale.setTo(0.5);
		// ore.body.gravity.y = 150;	//make the ore fall
		// ore = this.ores.create(750, 1050, 'obsidian');
		// ore.scale.setTo(0.5);
		// ore.body.gravity.y = 150;	//make the ore fall
		// ore = this.ores.create(1800, 50, 'obsidian');
		// ore.scale.setTo(0.5);
		// ore.body.gravity.y = 150;	//make the ore fall
		// ore = this.ores.create(1850, 850, 'obsidian');
		// ore.scale.setTo(0.5);
		// ore.body.gravity.y = 150;	//make the ore fall
		// console.log(ore);

		//set up ore pots
		this.orePots = game.add.group();
		this.orePots.enableBody = true;
		//spawn some ore pots
		var pot = this.orePots.create(100, 50, 'pot');
		pot.body.gravity.y = 150;	//make the ore fall
		pot = this.orePots.create(650, 450, 'pot');
		pot.body.gravity.y = 150;	//make the ore fall
		pot = this.orePots.create(750, 1050, 'pot');
		pot.body.gravity.y = 150;	//make the ore fall
		pot = this.orePots.create(1800, 50, 'pot');
		pot.body.gravity.y = 150;	//make the ore fall
		pot = this.orePots.create(1850, 850, 'pot');
		pot.body.gravity.y = 150;	//make the ore fall
		console.log(pot);




      this.swords = game.add.group();  //create the sword group

		//make the sword UI
		this.swordUI = game.add.group();
		//looks confusing, but this basically just creates each UI part and immediately fixes it to the camera
		(this.swordUI.create(607, 5, 'swordHilt')).fixedToCamera = true;	//sword hilt
		(this.swordUI.create(708, 5, 'swordBlade')).fixedToCamera = true;	//blade segment 1
		(this.swordUI.create(757, 5, 'swordBlade')).fixedToCamera = true;	//blade segment 2
		(this.swordUI.create(806, 5, 'swordBlade')).fixedToCamera = true;	//blade segment 3
		(this.swordUI.create(855, 5, 'swordBlade')).fixedToCamera = true;	//blade segment 4
		(this.swordUI.create(904, 5, 'swordBlade')).fixedToCamera = true;	//blade segment 5
		
	},
	update:function() {
		//let player collide with platforms
		game.physics.arcade.collide(this.player, this.platforms);

		//swing sword when spacebar is pressed
		if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			if(this.swords.length < 1) {	//only spawn a sword if one isn't currently in action
				var sword = new Sword(game, 'swordHilt', 'swordBlade', this.player, this.platforms, this.enemies);
				this.swords.add(sword);
			}
		}


		//let player collide with enemies (TODO)
		game.physics.arcade.overlap(this.player, this.enemies, this.touchEnemy, null, this);

		//let player collide with ore pots
		game.physics.arcade.overlap(this.player, this.orePots, this.touchOrePot, null, this);
		game.physics.arcade.collide(this.orePots, this.platforms);

		//handle ore collisions
		game.physics.arcade.overlap(this.player, this.ores, this.touchOre, null, this);	//let player collect ores
		game.physics.arcade.collide(this.ores, this.platforms);							//make ores collide with platforms


		//TEMPORARY CODE - place sword UI under manual control. DELETE ONCE UI IS LINKED TO SWORD LENGTH
		this.swordState = this.player.swordLength;

		//update the sword UI - make length reflect our current sword length
		//swordState == 0: just the hilt; swordState == 5: full sword
		var i;
		for (i = 1; i <= 5; i++) {	//for each blade segment of the UI
			var segment = this.swordUI.getChildAt(i);	//get the blade segment at index i
			if(i <= this.swordState) {	//if this segment is on our current sword, make it visible
				segment.visible = true;
			} else {					//if this segment broke off, make it invisible
				segment.visible = false;
			}
		}
	},
	render:function() {
		//game.debug.body(this.player);
		//game.debug.physicsGroup(this.platforms);
	},

   touchEnemy:function() {
    	console.log("ouch");
    	//deal damage to player if we're not in "invincibility frames"
    	if(!this.invincible) {
      		this.health -= 1;		//lose health
      		if(this.health <= 0) {	//if dead, go to Game Over
      			game.state.start('GameOver');
      		}
      		this.scoreText.text = 'Score: ' + this.score + " Health: " + this.health;	//update the scoreboard
      		this.invincible = true;	//temporarily become invincible (to avoid having your health instantly disappear)
      		game.time.events.add(1000, this.toggleInvincible, this);	//become mortal again after 1 second
  		}
   },

   touchOre:function(player, ore) {
   		if(ore.vulnerable) {	//only allow pickup once ore has existed for a bit (see touchOrePot)
   			//remove the ore
   			ore.kill();
            // temporary code since sword repair doesn't exist yet
            this.player.swordLength += 1;
   			//update the score
   			this.score += 1;
   			this.scoreText.text = 'Score: ' + this.score + " Health: " + this.health;
   		}
   },

	toggleInvincible:function() {
		this.invincible = false;	//reset invincibility
	},

	touchOrePot:function(player, pot) {
		//spawn an ore at the pot's location
		var ore = this.ores.create(pot.body.x, pot.body.y, 'obsidian');
		ore.scale.setTo(0.5);
		ore.body.gravity.y = 150;	//make the ore fall
		
		//give a short delay before the ore can be picked up (so it doesn't instantly disappear)
		ore.vulnerable = false;		//start off invulnerable
		var spawnTimer = game.time.create(true);
		spawnTimer.add(500,this.enableOre,this, ore);	//after half a second, let the ore be picked up
		spawnTimer.start();
		
		pot.kill();	//remove the old pot now that we're done with it
	},

	enableOre:function(ore) {
		ore.vulnerable = true;
	}
};