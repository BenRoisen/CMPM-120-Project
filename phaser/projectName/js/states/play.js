//Define Play state and methods
var Play = function(game) {};
Play.prototype = {
	init: function() {
		console.log('Play: preload');
		//create all the variables we need
		this.background;
		this.player;
		this.platforms;
		this.swords;
		this.score = 0;	//keeps track of score (# of ore pieces)
		this.scoreText;
		this.ores;	//group to hold ores
		this.health = 10;	//health of the player
		this.invincible = false;	//toggles temporary player invincibility after taking damage
	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		//enable arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
		//this.background = TODO LATER
		game.stage.backgroundColor = "#0000ff";	//create a blue background

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
		var ground = this.platforms.create(0, game.world.height - 16, 'ground');
		ground.scale.setTo(7, 1);		//scale the ground to fit the game (sprite is 300x68, & we need to to be 2000x16)
		ground.body.immovable = true;	//make the ground immovable so it won't fall when player touches it

      //make a pot
      this.enemy = new Enemy(game, 'pot', 500, game.world.height - 164, 0, this.player, this.platforms);
      game.add.existing(this.enemy);
      this.enemies = game.add.group();
      this.enemies.add(this.enemy);

		//make some ledges
		var ledge = this.platforms.create(400, 600, 'ground');
		ledge.body.immovable = true;		//make ledge immovable
		ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(-150, 450, 'ground');
		ledge.body.immovable = true;		//make ledge immovable
		ledge.body.setSize(300, 34, 0, 17);	//adjust bounding box according to specifications
		ledge = this.platforms.create(-220, 250, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);
		ledge = this.platforms.create(470, 200, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);
		ledge = this.platforms.create(470, 980, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);
		ledge = this.platforms.create(670, 800, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);
		ledge = this.platforms.create(470, 600, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);
		ledge = this.platforms.create(670, 400, 'ground');
		ledge.body.immovable = true;
		ledge.body.setSize(300, 34, 0, 17);

		//set up scoreText to display player ore count
		this.scoreText = game.add.text(16, 16, 'Score: 0 Health: 10', {fontSize: '32px', fill: '#fff' });
		this.scoreText.fixedToCamera = true;	//make it move with the camera

		//set up ores
		this.ores = game.add.group();
		this.ores.enableBody = true;
		//spawn some ores
		var ore = this.ores.create(470, 100, 'pot');	//use the pot sprite for now
		ore.body.gravity.y = 150;	//make the ore fall
	},
	update:function() {
		//let player collide with platforms
		game.physics.arcade.collide(this.player, this.platforms);

		if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			this.sword = new Sword(game, 'sword', this.player.x, this.player.y, 1, this.player, this.platforms, this.enemies);
			game.add.existing(this.sword);
		}


		//let player collide with enemies (TODO)
		game.physics.arcade.overlap(this.player, this.enemies, this.touchEnemy, null, this);

		//handle ore collisions
		game.physics.arcade.overlap(this.player, this.ores, this.touchOre, null, this);	//let player collect ores
		game.physics.arcade.collide(this.ores, this.platforms);							//make ores collide with platforms

		// function touchEnemy(player, enemy) {
		// 	//remove the enemy
		// 	enemy.kill();

		// 	//update the score
		// 	this.score -= 25;
		// 	this.scoreText.text = 'Score: ' + this.score;	//display the new score

		// 	//switch to GameOver state, sending it the player's score
		// 	game.state.start('GameOver', true, false, this.score);
		// }
	},
	render:function() {
		//game.debug.body(this.player);
		game.debug.physicsGroup(this.platforms);
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
   		//remove the ore
   		ore.kill();
   		//update the score
   		this.score += 1;
   		this.scoreText.text = 'Score: ' + this.score + " Health: " + this.health;
   },

	toggleInvincible:function() {
		this.invincible = false;	//reset invincibility
	}
};