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
  constructor(nnComponent, props) {
    this.events = new EventEmitter();
    this.nnComponent = nnComponent;

    this.props = Object.assign({}, {
      maxTrainingImages: 60000,
      trainingImagePath: undefined,
      trainingLabelPath: undefined,
    }, props);

    this.nn = new NeuralNetwork({
      trainingCallback: this.handleTraining.bind(this),
      batchCallback: this.handleBatch.bind(this),
      modelUpdateAsyncCallback: this.handleModelUpdate.bind(this),
    });
    this.data = new MnistData(
      this.props.trainingImagePath,
      this.props.trainingLabelPath,
    );
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
    /**
     * Emitted when the network is reset.
     *
     * @event TrainingController.events#reset
     */
    this.events.emit('reset');
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
    if (this.nn.trainedimages >= this.props.maxTrainingImages) {
      return;
    }
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
   * @fires TrainingController.events#pause
   */
  pause() {
    this.nn.pauseTrainingNow();
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
    if (this.nn.trainedimages >= this.props.maxTrainingImages) {
      return;
    }
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
    if (imageCount >= this.props.maxTrainingImages) {
      /**
       * Emitted when training is complete.
       *
       * @event TrainingController.events#training-complete
       */
      this.events.emit('training-complete');
      this.pause();
    }
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
    const accuracy = await this.trainingViz.estimateAccuracy(model, 1000);
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
