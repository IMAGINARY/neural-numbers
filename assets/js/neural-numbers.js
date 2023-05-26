(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BarChart = /*#__PURE__*/function () {
  function BarChart(el) {
    _classCallCheck(this, BarChart);

    this.el = el; // cleanup potentially previously existing bars

    this.cleanup();
    this.bars = [];

    for (var i = 0; i < 10; i += 1) {
      var cbarcontainer = document.createElement('div');
      cbarcontainer.className = 'barcontainer';
      this.bars[i] = document.createElement('div');
      this.bars[i].classList.add('bar');
      var cbartext = document.createElement('div');
      cbartext.className = 'bartxt';
      cbartext.innerHTML = "".concat(i);
      cbarcontainer.appendChild(this.bars[i]);
      cbarcontainer.appendChild(cbartext);
      this.el.appendChild(cbarcontainer);
    }
  }

  _createClass(BarChart, [{
    key: "cleanup",
    value: function cleanup() {
      while (this.el.firstChild) {
        this.el.removeChild(this.el.firstChild);
      }
    }
  }, {
    key: "update",
    value: function update(probabilities) {
      var highlighted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;

      for (var i = 0; i < 10; i += 1) {
        this.bars[i].dataset.probability = probabilities[i];
        this.bars[i].style = "--probability: ".concat(probabilities[i]);
        this.bars[i].classList.toggle('highlighted', i === highlighted);
      }
    }
  }]);

  return BarChart;
}();

exports["default"] = BarChart;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MnistData = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
var IMAGE_SIZE = 784;
var NUM_CLASSES = 10;
var NUM_DATASET_ELEMENTS = 65000;
var NUM_TRAIN_ELEMENTS = NUM_DATASET_ELEMENTS * 0.8 | 0; //80% TODO make this custoumizeable

var NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;
var MNIST_IMAGES_SPRITE_PATH = 'assets/mnist/mnist_images.png';
var MNIST_LABELS_PATH = 'assets/mnist/mnist_labels_uint8';
/**
 * A class that fetches the sprited MNIST dataset and returns shuffled batches.
 *
 * NOTE: This will get much easier. For now, we do data fetching and
 * manipulation manually.
 */

var MnistData = /*#__PURE__*/function () {
  function MnistData() {
    _classCallCheck(this, MnistData);

    this.shuffledTrainIndex = 0;
    this.shuffledTestIndex = 0;
  }

  _createClass(MnistData, [{
    key: "load",
    value: function () {
      var _load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var img, canvas, ctx, imgRequest, labelsRequest, _yield$Promise$all, _yield$Promise$all2, imgResponse, labelsResponse;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Make a request for the MNIST sprited image.
                img = new Image();
                canvas = document.createElement('canvas');
                ctx = canvas.getContext('2d', {
                  willReadFrequently: true
                });
                imgRequest = new Promise(function (resolve, reject) {
                  img.crossOrigin = '';

                  img.onload = function () {
                    img.width = img.naturalWidth;
                    img.height = img.naturalHeight;
                    var datasetBytesBuffer = new ArrayBuffer(NUM_DATASET_ELEMENTS * IMAGE_SIZE * 4);
                    var chunkSize = 5000;
                    canvas.width = img.width;
                    canvas.height = chunkSize;

                    for (var i = 0; i < NUM_DATASET_ELEMENTS / chunkSize; i++) {
                      var datasetBytesView = new Float32Array(datasetBytesBuffer, i * IMAGE_SIZE * chunkSize * 4, IMAGE_SIZE * chunkSize);
                      ctx.drawImage(img, 0, i * chunkSize, img.width, chunkSize, 0, 0, img.width, chunkSize);
                      var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                      for (var j = 0; j < imageData.data.length / 4; j++) {
                        // All channels hold an equal value since the image is grayscale, so
                        // just read the red channel.
                        datasetBytesView[j] = imageData.data[j * 4] / 255;
                      }
                    }

                    _this.datasetImages = new Float32Array(datasetBytesBuffer);
                    resolve();
                  };

                  img.src = MNIST_IMAGES_SPRITE_PATH;
                });
                labelsRequest = fetch(MNIST_LABELS_PATH);
                _context.next = 7;
                return Promise.all([imgRequest, labelsRequest]);

              case 7:
                _yield$Promise$all = _context.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
                imgResponse = _yield$Promise$all2[0];
                labelsResponse = _yield$Promise$all2[1];
                _context.t0 = Uint8Array;
                _context.next = 14;
                return labelsResponse.arrayBuffer();

              case 14:
                _context.t1 = _context.sent;
                this.datasetLabels = new _context.t0(_context.t1);
                // Create shuffled indices into the train/test set for when we select a
                // random dataset element for training / validation.
                this.trainIndices = tf.util.createShuffledIndices(NUM_TRAIN_ELEMENTS);
                this.testIndices = tf.util.createShuffledIndices(NUM_TEST_ELEMENTS); // Slice the the images and labels into train and test sets.

                this.trainImages = this.datasetImages.slice(0, IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
                this.testImages = this.datasetImages.slice(IMAGE_SIZE * NUM_TRAIN_ELEMENTS);
                this.trainLabels = this.datasetLabels.slice(0, NUM_CLASSES * NUM_TRAIN_ELEMENTS);
                this.testLabels = this.datasetLabels.slice(NUM_CLASSES * NUM_TRAIN_ELEMENTS);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load() {
        return _load.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: "nextTrainBatch",
    value: function nextTrainBatch(batchSize) {
      var _this2 = this;

      return this.nextBatch(batchSize, [this.trainImages, this.trainLabels], function () {
        _this2.shuffledTrainIndex = (_this2.shuffledTrainIndex + 1) % _this2.trainIndices.length;
        return _this2.trainIndices[_this2.shuffledTrainIndex];
      });
    }
  }, {
    key: "nextTestBatch",
    value: function nextTestBatch(batchSize) {
      var _this3 = this;

      return this.nextBatch(batchSize, [this.testImages, this.testLabels], function () {
        _this3.shuffledTestIndex = (_this3.shuffledTestIndex + 1) % _this3.testIndices.length;
        return _this3.testIndices[_this3.shuffledTestIndex];
      });
    }
  }, {
    key: "nextBatch",
    value: function nextBatch(batchSize, data, index) {
      var batchImagesArray = new Float32Array(batchSize * IMAGE_SIZE);
      var batchLabelsArray = new Uint8Array(batchSize * NUM_CLASSES);

      for (var i = 0; i < batchSize; i++) {
        var idx = index();
        var image = data[0].slice(idx * IMAGE_SIZE, idx * IMAGE_SIZE + IMAGE_SIZE);
        batchImagesArray.set(image, i * IMAGE_SIZE);
        var label = data[1].slice(idx * NUM_CLASSES, idx * NUM_CLASSES + NUM_CLASSES);
        batchLabelsArray.set(label, i * NUM_CLASSES);
      }

      var xs = tf.tensor2d(batchImagesArray, [batchSize, IMAGE_SIZE]);
      var labels = tf.tensor2d(batchLabelsArray, [batchSize, NUM_CLASSES]);
      return {
        xs: xs,
        labels: labels
      };
    }
  }]);

  return MnistData;
}();

exports.MnistData = MnistData;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-await-in-loop */

/* jshint esversion: 8 */

/* globals tf */
var NeuralNetwork = /*#__PURE__*/function () {
  function NeuralNetwork(options) {
    _classCallCheck(this, NeuralNetwork);

    this.options = Object.assign({}, {
      trainingCallback: null,
      batchCallback: null,
      modelUpdateCallback: null
    }, options);
    this.training = false;
    this.init();
  }

  _createClass(NeuralNetwork, [{
    key: "init",
    value: function init() {
      var modelid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dense';
      var optimizerid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'adam';
      var learningRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.001;
      var activation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'relu';
      // eslint-disable-next-line no-console
      console.log("Setting up NN model=".concat(modelid, " optimizer=").concat(optimizerid, " learningrate=").concat(learningRate, " activation=").concat(activation));
      this.modelid = modelid;
      this.trainedimages = 0;
      this.lastrainedimages = 0;
      this.pausecbs = [];

      if (this.options.batchCallback) {
        this.options.batchCallback(this.trainedimages);
      } // delete old model if it has been existing


      if (this.model) {
        this.model.dispose();
      } // create model


      this.model = tf.sequential();
      var model = this.model;
      var IMAGE_WIDTH = 28;
      var IMAGE_HEIGHT = 28;
      var IMAGE_CHANNELS = 1;

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
          activation: activation,
          kernelInitializer: 'varianceScaling'
        })); // The MaxPooling layer acts as a sort of downsampling using max values
        // in a region instead of averaging.

        model.add(tf.layers.maxPooling2d({
          poolSize: [2, 2],
          strides: [2, 2]
        })); // Repeat another conv2d + maxPooling stack.
        // Note that we have more filters in the convolution.

        model.add(tf.layers.conv2d({
          kernelSize: 5,
          filters: 16,
          strides: 1,
          activation: activation,
          kernelInitializer: 'varianceScaling'
        }));
        model.add(tf.layers.maxPooling2d({
          poolSize: [2, 2],
          strides: [2, 2]
        })); // Now we flatten the output from the 2D filters into a 1D vector to prepare
        // it for input into our last layer. This is common practice when feeding
        // higher dimensional data to a final classification output layer.

        model.add(tf.layers.flatten());
      } else if (modelid === 'dense') {
        model.add(tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]
        }));
        model.add(tf.layers.dense({
          units: 100,
          activation: activation,
          kernelInitializer: 'varianceScaling'
        }));
      } else if (modelid === 'nohidden') {
        model.add(tf.layers.flatten({
          inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS]
        }));
      } // Our last layer is a dense layer which has 10 output units, one for each
      // output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9).


      var NUM_OUTPUT_CLASSES = 10;
      model.add(tf.layers.dense({
        units: NUM_OUTPUT_CLASSES,
        kernelInitializer: 'varianceScaling',
        activation: 'softmax'
      })); // Choose an optimizer, loss function and accuracy metric,
      // then compile and return the model

      var optimizer = optimizerid === 'adam' ? tf.train.adam(learningRate) : tf.train.sgd(learningRate); // tf.train.adam(learningRate);

      model.compile({
        optimizer: optimizer,
        loss: 'categoricalCrossentropy',
        // optimizer: 'sgd',
        // loss: 'meanSquaredError',
        metrics: ['accuracy']
      });
      return model;
    }
  }, {
    key: "trainByBatchFromData",
    value: function () {
      var _trainByBatchFromData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, TRAIN_DATA_SIZE, BATCH_SIZE) {
        var _this = this;

        var model, _tf$tidy, _tf$tidy2, trainXs, trainYs;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (TRAIN_DATA_SIZE === 1 || BATCH_SIZE === 1) {
                  tf.setBackend('cpu'); // fitting with single training-data results in NaNs when WebGL-backend is used
                  // for unknown reasons. Unfortunately, mixing cpu ang webgl backend changes the
                  // training in some way: Way more input images are required to obtain same accuracy
                }

                model = this.model;
                _tf$tidy = tf.tidy(function () {
                  var d = data.nextTrainBatch(TRAIN_DATA_SIZE);
                  return [d.xs.reshape([TRAIN_DATA_SIZE, 28, 28, 1]), d.labels];
                }), _tf$tidy2 = _slicedToArray(_tf$tidy, 2), trainXs = _tf$tidy2[0], trainYs = _tf$tidy2[1];

                if (!this.options.trainingCallback) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 6;
                return this.options.trainingCallback(trainXs, trainYs);

              case 6:
                _context3.next = 8;
                return model.fit(trainXs, trainYs, {
                  batchSize: BATCH_SIZE,
                  callbacks: {
                    onEpochEnd: function () {
                      var _onEpochEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                        return regeneratorRuntime.wrap(function _callee$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _callee);
                      }));

                      function onEpochEnd() {
                        return _onEpochEnd.apply(this, arguments);
                      }

                      return onEpochEnd;
                    }(),
                    onBatchEnd: function () {
                      var _onBatchEnd = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                        return regeneratorRuntime.wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _this.trainedimages += BATCH_SIZE;

                                if (_this.options.batchCallback) {
                                  _this.options.batchCallback(_this.trainedimages);
                                }

                              case 2:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2);
                      }));

                      function onBatchEnd() {
                        return _onBatchEnd.apply(this, arguments);
                      }

                      return onBatchEnd;
                    }()
                  }
                });

              case 8:
                tf.dispose(trainXs);
                tf.dispose(trainYs);

                if (TRAIN_DATA_SIZE === 1 || BATCH_SIZE === 1) {
                  tf.setBackend('webgl'); // fitting with single training-data results in NaNs when WebGL-backend
                  // is used for unknown reasons
                }

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function trainByBatchFromData(_x, _x2, _x3) {
        return _trainByBatchFromData.apply(this, arguments);
      }

      return trainByBatchFromData;
    }()
  }, {
    key: "trainSingleStep",
    value: function () {
      var _trainSingleStep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.trainByBatchFromData(data, 1, 1);

              case 2:
                if (this.options.modelUpdateCallback) {
                  this.options.modelUpdateCallback(this.model);
                }

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function trainSingleStep(_x4) {
        return _trainSingleStep.apply(this, arguments);
      }

      return trainSingleStep;
    }()
  }, {
    key: "train",
    value: function () {
      var _train = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(data) {
        var _this2 = this;

        var BATCH_SIZE, TRAIN_DATA_SIZE;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this.training = true;

              case 1:
                if (!this.training) {
                  _context5.next = 14;
                  break;
                }

                // start slower in beginning, increase step size with time
                // const BATCH_SIZE = 1 << (Math.max(4, Math.min(8, this.trainedimages / 20 | 0)));
                // a sequence of increasing powers of two
                // a constant BATCH_SIZE and TRAIN_DATA_SIZE increases the speed of convergence :/.
                BATCH_SIZE = 32;
                TRAIN_DATA_SIZE = 32; // *Math.min(8, Math.max(1, this.trainedimages / 40 | 0));

                _context5.next = 6;
                return this.trainByBatchFromData(data, BATCH_SIZE, TRAIN_DATA_SIZE);

              case 6:
                if (!(this.trainedimages > this.lastrainedimages + Math.min(1000, 0.3 * this.trainedimages) || this.trainedimages < 250)) {
                  _context5.next = 12;
                  break;
                }

                if (this.options.modelUpdateCallback) {
                  this.options.modelUpdateCallback(this.model);
                }

                if (!(this.trainedimages < 100)) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 11;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 1000 / (5 + 4 * _this2.trainedimages) * (_this2.trainedimages - _this2.lastrainedimages));
                });

              case 11:
                this.lastrainedimages = this.trainedimages;

              case 12:
                _context5.next = 1;
                break;

              case 14:
                while (this.pausecbs.length > 0) {
                  this.pausecbs.pop()();
                }

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function train(_x5) {
        return _train.apply(this, arguments);
      }

      return train;
    }()
  }, {
    key: "addPauseCallback",
    value: function addPauseCallback(cb) {
      this.pausecbs.push(cb);
    }
  }, {
    key: "pauseTraining",
    value: function pauseTraining() {
      var _this3 = this;

      return new Promise(function (resolve) {
        if (_this3.training) {
          _this3.addPauseCallback(resolve);

          _this3.training = false;
        } else {
          resolve();
        }
      });
    }
  }, {
    key: "isTraining",
    value: function isTraining() {
      return this.training;
    }
  }, {
    key: "toggleTraining",
    value: function () {
      var _toggleTraining = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(data) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.training) {
                  _context6.next = 5;
                  break;
                }

                _context6.next = 3;
                return this.pauseTraining();

              case 3:
                _context6.next = 7;
                break;

              case 5:
                _context6.next = 7;
                return this.train(data);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function toggleTraining(_x6) {
        return _toggleTraining.apply(this, arguments);
      }

      return toggleTraining;
    }()
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.model.dispose();
      this.trainedimages = 0;
      this.lastrainedimages = 0;
    }
  }]);

  return NeuralNetwork;
}();

