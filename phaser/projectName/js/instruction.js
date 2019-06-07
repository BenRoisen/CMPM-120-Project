function Instruction(game, key, x, y) {
   Phaser.Sprite.call(this, game, x, y, key, 0);
   this.game = game;
   this.x = x;
   this.y = y;
   this.anchor.x = 0.5;
   this.anchor.y = 0.5;
   this.scale.setTo(0.1);

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
}