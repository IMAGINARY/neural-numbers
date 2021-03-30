/* eslint-disable no-await-in-loop */
/* jshint esversion: 8 */
/* globals tf */

import TrainingVisualization from './TrainingVisualization.js';

export default class NeuralNetwork {
  constructor(vp, els) {
    this.els = els;
    this.vp = vp;
    this.setup();
    this.visualization = new TrainingVisualization(this, els);
  }

  setup(modelid = 'dense', optimizerid = 'adam', learningRate = 0.001, activation = 'relu') {
    // eslint-disable-next-line no-console
    console.log(`Setting up NN model=${modelid} optimizer=${optimizerid} learningrate=${learningRate} activation=${activation}`);
    this.modelid = modelid;
    this.training = false;
    this.trainedimages = 0;
    this.lastrainedimages = 0;
    this.pausecbs = [];

    // this.els.trainingAccuracy.innerHTML = ``;
    this.els.trainingProgress.innerHTML = this.trainedimages;

    // delete old model if it has been existing
    if (this.model) {
      this.model.dispose();
    }

    // create model
    this.model = tf.sequential();
    const { model } = this;

    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1;

    if (modelid === 'cnn') {
      // CNN
      // In the first layer of our convolutional neural network we have
      // to specify the input shape. Then we specify some parameters for
      // the convolution operation that takes place in this layer.
      model.add(tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation,
        kernelInitializer: 'varianceScaling',
      }));

      // The MaxPooling layer acts as a sort of downsampling using max values
      // in a region instead of averaging.
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2],
      }));

      // Repeat another conv2d + maxPooling stack.
      // Note that we have more filters in the convolution.
      model.add(tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation,
        kernelInitializer: 'varianceScaling',
      }));
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2],
      }));

      // Now we flatten the output from the 2D filters into a 1D vector to prepare
      // it for input into our last layer. This is common practice when feeding
      // higher dimensional data to a final classification output layer.
      model.add(tf.layers.flatten());
    } else if (modelid === 'dense') {
      model.add(
        tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        })
      );

      model.add(tf.layers.dense({
        units: 100,
        activation,
        kernelInitializer: 'varianceScaling',
      }));
    } else if (modelid === 'nohidden') {
      model.add(
        tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        })
      );
    }

    // Our last layer is a dense layer which has 10 output units, one for each
    // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
    const NUM_OUTPUT_CLASSES = 10;
    model.add(tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax',
    }));

    // Choose an optimizer, loss function and accuracy metric,
    // then compile and return the model
    const optimizer = (optimizerid === 'adam') ? tf.train.adam(learningRate) : tf.train.sgd(learningRate);
    // tf.train.adam(learningRate);

    model.compile({
      optimizer,
      loss: 'categoricalCrossentropy',
      // optimizer: 'sgd',
      // loss: 'meanSquaredError',
      metrics: ['accuracy'],
    });

    return model;
  }

  async trainByBatchFromData(data, TRAIN_DATA_SIZE, BATCH_SIZE) {
    if (TRAIN_DATA_SIZE === 1 || BATCH_SIZE === 1) {
      tf.setBackend('cpu');
      // fitting with single training-data results in NaNs when WebGL-backend is used
      // for unknown reasons. Unfortunately, mixing cpu ang webgl backend changes the
      // training in some way: Way more input images are required to obtain same accuracy
    }
    const { model } = this;
    const [trainXs, trainYs] = tf.tidy(() => {
      const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
      return [
        d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
        d.labels,
      ];
    });

    await this.visualization.setCurrentTraining(trainXs, trainYs);

    await model.fit(trainXs, trainYs, {
      batchSize: BATCH_SIZE,
      callbacks: {
        onEpochEnd: async () => {},
        onBatchEnd: async () => {
          this.trainedimages += BATCH_SIZE;
          // this.els.trainingAccuracy.innerHTML =
          //  `Accuracy on current training data: ${(logs.acc * 1000 | 0)/10}%`;
          this.els.trainingProgress.innerHTML = this.trainedimages;
        },
      },
    });
    tf.dispose(trainXs);
    tf.dispose(trainYs);

    if (TRAIN_DATA_SIZE === 1 || BATCH_SIZE === 1) {
      tf.setBackend('webgl');
      // fitting with single training-data results in NaNs when WebGL-backend
      // is used for unknown reasons
    }
  }

  async trainSingleStep(data) {
    await this.trainByBatchFromData(data, 1, 1);
    this.vp.updateValidationImages(this.model);
    this.vp.updateAccuracy(this.model);
  }

  async train(data) {
    this.training = true;

    while (this.training) {
      // start slower in beginning, increase step size with time
      // const BATCH_SIZE = 1 << (Math.max(4, Math.min(8, this.trainedimages / 20 | 0)));
      // a sequence of increasing powers of two

      // a constant BATCH_SIZE and TRAIN_DATA_SIZE increases the speed of convergence :/.
      const BATCH_SIZE = 32;
      const TRAIN_DATA_SIZE = 32; // *Math.min(8, Math.max(1, this.trainedimages / 40 | 0));

      await this.trainByBatchFromData(data, BATCH_SIZE, TRAIN_DATA_SIZE);

      if (this.trainedimages
        > this.lastrainedimages + Math.min(1000, 0.3 * this.trainedimages)
        || this.trainedimages < 250) {
        this.vp.updateValidationImages(this.model);
        this.vp.updateAccuracy(this.model);
        if ((this.trainedimages < 100)) {
          // sleep some time per image
          await new Promise(resolve => setTimeout(
            resolve,
            (1000 / (5 + 4 * this.trainedimages)) * (this.trainedimages - this.lastrainedimages)
          ));
        }
        this.lastrainedimages = this.trainedimages;
      }
    }

    while (this.pausecbs.length > 0) {
      (this.pausecbs.pop())();
    }
  }

  addPauseCallback(cb) {
    this.pausecbs.push(cb);
  }

  pauseTraining() {
    return new Promise((resolve) => {
      if (this.training) {
        this.addPauseCallback(resolve);
        this.training = false;
      } else {
        resolve();
      }
    });
  }

  async toggleTraining(data) {
    if (this.training) {
      await this.pauseTraining();
    } else {
      await this.train(data);
    }
  }

  cleanup() {
    this.model.dispose();
    this.trainedimages = 0;
    this.lastrainedimages = 0;
  }
}
