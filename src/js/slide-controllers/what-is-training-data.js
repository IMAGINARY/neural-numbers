import Slide from '../slide.js';

export default class WhatIsTrainingDataSlide extends Slide {
  async onEnter() {
    await this.controller.initIntroPaint(document.querySelector('#normalizepaint'));
  }

  async onExit() {
    this.controller.cleanupPaint();
  }
}

Slide.registerClass('what-is-training-data', WhatIsTrainingDataSlide);
