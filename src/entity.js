export class Entity {
  load() {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }

  draw(_canvas) {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }

  update(_elapsedSec) {
    throw new TypeError('Abstract class "Entity" cannot be instantiated directly.');
  }
}