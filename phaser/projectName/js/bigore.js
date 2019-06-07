function BigOre(game, key, x, y, score) {
   Phaser.Sprite.call(this, game, x, y, key, 0);
   this.game = game;
   this.game.physics.arcade.enable(this);
   this.x = x;
   this.y = y;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;

   this.hits = 3;
   this.score = score;
   this.got_hit = false;

   this.emitter = game.add.emitter(this.x, this.y, 100);
   this.emitter.particleClass = OreShard;
   this.emitter.gravity = 800;
}
BigOre.prototype = Object.create(Phaser.Sprite.prototype);
BigOre.prototype.constructor = BigOre;

BigOre.prototype.update = function() {

   if(this.got_hit) 
   {
      console.log("got hit");
      this.hits--;
      this.got_hit = false;
      this.emitter.makeParticles();
      this.emitter.start(true, 200, null, 20);
   }

   if(this.hits <= 0)
   {
      this.emitter.makeParticles();
      this.emitter.start(true, 2000, null, 100);
      this.destroy();
   }
}

// Ore Shards for the particle emitter
var OreShard = function(game, x, y) {
   Phaser.Particle.call(this, game, x, y, 'obsidian');
   this.game.physics.arcade.enable(this);
};

OreShard.prototype = Object.create(Phaser.Particle.prototype);
OreShard.prototype.constructor = OreShard;

OreShard.prototype.onEmit = function() {
   // this.alpha = 0.5;
   console.log("onEmitting");
   this.rotation = Math.random() * 2 * Math.PI;
   this.body.velocity.x = Math.cos(this.rotation) * (Math.random() * 200 +300);
   this.body.velocity.y = Math.sin(this.rotation) * (Math.random() * 200 +300);

   this.scale.x = 0.5;
   this.scale.y = 0.5;
   this.alpha = 0.5;
}

function WhiteOut(game, key, x, y) {
   Phaser.Sprite.call(this, game, x, y, key, 0);
   this.game = game;
   this.game.physics.arcade.enable(this);
   this.alpha = 0;
   this.delay = 5;
}
WhiteOut.prototype = Object.create(Phaser.Sprite.prototype);
WhiteOut.prototype.constructor = WhiteOut;

WhiteOut.prototype.update = function() {

   if(this.alpha < 1)
   {
      this.alpha += 0.1;
   } else {
      if(this.delay > 0)
      {
         --this.delay;
      } else {
         game.state.start('GameOver', true, false, 0, true);
      }
   }
}