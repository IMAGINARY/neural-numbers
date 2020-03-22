import Controller from './Controller';
import IdleDetector from './IdleDetector';
import { IDLE_RELOAD } from './config';
import SlideShow from './SlideShow';

import './slide-controllers/intro';
import './slide-controllers/training';
import './slide-controllers/what-is-training-data';

const controller = new Controller();
const slideShow = new SlideShow(controller);
controller.loadData();

const id = new IdleDetector();
id.setTimeout(() => {
  window.location.hash = '#intro';
  window.location.reload();
  controller.loadData();
},
1000 * IDLE_RELOAD);
