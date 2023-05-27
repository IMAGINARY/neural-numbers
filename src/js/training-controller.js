import EventEmitter from 'events';
import NeuralNetwork from './NeuralNetwork';
import TrainingViz from "./training-viz";
import { MnistData } from './MnistData';

/**
 * A class to make a Neural Numbers component trainable.
 */
export default class TrainingController {
  /**
   * Constructor
   *
   * @param {NeuralNumbersComponent} nnComponent
   *  A Neural Numbers component.
   */
  constructor(nnComponent) {
    this.nnComponent = nnComponent;
    this.events = new EventEmitter();

    this.nn = new NeuralNetwork({
      trainingCallback: this.handleTraining.bind(this),
      batchCallback: this.handleBatch.bind(this),
      modelUpdateAsyncCallback: this.handleModelUpdate.bind(this),
    });
    this.data = new MnistData();
    this.trainingViz = new TrainingViz(this);
  }

  /**
   * Initialize the controller.
   *
   * Call this method before using the controller.
   * @returns {Promise<void>}
   */
  async init() {
    await this.data.load();
    this.rebuildNetwork();
  }

  /**
   * Resets the network to its untrained state.
   * @protected
   */
  rebuildNetwork() {
    this.nn.init();
    this.nnComponent.setModel(this.nn.model);
    this.handleModelUpdate(this.nn.model);
  }

  /**
   * Connects the Neural Numbers component to its original fully trained model.
   */
  useDefaultModel() {
    this.nnComponent.setModel();
    this.handleModelUpdate(this.nn.model);
  }

  /**
   * Connects the Neural Numbers component to a new trainable model.
   */
  useTrainableModel() {
    this.rebuildNetwork();
  }

  /**
   * Returns whether the network is currently training.
   * @returns {boolean}
   */
  isTraining() {
    return this.nn.isTraining();
  }

  /**
   * Starts training the network.
   *
   * @returns {Promise<void>}
   * @fires TrainingController.events#start
   * @fires TrainingController.events#batch
   * @fires TrainingController.events#accuracy
   */
  async start() {
    /**
     * Emitted when training starts.
     *
     * @event TrainingController.events#start
     */
    this.events.emit('start');
    await this.nn.train(this.data);
  }

  /**
   * Pauses training the network.
   *
   * @returns {Promise<void>}
   * @fires TrainingController.events#pause
   */
  async pause() {
    await this.nn.pauseTraining();
    /**
     * Emitted when training pauses.
     *
     * @event TrainingController.events#pause
     */
    this.events.emit('pause');
  }

  /**
   * Trains the network for a single step.
   *
   * @returns {Promise<void>}
   * @fires TrainingController.events#batch
   * @fires TrainingController.events#accuracy
   */
  async step() {
    await this.nn.trainSingleStep(this.data);
  }

  /**
   * Resets the network to its untrained state.
   *
   * @returns {Promise<void>}
   */
  async reset() {
    await this.nn.pauseTraining();
    this.rebuildNetwork();
  }

  /**
   * Handles a batch of training images.
   * @private
   * @type {number}
   * @param {number} imageCount
   *  The number of images in the batch.
   */
  handleBatch(imageCount) {
    /**
     * Emitted when a batch of training images is processed.
     *
     * @event TrainingController.events#batch
     * @type {number}
     * @property {number} imageCount
     *  The number of images in the batch.
     */
    this.events.emit('batch', imageCount);
  }

  /**
   * Handles a training step.
   * @private
   * @param trainXs
   * @param trainYs
   * @returns {Promise<void>}
   */
  async handleTraining(trainXs, trainYs) {
    await this.trainingViz.setCurrentTraining(trainXs, trainYs);
  }

  /**
   * Handles a model update.
   * @private
   * @param model
   * @returns {Promise<void>}
   */
  async handleModelUpdate(model) {
    const accuracy = await this.trainingViz.estimateAccuracy(model);
    /**
     * Emitted when the accuracy of the model is estimated.
     *
     * @event TrainingController.events#accuracy
     * @type {number}
     * @property {number} accuracy
     *  The estimated accuracy of the model.
     */
    this.events.emit('accuracy', accuracy);
  }
}
