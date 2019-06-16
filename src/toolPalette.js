// @flow

import assets from './assets.js';
import Entity from './entity.js';
import GameCanvas from './canvas.js';
import GameplayGrid from './gameplayGrid.js';
import InputHelper from './inputHelper.js';
import { type Bounds, type Point } from './mathTypes.js';

export default class ToolPalette extends Entity {
  isPlacingWall: boolean;
  wasMouseDown: boolean;
  wallToolBounds: Bounds;
  grid: GameplayGrid;
  wallToolImage: Image;
  wallGrabPos: Point;

  constructor(canvas: GameCanvas, grid: GameplayGrid) {
    super();

    this.isPlacingWall = false;
    this.wasMouseDown = false;

    this.wallToolBounds = {
      x: canvas.width / 2 - 128 - 8,
      y: canvas.height - 120,
      width: 128,
      height: 108
    };
    this.wallGrabPos = { x: 0, y: 0 };

    this.grid = grid;
  }

  load() {
    return assets.loadImage('images/wall.png').then(img => {
      this.wallToolImage = img;
    });
  }

  draw(canvas: GameCanvas) {
    canvas.fillRect('#ffffff', 0, canvas.height - 130, canvas.width, 130);
    canvas.fillRect('#333333', 0, canvas.height - 133, canvas.width, 3);
    canvas.drawImage(
      this.wallToolImage,
      this.wallToolBounds.x,
      this.wallToolBounds.y,
      this.wallToolBounds.width,
      this.wallToolBounds.height);

    if (this.isPlacingWall) {
      canvas.drawImage(
        this.wallToolImage,
        InputHelper.instance.mouseX - this.wallGrabPos.x,
        InputHelper.instance.mouseY - this.wallGrabPos.y,
        this.wallToolBounds.width,
        this.wallToolBounds.height,
        1.0,
        1.0,
        'hard-light');
    }
  }

  update(_elapsedSec: number) {
    if (_mouseInBounds(this.wallToolBounds)) {
      if (!this.wasMouseDown && InputHelper.instance.isMouseDown) {
        this.isPlacingWall = true;
        this.wallGrabPos = {
          x: InputHelper.instance.mouseX - this.wallToolBounds.x,
          y: InputHelper.instance.mouseY - this.wallToolBounds.y
        };
      }
    }
    if (this.isPlacingWall && this.wasMouseDown && !InputHelper.instance.isMouseDown) {
      this.grid.addWallPiece(
        InputHelper.instance.mouseX,
        InputHelper.instance.mouseY
      );
      this.isPlacingWall = false;
    }
    this.wasMouseDown = InputHelper.instance.isMouseDown;
  }
}

function _mouseInBounds(bounds) {
  return InputHelper.instance.mouseX > bounds.x &&
    InputHelper.instance.mouseX < bounds.x + bounds.width &&
    InputHelper.instance.mouseY > bounds.y &&
    InputHelper.instance.mouseY < bounds.y + bounds.height;
}