function Instruction(game, key, x, y, player) {
   Phaser.Sprite.call(this, game, x, y, key, 0);
   this.game = game;
   this.x = x;
   this.y = y;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;
   this.scale.setTo(0.1);

   this.player = player;

   this.showing = false;
   this.fading = true;
   this.alpha = 1;
   this.minAlpha = 0.2;
   this.maxAlpha = 1;
}
Instruction.prototype = Object.create(Phaser.Sprite.prototype);
Instruction.prototype.constructor = Instruction;

Instruction.prototype.update = function() {

   if(this.showing)
   {
      if(this.fading)
      {
         if(this.alpha > this.minAlpha)
         {
            this.alpha -= 0.05;
         } else {
            this.fading = false;
         }
      } else {
         if(this.alpha < this.maxAlpha)
         {
            this.alpha += 0.05;
         } else {
            this.fading = true;
         }
      }
   } else {
      this.alpha = 0;
   }

   if(Phaser.Math.distance(this.x, this.y, this.player.x, this.player.y) >= 500)
   {
      this.showing = false;
   }
}


function Arrow(game, key, x, y) {
   Phaser.Sprite.call(this, game, x, y, key, 0);
   this.game = game;
   this.x = x;
   this.y = y;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;
   this.scale.setTo(0.1);

   this.showing = true;
   this.fading = true;
   this.alpha = 1;
   this.minAlpha = 0.2;
   this.maxAlpha = 1;
}
Arrow.prototype = Object.create(Phaser.Sprite.prototype);
Arrow.prototype.constructor = Arrow;

Arrow.prototype.update = function() {

   if(this.showing)
   {
      if(this.fading)
      {
         if(this.alpha > this.minAlpha)
         {
            this.alpha -= 0.05;
         } else {
            this.fading = false;
         }
      } else {
         if(this.alpha < this.maxAlpha)
         {
            this.alpha += 0.05;
         } else {
            this.fading = true;
         }
      }
   } else {
      this.alpha = 0;
   }

   if(game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, 1) || game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, 1))
   {
      this.destroy();
   }
}