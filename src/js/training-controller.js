import EventEmitter from 'events';
import NeuralNetwork from './NeuralNetwork';
import { MnistData } from './MnistData';

export default class TrainingController {
  constructor(nnComponent) {
    this.nnComponent = nnComponent;
    this.events = new EventEmitter();

    this.nn = new NeuralNetwork({
      batchCallback: this.handleBatch.bind(this),
    });
    this.data = new MnistData();
  }

  async init() {
    await this.data.load();
    this.rebuildNetwork();
  }

  rebuildNetwork() {
    this.nn.init();
    this.nnComponent.setModel(this.nn.model);
  }

  isTraining() {
    return this.nn.isTraining();
  }

  async start() {
    this.events.emit('start');
    await this.nn.train(this.data);
  }

  async pause() {
    await this.nn.pauseTraining();
    this.events.emit('pause');
  }

  async step() {
    await this.nn.trainSingleStep(this.data);
  }

  async reset() {
    await this.nn.pauseTraining();
    this.rebuildNetwork();
  }

  handleBatch(imageCount) {
    this.events.emit('batch', imageCount);
  }
}
