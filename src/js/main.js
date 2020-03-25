/* eslint-disable no-unused-vars */
import Controller from './Controller';
import IdleDetector from './IdleDetector';
import SlideShow from './SlideShow';
import I18nControler from './i18nController';
import LangSwitcher from './LangSwitcher';

import './slide-controllers/intro';
import './slide-controllers/training';
import './slide-controllers/what-is-training-data';

const configDefaults = {
  paintClearTimeout: 2.2,
  idleReload: 300,
  lastTrainStepTimeout: 1.5,
  languages: {
    en: 'English',
  },
  defaultLanguage: 'en',
};

fetch('./config.json', { cache: 'no-cache' })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then((config => Object.assign({}, configDefaults, config)))
  .then((config) => {
    I18nControler.init().then(() => {
      I18nControler.setLanguage(config.defaultLanguage);
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
    });
  });
