import {
  Paint
} from './Paint.js';

import {
  View
} from './View.js';




export class Controller {
  constructor() {
    var view = new View(this);
  }

  async initPaint(drawcanvas, normalizecanvas, output) {
    const model = await tf.loadLayersModel('assets/models/my-model.json');
    this.paint = new Paint(drawcanvas, normalizecanvas, output, model);
  }

  cleanupPaint() {
    this.paint.cleanup();
  }
}