exports["default"] = NeuralNetwork;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BarChart = _interopRequireDefault(require("./BarChart.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCALE_FACTOR = 9;
var LINEWIDTH = 2 * SCALE_FACTOR;

var Paint = /*#__PURE__*/function () {
  function Paint(el, model, outputThreshold) {
    var nwvis = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var clearTimeoutTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2.2;

    _classCallCheck(this, Paint);

    this.clearTimeoutTime = clearTimeoutTime;
    this.drawingChanged = true;
    this.model = model;
    this.nwvis = nwvis;
    this.outputThreshold = outputThreshold; // last known position

    this.pos = {
      x: 0,
      y: 0
    };
    this.createUI(el);
    this.empty = true;
    this.isdown = false;
    this.pointerId = -1;
  }

  _createClass(Paint, [{
    key: "addEventListeners",
    value: function addEventListeners() {
      var _this = this;

      this.eventfunctions = {
        pointerdown: function pointerdown(e) {
          if (!_this.isdown) {
            _this.removeClearTimeout();

            _this.setPosition(e);

            _this.isdown = true;
            _this.pointerId = e.pointerId;
          }
        },
        pointermove: function pointermove(e) {
          if (_this.isdown && _this.pointerId === e.pointerId) _this.draw(e);
        },
        pointerup: function pointerup(e) {
          if (_this.pointerId === e.pointerId) {
            _this.setClearTimeout();

            _this.isdown = false;
          }
        },
        pointerleave: function pointerleave(e) {
          if (_this.pointerId === e.pointerId) {
            _this.setClearTimeout();

            _this.isdown = false;
          }
        },
        pointercancel: function pointercancel(e) {
          if (_this.pointerId === e.pointerId) {
            _this.setClearTimeout();

            _this.isdown = false;
          }
        }
      };

      for (var eventname in this.eventfunctions) {
        this.drawcanvas.addEventListener(eventname, this.eventfunctions[eventname], {
          passive: true
        });
      }
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      for (var eventname in this.eventfunctions) {
        this.drawcanvas.removeEventListener(eventname, this.eventfunctions[eventname]);
      }
    }
  }, {
    key: "createUI",
    value: function createUI(el) {
      var _this2 = this;

      this.drawcanvas = el.querySelector('.drawcanvas');
      this.normalizecanvas = el.querySelector('.normalizecanvas') || document.createElement('canvas');
      this.outputbars = el.querySelector('.bars');
      this.outputdigit = el.querySelector('.digit');
      this.inputbox = el.querySelector('.input.box');
      this.addEventListeners();
      var normalizecanvas = this.normalizecanvas,
          drawcanvas = this.drawcanvas;
      normalizecanvas.width = 28;
      normalizecanvas.height = 28;

      var updateDimensions = function updateDimensions() {
        SCALE_FACTOR = Math.floor(_this2.drawcanvas.clientWidth / 28) - 1;
        LINEWIDTH = 2 * SCALE_FACTOR;
        drawcanvas.width = _this2.drawcanvas.clientWidth;
        drawcanvas.height = _this2.drawcanvas.clientWidth;
      };

      updateDimensions();

      window.onresize = function () {
        updateDimensions();
      };

      this.drawcontext = this.drawcanvas.getContext('2d', {
        willReadFrequently: true
      });
      this.normalizecontext = this.normalizecanvas.getContext('2d', {
        willReadFrequently: true
      }); // const { drawcontext, normalizecontext } = this;
      //  normalizecanvas.style.width = 28 * SCALE_FACTOR + 'px';
      //  normalizecanvas.style.height = 28 * SCALE_FACTOR + 'px';
      //  normalizecanvas.style.imageRendering = 'pixelated';

      /*
          const resetbutton = document.createElement("button");
          this.resetbutton = resetbutton;
          this.resetbutton.style.visibility = 'hidden';
           resetbutton.innerHTML = "reset";
          resetbutton.addEventListener('click', () => {
            this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
            this.normalize(100);
            this.predict();
            this.resetbutton.style.visibility = 'hidden';
          });
           this.drawcanvas.parentNode.insertBefore(resetbutton, this.drawcanvas);
          this.resetbutton.style.position = "absolute";
          this.resetbutton.style.zIndex = 10;
      */

      if (this.outputbars) {
        this.barchart = new _BarChart["default"](this.outputbars);
      }

      this.clear();
    }
  }, {
    key: "setPosition",
    value: function setPosition(e) {
      var rect = this.drawcanvas.getBoundingClientRect();
      this.pos.x = e.clientX - rect.left;
      this.pos.y = e.clientY - rect.top;
      return true;
    }
  }, {
    key: "removeClearTimeout",
    value: function removeClearTimeout() {
      if (this.clearTimeout) {
        clearTimeout(this.clearTimeout);
      }

      return true;
    }
  }, {
    key: "setClearTimeout",
    value: function setClearTimeout() {
      var _this3 = this;

      this.removeClearTimeout(); // remove previous clearTimeouts
      // clean up everything after specified time

      this.clearTimeout = setTimeout(function () {
        _this3.clear();
      }, this.clearTimeoutTime * 1000);
      return true;
    }
  }, {
    key: "draw",
    value: function draw(e) {
      this.removeClearTimeout();
      var ox = this.pos.x;
      var oy = this.pos.y;
      this.setPosition(e);
      var nx = this.pos.x;
      var ny = this.pos.y;

      if (Math.abs(nx - ox) + Math.abs(ny - oy) < 3) {
        this.pos.x = ox;
        this.pos.y = oy;
        return;
      }

      this.inputbox.classList.remove('background');
      this.empty = false;
      this.drawcontext.beginPath(); // begin

      this.drawcontext.lineWidth = LINEWIDTH;
      this.drawcontext.lineCap = 'round';
      this.drawcontext.strokeStyle = 'white';
      this.drawcontext.moveTo(ox, oy); // from

      this.setPosition(e);
      this.drawcontext.lineTo(nx, ny); // to

      this.drawcontext.stroke(); // draw it!

      this.normalizecontext.fillStyle = 'black';
      this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
      this.drawingChanged = true;
      this.normalize(LINEWIDTH);
      this.predict(); // this.resetbutton.style.visibility = 'visible';
    } // normalize image

  }, {
    key: "normalize",
    value: function normalize(SKIPFACTOR) {
      var centerx = 0;
      var centery = 0;
      var top = 1000;
      var bottom = -1000;
      var left = 1000;
      var right = -1000;
      var imgData = this.drawcontext.getImageData(0, 0, this.drawcanvas.width, this.drawcanvas.height);
      var data = imgData.data;
      var totalweight = 0;

      for (var i = 0; i < data.length; i += 4 * SKIPFACTOR) {
        var x = i / 4 % this.drawcanvas.width;
        var y = i / 4 / this.drawcanvas.width | 0;
        totalweight += data[i];
        centerx += data[i] * x;
        centery += data[i] * y;

        if (data[i] > 0) {
          top = Math.min(top, y);
          bottom = Math.max(bottom, y);
          left = Math.min(left, x);
          right = Math.max(right, x);
        }
      }

      if (totalweight > 0) {
        centerx /= totalweight;
        centery /= totalweight;
        var boxsize = Math.max(right - left, bottom - top); // according to MNIST normalization:

        /*
        The original black and white (bilevel) images from NIST were size normalized
        to fit in a 20x20 pixel box while preserving their aspect ratio. The
        resulting images contain grey levels as a result of the anti-aliasing
        technique used by the normalization algorithm. the images were centered
        in a 28x28 image by computing the center of mass of the pixels, and
        translating the image so as to position this point at the center of the 28x28 field.
        */

        this.normalizecontext.drawImage(this.drawcanvas, left, top, boxsize, boxsize, 14 + 20 / boxsize * (left - centerx), 14 + 20 / boxsize * (top - centery), 20, 20);
      } else {
        this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
      }

      return true;
    }
  }, {
    key: "predict",
    value: function predict() {
      var _this4 = this;

      if (this.model && this.normalizecanvas && this.drawingChanged) {
        // && newFrame rendered TODO?
        var _tf$tidy = tf.tidy(function () {
          var imageTensor = tf.browser.fromPixels(_this4.normalizecanvas, 1).toFloat().mul(tf.scalar(1 / 255)).clipByValue(0, 1).reshape([1, 28, 28, 1]);

          if (_this4.nwvis) {
            _this4.nwvis.show(imageTensor, _this4.normalizecontext.getImageData(0, 0, _this4.normalizecanvas.width, _this4.normalizecanvas.height).data.filter(function (d, k) {
              return k % 4 === 0;
            }));
          }

          var result = _this4.model.predict(imageTensor);

          return [result.dataSync(), result.argMax([-1]).dataSync()];
        }),
            _tf$tidy2 = _slicedToArray(_tf$tidy, 2),
            probabilities = _tf$tidy2[0],
            predicted = _tf$tidy2[1];

        if (this.barchart) {
          this.barchart.update(probabilities, predicted);
        }

        if (this.outputdigit) {
          this.outputdigit.innerHTML = !this.empty && probabilities[predicted] > this.outputThreshold ? predicted : '?';
          this.outputdigit.parentElement.classList.toggle('solved', probabilities[predicted] > this.outputThreshold);
        }
      }

      return true;
    }
  }, {
    key: "swapModel",
    value: function swapModel(model) {
      this.model = model;
      this.predict();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
      this.empty = true;
      this.normalize(100);
      this.predict();
      this.inputbox.classList.add('background');
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      this.clear();
      this.removeEventListeners(); // this.predict();
      // this.resetbutton.style.visibility = 'hidden';

      if (this.barchart) {
        this.barchart.cleanup();
      }
    }
  }]);

  return Paint;
}();

exports["default"] = Paint;

},{"./BarChart.js":1}],5:[function(require,module,exports){
"use strict";

var _neuralNumbersComponent = _interopRequireDefault(require("./neural-numbers-component"));

var _trainingController = _interopRequireDefault(require("./training-controller"));

var _trainingComponent = _interopRequireDefault(require("./training-component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function attrFlag(attribute, defaultValue) {
  if (attribute === undefined) {
    return defaultValue;
  }

  return attribute !== 'false';
}

$('[data-component=neural-numbers]').each(function (i, element) {
  var props = {
    modelPath: $(element).attr('data-model') || null,
    inputPlaceholder: $(element).attr('data-input-placeholder') || '',
    showBars: attrFlag($(element).attr('data-show-bars'), false),
    showNormalizer: attrFlag($(element).attr('data-show-normalizer'), false),
    showTraining: attrFlag($(element).attr('data-show-training'), false),
    showOutput: attrFlag($(element).attr('data-show-output'), true)
  };
  var component = new _neuralNumbersComponent["default"](element, props);
  component.init();
});

if (window.IMAGINARY === undefined) {
  window.IMAGINARY = {};
}

if (window.IMAGINARY.NeuralNumbers === undefined) {
  window.IMAGINARY.NeuralNumbers = _neuralNumbersComponent["default"];
  window.IMAGINARY.NeuralNumbersTrainingController = _trainingController["default"];
  window.IMAGINARY.NeuralNumbersTraining = _trainingComponent["default"];
}

},{"./neural-numbers-component":6,"./training-component":7,"./training-controller":8}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Paint = _interopRequireDefault(require("./Paint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var models = {};

function loadModel(_x) {
  return _loadModel.apply(this, arguments);
}

function _loadModel() {
  _loadModel = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(path) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(path && !(path in models))) {
              _context2.next = 4;
              break;
            }

            _context2.next = 3;
            return tf.loadLayersModel(path);

          case 3:
            models[path] = _context2.sent;

          case 4:
            return _context2.abrupt("return", models[path]);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadModel.apply(this, arguments);
}

var NeuralNumbersComponent = /*#__PURE__*/function () {
  function NeuralNumbersComponent(element, props) {
    _classCallCheck(this, NeuralNumbersComponent);

    this.$element = $(element);
    this.props = props;
    this.defaultModel = null;
    this.model = null;
    this.paint = null;
    var _this$props = this.props,
        inputPlaceholder = _this$props.inputPlaceholder,
        safeInputPlaceholder = _this$props.safeInputPlaceholder,
        showBars = _this$props.showBars,
        showNormalizer = _this$props.showNormalizer,
        showTraining = _this$props.showTraining,
        showOutput = _this$props.showOutput,
        verticalBars = _this$props.verticalBars;
    this.$element.addClass('neural-numbers-component');
    this.$element.toggleClass('with-bars', showBars);
    this.$element.toggleClass('with-normalizer', showNormalizer);
    this.$element.toggleClass('with-training', showTraining);
    this.$element.toggleClass('with-output', showOutput);
    this.$inputStage = $('<div>').addClass(['stage', 'stage-input', 'input', 'box']).appendTo(this.$element);
    this.$drawCanvas = $('<canvas>').addClass(['drawcanvas', 'input-canvas']).appendTo($('<div>').addClass('input-canvas-wrapper').appendTo(this.$inputStage));

    if (inputPlaceholder) {
      $('<div>').addClass('input-placeholder').append($('<span>').html(inputPlaceholder)).appendTo(this.$inputStage);
    } else if (safeInputPlaceholder) {
      $('<div>').addClass('input-placeholder').append($('<span>').text(safeInputPlaceholder)).appendTo(this.$inputStage);
    }

    this.$normalizeStage = $('<div>').addClass(['stage', 'stage-normalize']).appendTo(this.$element);
    this.$normalizeCanvas = $('<canvas>').addClass('normalizecanvas').appendTo($('<div>').addClass('normalize-canvas-wrapper').appendTo(this.$normalizeStage));
    this.$probabilityStage = $('<div>').addClass(['stage', 'stage-bars']).appendTo(this.$element);
    this.$bars = $('<div>').addClass('bars').toggleClass('bars-vertical', verticalBars || false).appendTo(this.$probabilityStage);
    this.$outputStage = $('<div>').addClass(['stage', 'stage-output']).appendTo(this.$element);
    this.$output = $('<div>').addClass(['output', 'digit']).appendTo($('<div>').addClass('output-wrapper').appendTo(this.$outputStage));
  }

  _createClass(NeuralNumbersComponent, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var modelPath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                modelPath = this.props.modelPath;
                _context.next = 3;
                return loadModel(modelPath);

              case 3:
                this.defaultModel = _context.sent;
                this.model = this.defaultModel;
                this.paint = new _Paint["default"](this.$element[0], this.model, 0.5, false, NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "setModel",
    value: function setModel() {
      var model = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (model === null) {
        model = this.defaultModel;
      }

      this.model = model;
      this.paint.swapModel(model);
    }
  }]);

  return NeuralNumbersComponent;
}();

exports["default"] = NeuralNumbersComponent;
NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT = 2.2;

},{"./Paint":4}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _trainingController = _interopRequireDefault(require("./training-controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrainingComponent = /*#__PURE__*/function () {
  function TrainingComponent(nnComponent, element) {
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, TrainingComponent);

    this.trainingController = new _trainingController["default"](nnComponent);
    this.$element = $(element);
    this.props = Object.assign({}, {
      imageCountLabelText: 'Images used:'
    }, props);
    this.$element.addClass('neural-numbers-training-component');
    this.$progressBar = $('<div>').addClass('progress-bar').appendTo(this.$element);
    this.$imageCount = $('<div>').addClass('image-count').appendTo(this.$progressBar);
    this.$imageCountLabel = $('<span>').addClass('image-count-label').html(this.props.imageCountLabelText).appendTo(this.$imageCount);
    this.$imageCountValue = $('<span>').addClass('image-count-value').appendTo(this.$imageCount);
    this.$controls = $('<div>').addClass('controls').appendTo(this.$element);
    this.$startPauseBtn = $('<button>').addClass(['start-pause-btn', 'btn']).text('Start').on('click', this.handleStartPauseBtn.bind(this)).appendTo(this.$controls);
    this.$stepBtn = $('<button>').addClass(['step-btn', 'btn']).text('Step').on('click', this.handleStepBtn.bind(this)).appendTo(this.$controls);
    this.$resetBtn = $('<button>').addClass(['reset-btn', 'btn']).text('Reset').on('click', this.handleResetBtn.bind(this)).appendTo(this.$controls);
    this.trainingController.events.on('batch', this.handleBatch.bind(this));
    this.trainingController.events.on('start', this.handleTrainingStart.bind(this));
    this.trainingController.events.on('pause', this.handleTrainingPause.bind(this));
    this.disableButtons();
  }

  _createClass(TrainingComponent, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.trainingController.init();

              case 2:
                this.enableButtons();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "disableButtons",
    value: function disableButtons() {
      this.$startPauseBtn.attr('disabled', true);
      this.$stepBtn.attr('disabled', true);
      this.$resetBtn.attr('disabled', true);
    }
  }, {
    key: "enableButtons",
    value: function enableButtons() {
      this.$startPauseBtn.attr('disabled', false);
      this.$stepBtn.attr('disabled', false);
      this.$resetBtn.attr('disabled', false);
    }
  }, {
    key: "handleStartPauseBtn",
    value: function handleStartPauseBtn() {
      if (this.trainingController.isTraining()) {
        this.trainingController.pause();
      } else {
        this.trainingController.start();
      }
    }
  }, {
    key: "handleStepBtn",
    value: function handleStepBtn() {
      this.trainingController.step();
    }
  }, {
    key: "handleResetBtn",
    value: function handleResetBtn() {
      this.trainingController.reset();
    }
  }, {
    key: "handleBatch",
    value: function handleBatch(imageCount) {
      this.$imageCountValue.text(imageCount);
    }
  }, {
    key: "handleTrainingStart",
    value: function handleTrainingStart() {
      this.$startPauseBtn.text('Pause');
      this.$element.addClass('running');
    }
  }, {
    key: "handleTrainingPause",
    value: function handleTrainingPause() {
      this.$startPauseBtn.text('Start');
      this.$element.removeClass('running');
    }
  }]);

  return TrainingComponent;
}();

