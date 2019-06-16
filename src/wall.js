// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import { type Bounds } from './mathTypes.js';

export default class Monster extends Entity {
  xPosition: number;
  yPosition: number;
  underAttack: boolean;
  destroyed: boolean;
  opacity: number;
  hits: number;
  image: Image;

  constructor(xPosition: number, yPosition: number) {
    super();
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.underAttack = false;
    this.opacity = 1;
    this.hits = 3;
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.image = img;
    });
  }

  draw(canvas: GameCanvas) {
    if (this.destroyed) {
      return;
    }
    canvas.drawImage(
      this.image,
      this.xPosition,
      this.yPosition,
      128,
      108,
      1.0,
      this.opacity);
  }

  update(elapsedSec: number) {
    const targetOpacity = this.hits * 0.33;

    if (this.opacity > targetOpacity) {
      this.opacity -= 0.5 * elapsedSec;
    }
  }

  attack(hits: number) {
    this.hits -= hits;
    if (this.hits <= 0) {
      this.destroyed = true;
    }
  }

  get boundingBox() {
    // Return a bounding box that is slightly smaller than the wall
    // to make sure that passing monsters don't get distracted!
    return {
      x: this.xPosition + 20,
      y: this.yPosition + 24,
      width: 80,
      height: 80
    };
  }

  get isDestroyed() {
    return this.destroyed;
  }
}