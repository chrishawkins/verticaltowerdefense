const assets = require('./assets.js');
import { Entity } from './entity.js';

export class Monster extends Entity {
  load() {
    return assets.loadImage('images/green_blob.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas) {
    canvas.drawImage(this.image, 25, 25, 128, 128);
  }

  update() {
    // do nothing yet
  }
}