exports["default"] = TrainingComponent;

},{"./training-controller":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("events"));

var _NeuralNetwork = _interopRequireDefault(require("./NeuralNetwork"));

var _MnistData = require("./MnistData");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TrainingController = /*#__PURE__*/function () {
  function TrainingController(nnComponent) {
    _classCallCheck(this, TrainingController);

    this.nnComponent = nnComponent;
    this.events = new _events["default"]();
    this.nn = new _NeuralNetwork["default"]({
      batchCallback: this.handleBatch.bind(this)
    });
    this.data = new _MnistData.MnistData();
  }

  _createClass(TrainingController, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.data.load();

              case 2:
                this.rebuildNetwork();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "rebuildNetwork",
    value: function rebuildNetwork() {
      this.nn.init();
      this.nnComponent.setModel(this.nn.model);
    }
  }, {
    key: "isTraining",
    value: function isTraining() {
      return this.nn.isTraining();
    }
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.events.emit('start');
                _context2.next = 3;
                return this.nn.train(this.data);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function start() {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "pause",
    value: function () {
      var _pause = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.nn.pauseTraining();

              case 2:
                this.events.emit('pause');

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function pause() {
        return _pause.apply(this, arguments);
      }

      return pause;
    }()
  }, {
    key: "step",
    value: function () {
      var _step = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.nn.trainSingleStep(this.data);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function step() {
        return _step.apply(this, arguments);
      }

      return step;
    }()
  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.nn.pauseTraining();

              case 2:
                this.rebuildNetwork();

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "handleBatch",
    value: function handleBatch(imageCount) {
      this.events.emit('batch', imageCount);
    }
  }]);

  return TrainingController;
}();

exports["default"] = TrainingController;

},{"./MnistData":2,"./NeuralNetwork":3,"events":9}],9:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}]},{},[5])

