function OrePot(game, key, x, y, orePots, ores) {
	Phaser.Sprite.call(this, game, x, y, key, 0);
	this.game = game;
	this.game.physics.arcade.enable(this);
	this.body.gravity.y = 150;
	this.orePots = orePots;
	this.ores = ores;
	this.gotHit = false;
}
OrePot.prototype = Object.create(Phaser.Sprite.prototype);
OrePot.prototype.constructor = Player;

OrePot.prototype.update = function() {
	//game.physics.arcade.overlap(this, this.hammer, this.shatter, null, this);
	if(this.gotHit) {
		this.shatter()
	}
}
OrePot.prototype.shatter = function () {
	var ore = new Ore(game, 'obsidian', this.body.x, this.body.y);
	this.game.add.existing(ore);
	this.ores.add(ore);
	//ore.vulnerable = false;		//start off invulnerable
	//var spawnTimer = game.time.create(true);
		
	this.destroy();	//remove the old pot now that we're done with it
}


function Ore(game, key, x, y) {
	Phaser.Sprite.call(this, game, x, y, key, 0);
	game.physics.arcade.enable(this);
	this.body.gravity.y = 150;
	this.vulnerable = false;
	var spawnTimer = game.time.create(true);
	spawnTimer.add(500,this.enableOre,this, ore);	//after half a second, let the ore be picked up
	spawnTimer.start();
}
Ore.prototype = Object.create(Phaser.Sprite.prototype);
Ore.prototype.constructor = Ore;

Ore.prototype.enableOre = function() {
	this.vulnerable = true;
}