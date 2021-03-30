/* eslint-disable no-unused-vars */
import Controller from './Controller.js';
import IdleDetector from './IdleDetector.js';
import SlideShow from './SlideShow.js';
import I18nControler from './i18nController.js';
import LangSwitcher from './LangSwitcher.js';

import './slide-controllers/intro.js';
import './slide-controllers/training.js';
import './slide-controllers/what-is-training-data.js';

const configDefaults = {
  paintClearTimeout: 2.2,
  idleReload: 300,
  lastTrainStepTimeout: 1.5,
  languages: {
    en: 'English',
  },
  defaultLanguage: 'en',
  modelPath: 'assets/models/my-model.json',
};

fetch('./config.json', { cache: 'no-store' })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then((config => Object.assign({}, configDefaults, config)))
  .then((config) => {
    I18nControler.init(config.defaultLanguage).then(() => {
      const controller = new Controller(config);
      const slideShow = new SlideShow(controller);
      controller.loadData();

      if (Object.entries(config.languages).length > 1) {
        const langSwitcher = new LangSwitcher(
          document.querySelector('.footer .utility'),
          config,
          (code) => { I18nControler.setLanguage(code); }
        );
      }

      const id = new IdleDetector();
      id.setTimeout(() => {
        window.location.hash = '#intro';
        window.location.reload();
        controller.loadData();
      },
      1000 * config.idleReload);

      // Disable dragging a elements
      document.querySelectorAll('a')
        .forEach((aElement) => {
          aElement.addEventListener('dragstart', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          });
        });
    });
  });
