export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => {
        resolve(img);
    }, false);
    img.addEventListener('error', e => {
        reject(e);
    });
    img.src = url;
  });
}