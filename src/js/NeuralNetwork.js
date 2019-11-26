/* jshint esversion: 8*/

export class NeuralNetwork {
  constructor(vp, els) {
    this.els = els;
    this.vp = vp;
    this.createModel();
    this.training = false;
    this.trainedimages = 0;
    this.lastrainedimages = 0;
    this.pausecbs = [];

    this.els.trainingAccuracy.innerHTML = ``;
    this.els.trainingProgress.innerHTML = `${this.trainedimages} images used for training.`;

    this.visualize();
  }

  createModel() {
    //TODO: once UI is finished
    const modelid = "dense"; //TODO document.getElementById("modelid").value;
    const model = this.model = tf.sequential();

    const IMAGE_WIDTH = 28;
    const IMAGE_HEIGHT = 28;
    const IMAGE_CHANNELS = 1;

    if (modelid == "cnn") {
      //CNN
      // In the first layer of our convolutional neural network we have
      // to specify the input shape. Then we specify some parameters for
      // the convolution operation that takes place in this layer.
      model.add(tf.layers.conv2d({
        inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
        kernelSize: 5,
        filters: 8,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));

      // The MaxPooling layer acts as a sort of downsampling using max values
      // in a region instead of averaging.
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));

      // Repeat another conv2d + maxPooling stack.
      // Note that we have more filters in the convolution.
      model.add(tf.layers.conv2d({
        kernelSize: 5,
        filters: 16,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));
      model.add(tf.layers.maxPooling2d({
        poolSize: [2, 2],
        strides: [2, 2]
      }));

      // Now we flatten the output from the 2D filters into a 1D vector to prepare
      // it for input into our last layer. This is common practice when feeding
      // higher dimensional data to a final classification output layer.
      model.add(tf.layers.flatten());
    } else if (modelid == "dense") {
      model.add(
        tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]
        })
      );

      model.add(tf.layers.dense({
        units: 100,
        activation: 'relu',
        kernelInitializer: 'varianceScaling'
      }));
    } else if (modelid == "nohidden") {
      model.add(
        tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]
        })
      );
    }

    // Our last layer is a dense layer which has 10 output units, one for each
    // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).
    const NUM_OUTPUT_CLASSES = 10;
    model.add(tf.layers.dense({
      units: NUM_OUTPUT_CLASSES,
      kernelInitializer: 'varianceScaling',
      activation: 'softmax'
    }));

    const learningRate = 0.001; //TODO Math.pow(10, document.getElementById('learningrate').value);

    // Choose an optimizer, loss function and accuracy metric,
    // then compile and return the model
    const optimizer =
      //TODO document.getElementById('optimizer').value == "adam" ? tf.train.adam(learningRate) : tf.train.sgd(learningRate);
      tf.train.adam(learningRate);

    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  async train(data) {
    this.training = true;
    const model = this.model;
    let trainingcallcnt = 0;
    let trainXs, trainYs;

    while (this.training) {
      //start slower in beginning, increase step size with time
      //for some reasons I do not understand, BATCH_SIZE=1 kills the model
      const BATCH_SIZE = 1 << Math.max(1, Math.min(6, this.trainedimages / 20 | 0)); //a sequence of increasing powers of two
      const TRAIN_DATA_SIZE = BATCH_SIZE * Math.min(8, Math.max(1, this.trainedimages / 40 | 0));
      [trainXs, trainYs] = tf.tidy(() => {
        const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
        return [
          d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
          d.labels
        ];
      });

      await model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        //validationData: [testXs, testYs],
        //epochs: 1,
        //shuffle: true,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {

          },
          onBatchEnd: async (batch, logs) => {
            this.trainedimages += BATCH_SIZE;
            this.els.trainingAccuracy.innerHTML = `Accuracy on current training data: ${(logs.acc * 1000 | 0)/10}%`;
            this.els.trainingProgress.innerHTML = `${this.trainedimages} images used for training.`;
          }
        }
      });
      if ((this.trainedimages > this.lastrainedimages + 1000) || this.trainedimages < 250) {
        this.vp.updateValidationImages(this.model);
        this.vp.updateAccuracy(this.model);
        if ((this.trainedimages < 100)) {
          //sleep some time per image
          await new Promise(resolve => setTimeout(resolve, (1000 / (5 + 4 * this.trainedimages)) * (this.trainedimages - this.lastrainedimages)));
        }
        this.lastrainedimages = this.trainedimages;
      }
      trainingcallcnt++;
    }

    while (this.pausecbs.length > 0) {
      (this.pausecbs.pop())();
    }
  }



  addPauseCallback(cb) {
    this.pausecbs.push(cb);
  }

  pauseTraining() {
    return new Promise(resolve => {
      if (this.training) {
        this.addPauseCallback(resolve);
        this.training = false;
      } else
        resolve();
    });
  }

  async toggleTraining(data) {
    if (this.training)
      await this.pauseTraining();
    else
      this.train(data);
  }

  cleanup() {
    this.model.dispose();

    this.trainedimages = 0;
    this.lastrainedimages = 0;

    while (this.network.firstChild) {
      this.network.removeChild(this.network.firstChild);
    }
  }

  animateVisualization(canvas, ctx) {
    if (this.model && this.trainedimages > this.lastvisualization + Math.min(1000, 0.5 * this.trainedimages)) {
      const HEIGHT = 350;

      function findthreshold(arr, a, b, target) { //binary search to find good
        const m = (a + b) / 2;
        if (b - a < 0.001) {
          return m;
        } else if (arr.filter(x => x * x > m * m).length < target) { //to few elements for threshold=m -> threshold should be smaller than m
          return findthreshold(arr, a, m, target);
        } else { //to many elements
          return findthreshold(arr, m, b, target);
        }
      }

      function drawdenselayer(N, M, weights, x0, y0, width, height) {
        let threshold = findthreshold(weights, 0, 1, 100);
        for (let nodeA = 0; nodeA < N; nodeA++) {
          for (let nodeB = 0; nodeB < M; nodeB++) {
            const val = weights[nodeA * M + nodeB];
            if (val * val > threshold * threshold) {
              ctx.beginPath();
              ctx.globalAlpha = Math.abs(val) * (0.3 / threshold);
              ctx.moveTo(x0, y0 + nodeA * height / N);
              ctx.lineTo(x0 + width, y0 + nodeB * height / M);
              ctx.stroke();
            }
          }
        }
      }

      const weights = this.model.getWeights().map(w => w.dataSync());
      ctx.globalAlpha = 0.1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let nodeA = 0; nodeA < 784; nodeA++) {
        ctx.fillStyle = (Math.random() > 0.8) ? 'white' : 'black';
        ctx.beginPath();
        ctx.arc(10, 10 + nodeA * HEIGHT / 784, 1, 0, 2 * Math.PI, false);
        ctx.fill();
      }
      ctx.strokeStyle = "black";
      drawdenselayer(784, 100, weights[0], 10, 10, 120, HEIGHT);
      ctx.globalAlpha = 1;
      for (let nodeA = 0; nodeA < 100; nodeA++) {
        ctx.beginPath();
        //ctx.globalAlpha = 10*Math.abs(weights[1][nodeA]);
        ctx.arc(130, 10 + nodeA * HEIGHT / 100, 0.5, 0, 2 * Math.PI, false);
        ctx.stroke();
      }

      drawdenselayer(100, 10, weights[2], 130, 10, 120, HEIGHT);

      ctx.globalAlpha = 1;
      for (let nodeA = 0; nodeA < 10; nodeA++) {
        ctx.beginPath();
        //ctx.globalAlpha = 10*Math.abs(weights[3][nodeA]);
        ctx.arc(250, 10 + nodeA * HEIGHT / 10, 5, 0, 2 * Math.PI, false);
        ctx.stroke();
      }

      this.lastvisualization = this.trainedimages;
    }
    requestAnimationFrame(() => this.animateVisualization(canvas, ctx));
  }
  visualize() {
    const canvas = document.createElement("canvas");
    canvas.height = 360;
    canvas.width = 260;
    const ctx = canvas.getContext('2d');
    this.els.network.appendChild(canvas);
    this.lastvisualization = -1;
    this.animateVisualization(canvas, ctx);

  }
}
