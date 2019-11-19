import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  Paint
} from './Paint.js';


export class View {
  constructor() {
    this.createEvents();
  }

  createEvents() {
    window.addEventListener('DOMContentLoaded', (event) => {
      this.slides = document.querySelectorAll('.slide');
      this.enterSlideByURL();
    });


    window.onhashchange = (event) => {
      this.enterSlideByURL();
    };
  }

  enterSlideByURL() {
    let hash = window.location.hash.substring(1);
    if (hash === "") {
      hash = 1;
    } else {
      hash = (hash | 0);
    }
    this.enterSlide(hash);
  }

  enterSlide(id) {
    this.slides.forEach(slide => {
      if(slide.onExit)
        slide.onExit();
      slide.className = 'slide';
    });
    if (this.slides[id]) {
      this.slides[id].classList.add('visible');
      setTimeout(() => {
        this.slides[id].classList.add('entering');
      }, 0);
      if(this.slides[id].onEnter) {
        this.slides[id].onEnter(this);
      }
    }
  }

  async initIntroPaint(el) {
    const model = await tf.loadLayersModel('assets/models/my-model.json');
    new Paint(el, model);
  }
}
