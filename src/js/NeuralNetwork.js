/* jshint esversion: 8*/

//import {
//  updateLiveValidationImages
//} from './script.js';

export class NeuralNetwork {
  constructor(vp) {
    this.vp = vp;
    //for some output TODO: include this at appropiate place in HTML.
    let div = this.div = [];
    for (let i = 0; i < 4; i++) {
      div[i] = document.createElement('div');
      document.body.appendChild(div[i]);
    }

    this.createModel();

    this.training = true;
  }

  toggleTraining() {
    this.training = !this.training;
  }

  createModel() {
    //TODO: once UI is finished
    const modelid = "dense"; //TODO document.getElementById("modelid").value;
    console.log(modelid);
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

    console.log(optimizer);
    model.compile({
      optimizer: optimizer,
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    });

    return model;
  }

  async train(data) {
    const model = this.model;

    let trainingcallcnt = 0;

    const TEST_DATA_SIZE = 1000;

    let testXs, testYs, trainXs, trainYs;

    [testXs, testYs] = tf.tidy(() => {
      const d = data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });

    while (this.training) {
      const BATCH_SIZE = 16; //document.getElementById("BATCH_SIZE").value | 0;
      //const TRAIN_DATA_SIZE = 5500;
      const TRAIN_DATA_SIZE = BATCH_SIZE * 16;


      [trainXs, trainYs] = tf.tidy(() => {
        const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
        return [
          d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]),
          d.labels
        ];
      });



      let div = this.div; //TODO replace with some proper UI


      await model.fit(trainXs, trainYs, {
        batchSize: BATCH_SIZE,
        //validationData: [testXs, testYs],
        //epochs: 1,
        //shuffle: true,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            //TODO connect with proper UI
            //div[0].innerHTML = `Accuracy on validation data: ${logs.val_acc}`;
            //div[1].innerHTML = `Accuracy on training data: ${logs.acc}`;

          },
          onBatchEnd: async (batch, logs) => {
            div[1].innerHTML = `Accuracy on current training data: ${(logs.acc * 1000 | 0)/10}%`;
            div[2].innerHTML = `${trainingcallcnt*TRAIN_DATA_SIZE +batch*BATCH_SIZE} images used for training.`;
            div[3].innerHTML = `${trainingcallcnt}-th training call.`;
            if (batch % 20 == 0)
              div[0].innerHTML = `Accuracy on validation data: ${(await model.evaluate(testXs,testYs)[1].dataSync() * 1000 | 0)/10}%`;
            this.vp.updateValidationImages(this.model);
          }
        }
      });
      trainingcallcnt++;
    }
  }
}
