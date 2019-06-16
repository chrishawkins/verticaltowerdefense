const assets = require('./assets.js');
import { Entity } from './entity.js';

export class ToolPalette extends Entity {
  constructor() {
    super();
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.wallToolImage = img;
    });
  }

  draw(canvas) {
    canvas.fillRect('#ffffff', 0, canvas.height - 130, canvas.width, 130);
    canvas.fillRect('#333333', 0, canvas.height - 133, canvas.width, 3);
    canvas.drawImage(
      this.wallToolImage,
      canvas.width / 2 - 128 - 8,
      canvas.height - 120,
      128,
      108);
  }

  update(elapsedSec) {
  }
}