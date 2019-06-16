// @flow

export default {
  loadImage(url: string) {
    return new Promise<Image>((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => {
          resolve(img);
      }, false);
      img.addEventListener('error', () => {
          reject(new Error('Failed to load ' + url));
      });
      img.src = url;
    });
  }
}