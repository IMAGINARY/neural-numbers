/* eslint-disable no-bitwise,class-methods-use-this,no-param-reassign */
import Slide from './slide.js';

export default class SlideShow {
  constructor(controller) {
    this.createEventMask();
    this.controller = controller;
    this.slides = Array.from(document.querySelectorAll('[data-slide]'))
      .map(element => element.getAttribute('data-slide'));
    this.currentSlide = 0;
    this.currentSlideController = null;

    window.onhashchange = async () => {
      this.maskEvents();
      await this.doSlideChange();
      this.unmaskEvents();
    };
    this.doSlideChange();

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          this.goPrevious();
          break;
        case 'ArrowRight':
          this.goNext();
          break;
        default:
          break;
      }
    });
  }

  createEventMask() {
    this.eventMask = document.createElement('div');
    this.eventMask.style.position = 'absolute';
    this.eventMask.style.top = '0';
    this.eventMask.style.left = '0';
    this.eventMask.style.width = '100%';
    this.eventMask.style.height = '100%';
    this.eventMask.style.zIndex = '1000000';
    this.eventMask.style.pointerEvents = 'all';
    this.eventMask.style.backgroundColor = 'transparent';
    this.eventMask.style.display = 'none';
    window.document.body.appendChild(this.eventMask);
  }

  maskEvents() {
    this.eventMask.style.display = 'block';
  }

  unmaskEvents() {
    this.eventMask.style.display = 'none';
  }

  /**
   * Go to the first slide
   */
  goFirst() {
    if (this.slides.length > 0) {
      this.goTo(this.slides[0]);
    }
  }

  /**
   * Go the net slide
   */
  goNext() {
    const currentID = this.slides.indexOf(this.getCurrentSlide());
    if (currentID < this.slides.length - 1) {
      this.goTo(this.slides[currentID + 1]);
    }
  }

  /**
   * Go to the previous slide
   */
  goPrevious() {
    const currentID = this.slides.indexOf(this.getCurrentSlide());
    if (currentID > 0) {
      this.goTo(this.slides[currentID - 1]);
    }
  }

  /**
   * Go to the requested slide
   * @param {string} id
   */
  goTo(id) {
    if (this.slides.includes(id)) {
      window.location.hash = id;
    }
  }

  /**
   * Returns the ID of the current slide
   * @return {null|string}
   */
  getCurrentSlide() {
    const hash = window.location.hash.substring(1);
    if (this.slides.length === 0) {
      return null;
    }

    return (hash !== '' ? hash : this.slides[0]);
  }

  /**
   * Handles a slide change by modifying the view and navigation
   *
   * @private
   */
  async doSlideChange() {
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
      await this.currentSlideController.onExit();
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
        await this.currentSlideController.onEnter();
      }
    }
  }
}
