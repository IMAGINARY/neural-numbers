/* globals tf */
import Paint from './Paint';
import View from './View';
import { MnistData } from './MnistData';
import NeuralNetwork from './NeuralNetwork';
import ValidationPreview from './ValidationPreview';
import { LAST_TRAIN_STEP_TIMEOUT } from './constants';

export default class Controller {
  constructor() {
    this.view = new View(this);
    this.data = new MnistData();
    this.dataloaded = false;
    this.testpaint = true;
  }

  async initIntroPaint(paintel) {
    if (!this.trainedmodel) {
      this.trainedmodel = await tf.loadLayersModel('assets/models/my-model.json');
    }
    this.paint = new Paint(paintel, this.trainedmodel, 0.5);
  }

  async loadData() {
    if (!this.trainedmodel) {
      this.trainedmodel = await tf.loadLayersModel('assets/models/my-model.json');
    }
    if (!this.dataloaded) {
      await this.data.load();
      this.dataloaded = true;
    }
  }

  async initTrainingEnvironment(els) {
    await this.loadData();
    this.vp = new ValidationPreview(this.data, els);
    this.nn = new NeuralNetwork(this.vp, els);
    this.paint = new Paint(els.paint, this.nn.model, 0, this.nn.visualization);
    await this.vp.initValidationImages(els);
    // this.nn might have been deleted because in the meanwhile the slide has been skipped
    if (this.nn) {
      this.vp.updateValidationImages(this.nn.model);
      this.vp.updateAccuracy(this.nn.model);
    }
  }

  resetNetwork(modelid, optimizerid, learningRate, activation) {
    this.nn.setup(modelid, optimizerid, learningRate, activation);
    this.paint.model = this.nn.model;
  }

  async startTraining() {
    this.clearDelayedTrainStepPreview();
    this.testpaint = false;
    if (this.nn) {
      await this.nn.train(this.data);
    }
  }

  async pauseTraining(cb) {
    if (this.nn) {
      await this.nn.pauseTraining();
      this.delayedTrainStepPreview(cb);
    }
  }

  async singleStep(cb) {
    if (this.nn) {
      this.testpaint = false;
      await this.nn.trainSingleStep(this.data);
      this.delayedTrainStepPreview(cb);
    }
  }

  async resetTraining(els) {
    await this.pauseTraining();
    this.cleanupValidationPreview();
    this.cleanupPaint();
    this.cleanupNetwork();
    await this.initTrainingEnvironment(els);
    this.testpaint = true;
  }

  delayedTrainStepPreview(cb) {
    this.clearDelayedTrainStepPreview();
    this.traintimeout = setTimeout(() => {
      this.testpaint = true;
      if (this.paint) this.paint.predict();
      if (cb) cb();
    }, LAST_TRAIN_STEP_TIMEOUT * 1000);
  }

  clearDelayedTrainStepPreview() {
    if (this.traintimeout) {
      clearTimeout(this.traintimeout);
    }
  }

  toggleTraining(cb) {
    this.clearDelayedTrainStepPreview();
    if (this.nn) {
      this.nn.toggleTraining(this.data);
      this.testpaint = false;
      if (!this.nn.training) {
        this.delayedTrainStepPreview(cb);
      }
    }
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
    if (this.paint) {
      this.paint.cleanup();
      delete this.paint;
    }
  }

  addAccuracyCallback(acc, cb) {
    this.vp.addAccuracyCallback(acc, cb);
  }
}
