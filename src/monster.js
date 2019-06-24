// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import Wall from './wall.js';
import { type Bounds, doBoundsIntersect } from './mathTypes.js';

type State = 'DESCENDING' | 'ATTACKING';

export default class Monster extends Entity {
  xPosition: number;
  yPosition: number;
  scale: number;
  totalTime: number;
  lastAttackTime: number;
  image: Image;
  state: State;
  target: ?Wall;

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
    const target = this.target;
    
    if (this.state === 'DESCENDING') {
      this.yPosition = this.yPosition + 10 * elapsedSec;
    } else if (this.state === 'ATTACKING' && target) {
      if (target.isDestroyed) {
        this.state = 'DESCENDING';
      } else if (this.totalTime - this.lastAttackTime > Math.PI) {
        target.attack(1);
        this.lastAttackTime = this.totalTime;
      }
    }
    
    this.totalTime += elapsedSec;
    this.scale = 0.05 * Math.sin(2 * this.totalTime) + 1.0;
  }

  testWallCollision(wall: Wall) {
    if (this.state === 'ATTACKING') {
      return;
    }
    const monsterBounds = {
      x: this.xPosition,
      y: this.yPosition,
      width: 128,
      height: 128
    };
    if (doBoundsIntersect(wall.boundingBox, monsterBounds)) {
      this.state = 'ATTACKING';
      this.target = wall;
      this.lastAttackTime = this.totalTime;
    }
  }

  get yPos() {
    return this.yPosition;
  }
}