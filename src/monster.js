// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';

export default class Monster extends Entity {
  yPosition: number;
  scale: number;
  totalTime: number;
  image: Image;

  constructor() {
    super();
    this.yPosition = 0;
    this.scale = 1;
    this.totalTime = 0;
  }

  load() {
    return assets.loadImage('images/green_blob.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas: GameCanvas) {
    canvas.drawImage(this.image, 25, this.yPosition, 128, 128, this.scale);
  }

  update(elapsedSec: number) {
    this.yPosition = this.yPosition + 10 * elapsedSec;
    
    this.totalTime += elapsedSec;
    this.scale = 0.05 * Math.sin(2 * this.totalTime) + 1.0;
  }
}