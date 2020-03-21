/* eslint-disable no-bitwise,class-methods-use-this,no-param-reassign */
import Slide from './slide';

export default class View {
  constructor(controller) {
    this.controller = controller;
    this.slides = Array.from(document.querySelectorAll('[data-slide]'))
      .map(element => element.getAttribute('data-slide'));
    this.currentSlide = 0;
    this.currentSlideController = null;

    window.onhashchange = () => {
      this.doSlideChange();
    };
    this.doSlideChange();

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.goBack();
          break;
        case 'ArrowRight':
          this.goNext();
          break;
        default:
          break;
      }
    });
  }

  goFirst() {
    if (this.slides.length > 0) {
      this.goTo(this.slides[0]);
    }
  }

  goNext() {
    const currentID = this.slides.indexOf(this.getCurrentSlide());
    if (currentID < this.slides.length - 1) {
      this.goTo(this.slides[currentID + 1]);
    }
  }

  goBack() {
    const currentID = this.slides.indexOf(this.getCurrentSlide());
    if (currentID > 0) {
      this.goTo(this.slides[currentID - 1]);
    }
  }

  goTo(id) {
    if (this.slides.includes(id)) {
      window.location.hash = id;
    }
  }

  getCurrentSlide() {
    const hash = window.location.hash.substring(1);
    if (this.slides.length === 0) {
      return null;
    }

    return (hash !== '' ? hash : this.slides[0]);
  }

  setSlide(id) {
    window.location.hash = this.slides[id];
  }

  showSlideByURL() {
    this.showSlide(this.getCurrentSlideID());
  }

  doSlideChange() {
    const currentSlide = this.getCurrentSlide();

    document.querySelector('.footer .navigation').childNodes.forEach((btn) => {
      btn.classList.remove('selected');
    });

    this.slides.forEach((slide) => {
      const element = document.querySelector(`[data-slide=${slide}]`);
      if (element.onExit && element.open) {
        element.onExit(this.controller);
      }
      element.open = false;
      element.classList.remove('visible');
      element.classList.remove('entering');
    });

    if (this.currentSlideController) {
      this.currentSlideController.onExit();
      this.currentSlideController = null;
    }

    const element = document.querySelector(`[data-slide=${currentSlide}]`);
    if (element) {
      const nav = element.getAttribute('data-slide-nav') || currentSlide;
      const menuItem = document.querySelector(`.footer .navigation [href='#${nav}']`);
      if (menuItem) {
        menuItem.classList.add('selected');
      }

      element.open = true;
      element.classList.add('visible');
      setTimeout(() => {
        element.classList.add('entering');
      }, 0);
      if (element.onEnter) {
        element.onEnter(this.controller);
      }

      const SlideClass = Slide.getClass(currentSlide);
      if (SlideClass) {
        this.currentSlideController = new SlideClass(element, this.controller);
        this.currentSlideController.onEnter();
      }
    }
  }
}
