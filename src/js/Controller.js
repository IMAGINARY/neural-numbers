import {
  Paint
} from './Paint.js';

import {
  View
} from './View.js';

import {
  MnistData
} from './MnistData.js';

import {
  NeuralNetwork
} from './NeuralNetwork.js';

import {
  ValidationPreview
} from './ValidationPreview.js';

export class Controller {
  constructor() {
    this.view = new View(this);
    this.data = new MnistData();
    this.dataloaded = false;

  }

  async initIntroPaint(paintel) {
    if (!this.trainedmodel)
      this.trainedmodel = await tf.loadLayersModel('assets/models/my-model.json');
    this.paint = new Paint(paintel, this.trainedmodel);
  }

  cleanupPaint() {
    this.paint.cleanup();
  }

  async loadData() {
    if (!this.dataloaded) {
      await this.data.load();
      this.dataloaded = true;
    }
  }

  async initTrainingEnvironment(els) {
    this.vp = new ValidationPreview(this.data, els);
    this.nn = new NeuralNetwork(this.vp, els);
    this.paint = new Paint(els.paint, this.nn.model);
    await this.vp.initValidationImages(els);
    this.vp.updateValidationImages(this.nn.model);
    this.vp.updateAccuracy(this.nn.model);
  }

  async startTraining() {
    await this.nn.train(this.data);
  }

  pauseTraining() {
    return new Promise(resolve => {
      if (this.nn.training) {
        this.nn.addPauseCallback(resolve);
        this.nn.training = false;
      } else
        resolve();
    });
  }

  async resetTraining() {
    await this.pauseTraining();
    const els = this.nn.els;
    this.cleanupValidationPreview();
    this.cleanupNetwork();
    this.cleanupPaint();
    await this.initTrainingEnvironment(els);
    this.startTraining();
  }

  toggleTraining() {
    if (this.nn)
      this.nn.toggleTraining(this.data);
  }

  cleanupNetwork() {
    if (this.nn) {
      this.nn.cleanup();
      delete this.nn;
    }

  }

  cleanupValidationPreview() {
    if (this.vp) {
      this.vp.cleanup();
      delete this.nn;
    }

  }
}
