const VIEWPORT_HEIGHT = 1080;
const VIEWPORT_WIDTH = 720;
const SCREEN_VIEWPORT_RATIO = window.innerHeight / VIEWPORT_HEIGHT;

export class GameCanvas {
  constructor(canvasElement) {
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');

    canvasElement.setAttribute('height', window.innerHeight);
    canvasElement.setAttribute('width', VIEWPORT_WIDTH * SCREEN_VIEWPORT_RATIO);
  }
  
  drawImage(image, x, y, width, height, scale = 1.0) {
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    this.context.drawImage(
      image,
      (x - (scaledWidth - width) / 2) * SCREEN_VIEWPORT_RATIO,
      (y - (scaledHeight - height) / 2) * SCREEN_VIEWPORT_RATIO,
      scaledWidth * SCREEN_VIEWPORT_RATIO,
      scaledHeight * SCREEN_VIEWPORT_RATIO);
  }

  clear() {
    this.context.fillStyle = '#e2fcbf';
    this.context.fillRect(
      0,
      0,
      this.canvasElement.clientWidth,
      this.canvasElement.clientHeight);
  }
  
  fillRect(style, x, y, width, height) {
    this.context.fillStyle = style;
    this.context.fillRect(
      x * SCREEN_VIEWPORT_RATIO,
      y * SCREEN_VIEWPORT_RATIO,
      width * SCREEN_VIEWPORT_RATIO,
      height * SCREEN_VIEWPORT_RATIO);
  }

  height() {
    return VIEWPORT_HEIGHT;
  }
  
  width() {
    return VIEWPORT_WIDTH;
  }
}