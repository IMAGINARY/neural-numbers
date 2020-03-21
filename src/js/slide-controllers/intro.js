import Slide from '../slide';

export default class IntroSlide extends Slide {
  async onEnter() {
    await this.controller.initIntroPaint(this.element);
  }

  async onExit() {
    this.controller.cleanupPaint();
  }
}

Slide.registerClass('intro', IntroSlide);
