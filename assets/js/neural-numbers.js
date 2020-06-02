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

      this.drawcontext = this.drawcanvas.getContext('2d');
      this.normalizecontext = this.normalizecanvas.getContext('2d'); // const { drawcontext, normalizecontext } = this;
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

},{"./BarChart.js":1}],3:[function(require,module,exports){
"use strict";

var _neuralNumbersComponent = _interopRequireDefault(require("./neural-numbers-component"));

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

},{"./neural-numbers-component":4}],4:[function(require,module,exports){
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
    this.model = null;
    this.paint = null;
    var _this$props = this.props,
        inputPlaceholder = _this$props.inputPlaceholder,
        showBars = _this$props.showBars,
        showNormalizer = _this$props.showNormalizer,
        showTraining = _this$props.showTraining,
        showOutput = _this$props.showOutput;
    this.$element.addClass('neural-numbers-component');
    this.$element.toggleClass('with-bars', showBars);
    this.$element.toggleClass('with-normalizer', showNormalizer);
    this.$element.toggleClass('with-training', showTraining);
    this.$element.toggleClass('with-output', showOutput);
    this.$inputStage = $('<div>').addClass(['stage', 'stage-input', 'input', 'box']).appendTo(this.$element);
    this.$drawCanvas = $('<canvas>').addClass(['drawcanvas', 'input-canvas']).appendTo($('<div>').addClass('input-canvas-wrapper').appendTo(this.$inputStage));

    if (inputPlaceholder) {
      $('<div>').addClass('input-placeholder').append($('<span>').html(inputPlaceholder)).appendTo(this.$inputStage);
    }

    this.$normalizeStage = $('<div>').addClass(['stage', 'stage-normalize']).appendTo(this.$element);
    this.$normalizeCanvas = $('<canvas>').addClass('normalizecanvas').appendTo($('<div>').addClass('normalize-canvas-wrapper').appendTo(this.$normalizeStage));
    this.$probabilityStage = $('<div>').addClass(['stage', 'stage-bars']).appendTo(this.$element);
    this.$bars = $('<div>').addClass('bars').appendTo(this.$probabilityStage);
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
                this.model = _context.sent;
                this.paint = new _Paint["default"](this.$element[0], this.model, 0.5, false, NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT);

              case 5:
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
  }]);

  return NeuralNumbersComponent;
}();

exports["default"] = NeuralNumbersComponent;
NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT = 2.2;

},{"./Paint":2}]},{},[3])

