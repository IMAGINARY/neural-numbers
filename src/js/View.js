/* eslint-disable no-bitwise,class-methods-use-this,no-param-reassign */
export default class View {
  constructor(controller) {
    this.controller = controller;
    this.createEvents();
  }

  createEvents() {
    window.addEventListener('DOMContentLoaded', () => {
      this.slides = document.querySelectorAll('.slide');
      this.NUMBER_OF_SLIDES = this.slides.length;
      // document.querySelector("#backbutton").onpointerdown = (() => this.goBack());
      // document.querySelector("#nextbutton").onpointerdown = (() => this.goNext());
      this.showSlideByURL();
    });

    window.onhashchange = () => {
      this.showSlideByURL();
    };

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

  goNext() {
    this.setSlide((this.getCurrentSlideID() + 1) % this.NUMBER_OF_SLIDES);
  }

  goBack() {
    this.setSlide((this.getCurrentSlideID() - 1 + this.NUMBER_OF_SLIDES) % this.NUMBER_OF_SLIDES);
  }

  getCurrentSlideID() {
    let hash = window.location.hash.substring(1);
    if (hash === '') {
      hash = 1;
    } else {
      hash |= 0;
    }
    return hash - 1;
  }

  setSlide(id) {
    window.location.hash = id + 1;
  }

  showSlideByURL() {
    this.showSlide(this.getCurrentSlideID());
  }

  showSlide(id) {
    /*
    //For navigation circles
    document.querySelector('#navcircles').childNodes.forEach(circ => {
      circ.classList.remove('selected');
    });
    document.querySelector('#navcircles').childNodes[id].classList.add('selected');
    */

    document.querySelector('.footer .navigation').childNodes.forEach((btn) => {
      btn.classList.remove('selected');
    });
    document.querySelector('.footer .navigation').childNodes[id].classList.add('selected');

    this.slides.forEach((slide) => {
      if (slide.onExit && slide.open) {
        slide.onExit(this.controller);
      }
      slide.open = false;
      slide.className = 'slide';
    });

    if (this.slides[id]) {
      this.slides[id].open = true;
      this.slides[id].classList.add('visible');
      setTimeout(() => {
        this.slides[id].classList.add('entering');
      }, 0);
      if (this.slides[id].onEnter) {
        this.slides[id].onEnter(this.controller);
      }
      /*
        ["backbutton", "nextbutton"].forEach(b => {
          const el = document.querySelector("#" + b);
          if (this.slides[id][b]) {
            el.innerHTML = this.slides[id][b];
            el.classList.add('visible');
          } else {
            el.classList.remove('visible');
          }
        });
      */
    }
  }
}
