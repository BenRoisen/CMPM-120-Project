//Define Play state and methods
var Play = function(game) {};
Play.prototype = {
	init: function() {
		console.log('Play: preload');
		//create all the variables we need
		this.background;
		this.player;
		this.platforms;
		this.sword;
		//this.score = 0;	//initialize score to 0
		//this.scoreText;
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

		//create the player
		this.player = new Player(game, 'player', 0, 1)	//player(game, key, frame, scale)
		game.add.existing(this.player);
		game.camera.follow(this.player);	//make camera follow player

		//create a group to hold collidable platforms
		this.platforms = game.add.group();
		this.platforms.enableBody = true;	//enable collisions

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

		//set up scoreText to display player score
		//this.scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#fff' });
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
   }
};