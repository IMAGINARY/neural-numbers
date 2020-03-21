/* eslint-disable class-methods-use-this */
export default class Slide {
  constructor(element, controller) {
    this.element = element;
    this.controller = controller;
  }

  async onEnter() {
    return Promise.resolve();
  }

  async onExit() {
    return Promise.resolve();
  }
}

Slide.slideClasses = {};

Slide.registerClass = (id, slideClass) => {
  Slide.slideClasses[id] = slideClass;
}

Slide.getClass = id => Slide.slideClasses[id];
