// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import { type Bounds, doBoundsIntersect } from './mathTypes.js';

type State = 'DESCENDING' | 'ATTACKING';

export default class Monster extends Entity {
  xPosition: number;
  yPosition: number;
  scale: number;
  totalTime: number;
  image: Image;
  state: State;

  constructor(xPos: number) {
    super();
    this.xPosition = xPos;
    this.yPosition = 0;
    this.scale = 1;
    this.totalTime = 0;
    this.state = 'DESCENDING';
  }

  load() {
    return assets.loadImage('images/green_blob.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas: GameCanvas) {
    canvas.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      128,
      128,
      this.scale);
  }

  update(elapsedSec: number) {
    if (this.state === 'DESCENDING') {
      this.yPosition = this.yPosition + 10 * elapsedSec;
    }
    
    this.totalTime += elapsedSec;
    this.scale = 0.05 * Math.sin(2 * this.totalTime) + 1.0;
  }

  testWallCollision(bounds: Bounds) {
    const monsterBounds = {
      x: this.xPosition,
      y: this.yPosition,
      width: 128,
      height: 128
    };
    if (doBoundsIntersect(bounds, monsterBounds)) {
      this.state = 'ATTACKING';
    }
  }
}