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
		this.exit;
	},
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		//enable arcade physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//create the background
		this.background = this.add.sprite(0, 0, 'background');
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
    	

		//set up scoreText to display player ore count
		this.scoreText = game.add.text(16, 16, 'Score: 0 Health: 10', {fontSize: '32px', fill: '#000' });
		this.scoreText.fixedToCamera = true;	//make it move with the camera

		//set up ores
		this.ores = game.add.group();
		this.ores.enableBody = true;
		
		//set up ore pots
		this.orePots = game.add.group();
		this.orePots.enableBody = true;

		//set up enemies
		this.enemies = game.add.group();

      //create the hammer hitbox
      this.hammer = new Hammer(game, 'swordHilt', this.player, this.platforms, this.enemies, this.orePots);
      game.add.existing(this.hammer);
		
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

		//create a variable to keep track of which level we're on
		this.levelTracker = 1;


		//spawn the level exit door thing
		this.exit = game.add.group();
		this.exit.enableBody = true;
		
		//load the first level.
		//NOTE: make sure that any groups/etc. that will be needed for ALL levels have been set up prior to this.
		//(at the very least, make sure all the groups used by the sword have been declared BEFORE calling this function) 
		loadLevel_1(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores);
	},
	update:function() {
		//let player collide with platforms
		game.physics.arcade.collide(this.player, this.platforms);

		//swing sword when spacebar is pressed
		if(game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 1)) {
			if(this.swords.length < 1) {	//only spawn a sword if one isn't currently in action
				var sword = new Sword(game, 'swordHilt', 'swordBlade', this.player, this.platforms, this.enemies, this.orePots);
				this.swords.add(sword);
			}
		}

      // Boolean to track if the player has a sword or not
      if(this.swords.length < 1)
      {
         this.player.swordOut = false;
      } else {
         this.player.swordOut = true;
      }


		//let player collide with enemies (TODO)
		game.physics.arcade.overlap(this.player, this.enemies, this.touchEnemy, null, this);

		//let the hammer collide with ore pots
      if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
      {
         game.physics.arcade.overlap(this.hammer, this.orePots, this.touchOrePot, null, this);
      }	
		game.physics.arcade.collide(this.orePots, this.platforms);

		//handle ore collisions
		game.physics.arcade.overlap(this.player, this.ores, this.touchOre, null, this);	//let player collect ores
		game.physics.arcade.collide(this.ores, this.platforms);							//make ores collide with platforms

		//handle collisions w/ the endgame door thing
		game.physics.arcade.overlap(this.player, this.exit, this.touchExit, null, this);
		

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
		//game.debug.physicsGroup(this.exit);
		//game.debug.physicsGroup(this.platforms);
	},

   touchEnemy:function(player, enemy) {
    	//deal damage to player if we're not in "invincibility frames"
    	if(!this.invincible && !game.physics.arcade.overlap(this.hammer, enemy)) {
            console.log("ouch");
      		this.health -= 1;		//lose health
      		if(this.health <= 0) {	//if dead, go to Game Over
      			game.state.start('GameOver', true, false, this.score, false);
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

	touchOrePot:function(hammer, pot) {
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
	},

	touchExit:function(player, exit) {
		if(game.input.keyboard.downDuration(Phaser.Keyboard.E, 1)) {
			//figure out where to go from here
			switch(this.levelTracker) {
				case(1): 	//finished level 1 - load level 2
					//update levelTracker and load level 2
					console.log('loading level 2...');
					this.levelTracker = 2;
					loadLevel_2(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores);//this.loadLevel_2();
					break;
				case(2): 	//finished level 2 - load level 3
					console.log('loading level 3...');
					this.levelTracker = 3;
					loadLevel_3(this.game, this.player, this.platforms, this.enemies, this.orePots, this.exit, this.ores);//this.loadLevel_2();
					break;
				default: 	//default case - we've finished all levels and now want to go to game over
					game.state.start('GameOver', true, false, this.score, true);
					break;
			}
		}
	}
};