const VIEWPORT_HEIGHT = 1080;
const VIEWPORT_WIDTH = 720;
const SCREEN_VIEWPORT_RATIO = window.innerHeight / VIEWPORT_HEIGHT;

export class GameCanvas {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');

    canvasElement.setAttribute('height', window.innerHeight);
    canvasElement.setAttribute('width', VIEWPORT_WIDTH * SCREEN_VIEWPORT_RATIO);

    this.context.fillStyle = '#e2fcbf';
  }
  
  drawImage(image, x, y, width, height) {
    this.context.drawImage(
      image,
      x * SCREEN_VIEWPORT_RATIO,
      y * SCREEN_VIEWPORT_RATIO,
      width * SCREEN_VIEWPORT_RATIO,
      height * SCREEN_VIEWPORT_RATIO);
  }

  clear() {
    this.context.fillRect(0, 0, this.canvasElement.clientWidth, this.canvasElement.clientHeight);
  }
}