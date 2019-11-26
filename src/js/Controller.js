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
    if(this.nn) { //this.nn might have been deleted because in the meanwhile the slide has been skipped
      this.vp.updateValidationImages(this.nn.model);
      this.vp.updateAccuracy(this.nn.model);
    }
  }

  async startTraining() {
    if(this.nn)
      await this.nn.train(this.data);
  }

  async pauseTraining() {
    if(this.nn)
      await this.nn.pauseTraining();
  }

  async resetTraining(els) {
    await this.pauseTraining();
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
      delete this.vp;
    }
  }

  cleanupPaint() {
    if(this.paint) {
        this.paint.cleanup();
        delete this.paint;
    }
  }
}
