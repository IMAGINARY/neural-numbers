//import 'core-js/stable';
//import 'regenerator-runtime/runtime';


export class View {
  constructor(controller) {
    this.controller = controller;
    this.createEvents();
  }

  createEvents() {
    window.addEventListener('DOMContentLoaded', (event) => {
      this.slides = document.querySelectorAll('.slide');
      this.NUMBER_OF_SLIDES = this.slides.length - 1;
      this.showSlideByURL();
    });


    window.onhashchange = (event) => {
      this.showSlideByURL();
    };

    window.addEventListener('keydown', (event) => {
      const key = event.key;
      const id = this.getCurrentSlideID();
      switch (event.key) {
        case "ArrowLeft":
          this.setSlide((id - 2 + this.NUMBER_OF_SLIDES) % this.NUMBER_OF_SLIDES + 1);
          break;
        case "ArrowRight":
          this.setSlide(id % this.NUMBER_OF_SLIDES + 1);
          break;
      }
    });
  }

  getCurrentSlideID() {
    let hash = window.location.hash.substring(1);
    if (hash === "") {
      hash = 1;
    } else {
      hash = (hash | 0);
    }
    return hash;
  }

  setSlide(id) {
    window.location.hash = id;
  }

  showSlideByURL() {
    this.showSlide(this.getCurrentSlideID());
  }

  showSlide(id) {
    this.slides.forEach(slide => {
      if (slide.onExit && slide.open)
        slide.onExit(this.controller);
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
    }
  }
}
