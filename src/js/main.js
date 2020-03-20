import Controller from './Controller';
import IdleDetector from './IdleDetector';
import { IDLE_RELOAD } from './constants';

const controller = new Controller();
controller.loadData();

const id = new IdleDetector();
id.setTimeout(() => {
  window.location.hash = '#1';
  window.location.reload();
  controller.loadData();
},
1000 * IDLE_RELOAD);
