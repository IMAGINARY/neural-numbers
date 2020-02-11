// eslint-disable-next-line import/no-extraneous-dependencies
// import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!



import {
  Controller
} from './Controller.js';

import {
  IdleDetector
} from './IdleDetector.js';

import {
  IDLE_RELOAD
} from './constants.js';

const controller = new Controller();

controller.loadData();


const id = new IdleDetector();
id.setTimeout(() => {
    location.hash = '#1';
    location.reload();
  },
  1000 * IDLE_RELOAD
);
