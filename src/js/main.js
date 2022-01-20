/* eslint-disable no-unused-vars */
import Controller from './Controller.js';
import IdleDetector from './IdleDetector.js';
import SlideShow from './SlideShow.js';
import I18nControler from './i18nController.js';
import LangSwitcher from './LangSwitcher.js';

import './slide-controllers/intro.js';
import './slide-controllers/training.js';
import './slide-controllers/what-is-training-data.js';
import './slide-controllers/design-network.js';

/**
 * Return the URL of the user-supplied config file or {null} if it is not present.
 *
 * A custom config file name can be provided via the 'config' query string variable.
 * Allowed file names must match the regex /^[A-Za-z0\-_.]+$/.
 *
 * @returns {URL|null} User-supplied config URL or {null} if not supplied.
 * @throws {Error} If the user-supplied config file name doesn't match the regex.
 */
function getCustomConfigUrl() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  if (!urlSearchParams.has('config')) {
    return null;
  }

  const customConfigName = urlSearchParams.get('config');
  const whitelistRegex = /^[A-Za-z0\-_.]+$/;
  if (whitelistRegex.test(customConfigName)) {
    return new URL(customConfigName, window.location.href);
  }

  throw new Error(`Custom config path ${customConfigName} must match ${whitelistRegex.toString()}.`);
}

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


const defaultConfigUrl = new URL('./config.json', window.location.href);
const customConfigUrl = getCustomConfigUrl();
const configUrl = customConfigUrl || defaultConfigUrl;

fetch(configUrl, { cache: 'no-store' })
  .then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .catch((err) => { throw new Error(`Failed to load config file ${configUrl}: ${err}`); })
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
  })
  .catch(err => console.error(err));
