let __Instance = null;

export class InputHelper {
  constructor(canvas) {
    this._isMouseDown = false;
    this._mouseX = 0;
    this._mouseY = 0;

    canvas.htmlElement.addEventListener('mousedown', () => {
      this._isMouseDown = true;
    });
    
    canvas.htmlElement.addEventListener('mouseup', () => {
      this._isMouseDown = false;
    });
    
    canvas.htmlElement.addEventListener('mousemove', e => {
      this._mouseX = (e.pageX - canvas.htmlElement.offsetLeft) / canvas.viewportRatio;
      this._mouseY = (e.pageY - canvas.htmlElement.offsetTop) / canvas.viewportRatio;
    });

    __Instance = this;
  }

  static get instance() {
    return __Instance;
  }

  get mouseX() {
    return this._mouseX;
  }
  
  get mouseY() {
    return this._mouseY;
  }
  
  get isMouseDown() {
    return this._isMouseDown;
  }
}