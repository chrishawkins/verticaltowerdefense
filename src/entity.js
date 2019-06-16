// @flow
import GameCanvas from './canvas.js';

export default class Entity {
  load() {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }

  draw(_canvas: GameCanvas) {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }

  update(_elapsedSec: number) {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }
}