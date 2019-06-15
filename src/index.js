const assets = require('./assets.js');

const canvas = document.getElementById('main-canvas');
const context = canvas.getContext('2d');

assets.loadImage('images/green_blob.png').then(img => {
    context.drawImage(img, 25, 25);
});
