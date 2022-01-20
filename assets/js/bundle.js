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

var _Paint = _interopRequireDefault(require("./Paint.js"));

var _MnistData = require("./MnistData.js");

var _NeuralNetwork = _interopRequireDefault(require("./NeuralNetwork.js"));

var _ValidationPreview = _interopRequireDefault(require("./ValidationPreview.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller = /*#__PURE__*/function () {
  function Controller(config) {
    _classCallCheck(this, Controller);

    this.config = config;
    this.data = new _MnistData.MnistData();
    this.dataloaded = false;
    this.testpaint = true;
  }

  _createClass(Controller, [{
    key: "initIntroPaint",
    value: function () {
      var _initIntroPaint = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(paintel) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.trainedmodel) {
                  _context.next = 4;
                  break;
                }

                _context.next = 3;
                return tf.loadLayersModel(this.config.modelPath);

              case 3:
                this.trainedmodel = _context.sent;

              case 4:
                this.paint = new _Paint["default"](paintel, this.trainedmodel, 0.5, false, this.config.paintClearTimeout);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initIntroPaint(_x) {
        return _initIntroPaint.apply(this, arguments);
      }

      return initIntroPaint;
    }()
  }, {
    key: "loadData",
    value: function () {
      var _loadData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.trainedmodel) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 3;
                return tf.loadLayersModel(this.config.modelPath);

              case 3:
                this.trainedmodel = _context2.sent;

              case 4:
                if (this.dataloaded) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 7;
                return this.data.load();

              case 7:
                this.dataloaded = true;

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }()
  }, {
    key: "initTrainingEnvironment",
    value: function () {
      var _initTrainingEnvironment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(els) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.loadData();

              case 2:
                this.vp = new _ValidationPreview["default"](this.data, els);
                this.nn = new _NeuralNetwork["default"](this.vp, els);
                this.paint = new _Paint["default"](els.paint, this.nn.model, 0, this.nn.visualization, this.config.paintClearTimeout);
                _context3.next = 7;
                return this.vp.initValidationImages(els);

              case 7:
                // this.nn might have been deleted because in the meanwhile the slide has been skipped
                if (this.nn) {
                  this.vp.updateValidationImages(this.nn.model);
                  this.vp.updateAccuracy(this.nn.model);
                }

              case 8:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function initTrainingEnvironment(_x2) {
        return _initTrainingEnvironment.apply(this, arguments);
      }

      return initTrainingEnvironment;
    }()
  }, {
    key: "resetNetwork",
    value: function resetNetwork(modelid, optimizerid, learningRate, activation) {
      if (this.nn) {
        this.nn.setup(modelid, optimizerid, learningRate, activation);
        this.paint.model = this.nn.model;
      }
    }
  }, {
    key: "startTraining",
    value: function () {
      var _startTraining = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.clearDelayedTrainStepPreview();
                this.testpaint = false;

                if (!this.nn) {
                  _context4.next = 5;
                  break;
                }

                _context4.next = 5;
                return this.nn.train(this.data);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function startTraining() {
        return _startTraining.apply(this, arguments);
      }

      return startTraining;
    }()
  }, {
    key: "pauseTraining",
    value: function () {
      var _pauseTraining = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(cb) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!this.nn) {
                  _context5.next = 4;
                  break;
                }

                _context5.next = 3;
                return this.nn.pauseTraining();

              case 3:
                this.delayedTrainStepPreview(cb);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function pauseTraining(_x3) {
        return _pauseTraining.apply(this, arguments);
      }

      return pauseTraining;
    }()
  }, {
    key: "singleStep",
    value: function () {
      var _singleStep = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(cb) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.nn) {
                  _context6.next = 5;
                  break;
                }

                this.testpaint = false;
                _context6.next = 4;
                return this.nn.trainSingleStep(this.data);

              case 4:
                this.delayedTrainStepPreview(cb);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function singleStep(_x4) {
        return _singleStep.apply(this, arguments);
      }

      return singleStep;
    }()
  }, {
    key: "resetTraining",
    value: function () {
      var _resetTraining = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(els) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.pauseTraining();

              case 2:
                this.cleanupValidationPreview();
                this.cleanupPaint();
                this.cleanupNetwork();
                _context7.next = 7;
                return this.initTrainingEnvironment(els);

              case 7:
                this.testpaint = true;

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function resetTraining(_x5) {
        return _resetTraining.apply(this, arguments);
      }

      return resetTraining;
    }()
  }, {
    key: "delayedTrainStepPreview",
    value: function delayedTrainStepPreview(cb) {
      var _this = this;

      this.clearDelayedTrainStepPreview();
      this.traintimeout = setTimeout(function () {
        _this.testpaint = true;
        if (_this.paint) _this.paint.predict();
        if (cb) cb();
      }, this.config.lastTrainStepTimeout * 1000);
    }
  }, {
    key: "clearDelayedTrainStepPreview",
    value: function clearDelayedTrainStepPreview() {
      if (this.traintimeout) {
        clearTimeout(this.traintimeout);
      }
    }
  }, {
    key: "toggleTraining",
    value: function toggleTraining(cb) {
      this.clearDelayedTrainStepPreview();

      if (this.nn) {
        this.nn.toggleTraining(this.data);
        this.testpaint = false;

        if (!this.nn.training) {
          this.delayedTrainStepPreview(cb);
        }
      }
    }
  }, {
    key: "cleanupNetwork",
    value: function cleanupNetwork() {
      if (this.nn) {
        this.nn.cleanup();
        delete this.nn;
      }
    }
  }, {
    key: "cleanupValidationPreview",
    value: function cleanupValidationPreview() {
      if (this.vp) {
        this.vp.cleanup();
        delete this.vp;
      }
    }
  }, {
    key: "cleanupPaint",
    value: function cleanupPaint() {
      if (this.paint) {
        this.paint.cleanup();
        delete this.paint;
      }
    }
  }, {
    key: "addAccuracyCallback",
    value: function addAccuracyCallback(acc, cb) {
      this.vp.addAccuracyCallback(acc, cb);
    }
  }]);

  return Controller;
}();

exports["default"] = Controller;

},{"./MnistData.js":5,"./NeuralNetwork.js":6,"./Paint.js":7,"./ValidationPreview.js":10}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-underscore-dangle,no-param-reassign */

/*
written by Christian Stussak, licensed under the Apache License 2.0.
copy from https://github.com/IMAGINARY/content-slider/blob/master/js/IdleDetector.js
*/
var defaultConstructorParams = {
  eventTypes: ['pointerdown', // 'pointermove',
  'pointerup', 'pointercancel', 'keydown', 'keyup'],
  domElement: document
};

var IdleDetector = /*#__PURE__*/function () {
  function IdleDetector() {
    var _this = this;

    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, IdleDetector);

    var _Object$assign = Object.assign(Object.assign({}, defaultConstructorParams), params),
        eventTypes = _Object$assign.eventTypes,
        domElement = _Object$assign.domElement;

    this._eventTypes = eventTypes;
    this._domElement = domElement;
    this._timeOfLastEvent = 0;
    this._maxId = 0;
    this._timers = {};

    this._nonIdleHandler = function () {
      _this.reset();
    };
  }

  _createClass(IdleDetector, [{
    key: "_init",
    value: function _init() {
      var _this2 = this;

      this._eventTypes.forEach(function (type) {
        return _this2._domElement.addEventListener(type, _this2._nonIdleHandler, true);
      });
    }
  }, {
    key: "_deinit",
    value: function _deinit() {
      var _this3 = this;

      this._eventTypes.forEach(function (type) {
        return _this3._domElement.removeEventListener(type, _this3._nonIdleHandler, true);
      });
    }
  }, {
    key: "_setTimeoutInternal",
    value: function _setTimeoutInternal(repeat, func, timeoutDelay) {
      for (var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        args[_key - 3] = arguments[_key];
      }

      // event handlers should only be active if there are pending timeouts
      if (Object.keys(this._timers).length === 0) {
        this._init();
      }

      if (typeof timeoutDelay === 'undefined') {
        timeoutDelay = 0;
      }

      this._maxId += 1;
      var id = this._maxId;
      var timers = this._timers;
      var timer = {
        id: id,
        repeat: repeat,
        timeoutDelay: timeoutDelay,
        windowTimeoutId: 0,
        callback: function callback() {
          if (!repeat) {
            this["delete"]();
          }

          func.apply(void 0, args);
        },
        reset: function reset() {
          window.clearTimeout(this.windowTimeoutId);
          this.windowTimeoutId = window.setTimeout(this.callback.bind(this), this.timeoutDelay);
        },
        clear: function clear() {
          window.clearTimeout(this.windowTimeoutId);
          this.windowTimeoutId = 0;
        },
        "delete": function _delete() {
          this.clear();
          delete timers[id];
        }
      };
      timers[id] = timer;
      timer.reset();
      return id;
    }
  }, {
    key: "_setIntervalInternal",
    value: function _setIntervalInternal(repeat, func, intervalDelay, timeoutDelay) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
        args[_key2 - 4] = arguments[_key2];
      }

      // event handlers should only be active if there are pending timeouts
      if (Object.keys(this._timers).length === 0) {
        this._init();
      }

      if (typeof intervalDelay === 'undefined') {
        intervalDelay = 0;
      }

      if (typeof timeoutDelay === 'undefined') {
        timeoutDelay = intervalDelay;
      }

      this._maxId += 1;
      var id = this._maxId;
      var timers = this._timers;
      var timer = {
        id: id,
        repeat: repeat,
        hasFired: false,
        timeoutDelay: timeoutDelay,
        intervalDelay: intervalDelay,
        windowTimeoutId: 0,
        windowIntervalId: 0,
        callback: function callback() {
          func.apply(void 0, args);
          this.hasFired = true;
        },
        intervalCallback: function intervalCallback() {
          this.windowIntervalId = window.setInterval(this.callback, this.intervalDelay);
          this.callback();
        },
        reset: function reset() {
          this.clear();

          if (!this.repeat && this.hasFired) {
            this["delete"]();
          } else {
            this.windowTimeoutId = window.setTimeout(this.intervalCallback.bind(this), this.timeoutDelay);
          }
        },
        clear: function clear() {
          window.clearTimeout(this.windowTimeoutId);
          window.clearInterval(this.windowIntervalId);
          this.windowTimeoutId = 0;
          this.windowIntervalId = 0;
        },
        "delete": function _delete() {
          this.clear();
          delete timers[id];
        }
      };
      timers[id] = timer;
      timer.reset();
      return id;
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(func, timeoutDelay) {
      for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      return this._setTimeoutInternal.apply(this, [true, func, timeoutDelay].concat(args));
    }
  }, {
    key: "setTimeoutOnce",
    value: function setTimeoutOnce(func, timeoutDelay) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      return this._setTimeoutInternal.apply(this, [false, func, timeoutDelay].concat(args));
    }
  }, {
    key: "setInterval",
    value: function setInterval(func, intervalDelay, timeoutDelay) {
      for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key5 = 3; _key5 < _len5; _key5++) {
        args[_key5 - 3] = arguments[_key5];
      }

      return this._setIntervalInternal.apply(this, [true, func, intervalDelay, timeoutDelay].concat(args));
    }
  }, {
    key: "setIntervalOnce",
    value: function setIntervalOnce(func, intervalDelay, timeoutDelay) {
      for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key6 = 3; _key6 < _len6; _key6++) {
        args[_key6 - 3] = arguments[_key6];
      }

      return this._setIntervalInternal.apply(this, [false, func, intervalDelay, timeoutDelay].concat(args));
    }
  }, {
    key: "clearTimeout",
    value: function clearTimeout(id) {
      if (typeof this._timers[id] !== 'undefined') {
        this._timers[id]["delete"]();
      } // event handlers should only be active if there are pending timeouts


      if (Object.keys(this._timers).length === 0) {
        this._deinit();
      }
    }
  }, {
    key: "clearInterval",
    value: function clearInterval(id) {
      this.clearTimeout(id);
    }
    /**
     * Interrupt the idle state and restart the timeouts and intervals.
     */

  }, {
    key: "reset",
    value: function reset() {
      this._timeOfLastEvent = performance.now();
      Object.values(this._timers).forEach(function (timer) {
        return timer.reset();
      });
    }
    /**
     * Clear all timeouts and intervals.
     */

  }, {
    key: "clear",
    value: function clear() {
      Object.values(this._timers).forEach(function (timer) {
        return timer["delete"]();
      });

      this._deinit();
    }
    /**
     * Return the time in ms since the last interruption of the idle state
     * if there is at least one active (interval) timeout
     * registered. Otherwise returns -1;
     * @returns {number}
     */

  }, {
    key: "getIdleTime",
    value: function getIdleTime() {
      if (Object.keys(this._timers).length === 0) {
        return -1;
      }

      return performance.now() - this._timeOfLastEvent;
    }
  }]);

  return IdleDetector;
}();

exports["default"] = IdleDetector;

},{}],4:[function(require,module,exports){
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LangSwitcher = /*#__PURE__*/function () {
  function LangSwitcher(container, config, langChangeCallback) {
    _classCallCheck(this, LangSwitcher);

    this.menuVisible = false;
    this.container = container;
    this.config = config;
    this.langChangeCallback = langChangeCallback;
    this.render();
  }

  _createClass(LangSwitcher, [{
    key: "render",
    value: function render() {
      var _this = this;

      this.element = document.createElement('div');
      this.element.classList.add('lang-switcher');
      this.trigger = document.createElement('button');
      this.trigger.setAttribute('type', 'button');
      this.trigger.classList.add('lang-switcher-trigger');
      this.element.appendChild(this.trigger);
      var mask = document.createElement('div');
      mask.classList.add('lang-switcher-menu-mask');
      this.element.appendChild(mask);
      this.menu = document.createElement('ul');
      this.menu.classList.add('lang-switcher-menu');
      mask.appendChild(this.menu);
      Object.entries(this.config.languages).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            code = _ref2[0],
            name = _ref2[1];

        var item = document.createElement('li');
        var link = document.createElement('button');
        link.setAttribute('type', 'button');
        link.innerText = name;
        link.addEventListener('pointerdown', function (ev) {
          _this.langChangeCallback(code);

          ev.preventDefault();
        });
        item.appendChild(link);

        _this.menu.appendChild(item);
      });
      this.container.appendChild(this.element);
      this.menu.style.bottom = "".concat(this.menu.clientHeight * -1 - 10, "px");
      window.document.addEventListener('pointerdown', function (ev) {
        if (_this.menuVisible) {
          _this.hideMenu();
        }
      });
      this.trigger.addEventListener('pointerdown', function (ev) {
        if (!_this.menuVisible) {
          _this.showMenu();

          ev.stopPropagation();
        }
      });
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      this.menuVisible = true;
      this.menu.classList.add('visible');
    }
  }, {
    key: "hideMenu",
    value: function hideMenu() {
      this.menuVisible = false;
      this.menu.classList.remove('visible');
    }
  }]);

  return LangSwitcher;
}();

exports["default"] = LangSwitcher;

},{}],5:[function(require,module,exports){
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
                ctx = canvas.getContext('2d');
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TrainingVisualization = _interopRequireDefault(require("./TrainingVisualization.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var NeuralNetwork = /*#__PURE__*/function () {
  function NeuralNetwork(vp, els) {
    _classCallCheck(this, NeuralNetwork);

    this.els = els;
    this.vp = vp;
    this.setup();
    this.visualization = new _TrainingVisualization["default"](this, els);
  }

  _createClass(NeuralNetwork, [{
    key: "setup",
    value: function setup() {
      var modelid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dense';
      var optimizerid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'adam';
      var learningRate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.001;
      var activation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'relu';
      // eslint-disable-next-line no-console
      console.log("Setting up NN model=".concat(modelid, " optimizer=").concat(optimizerid, " learningrate=").concat(learningRate, " activation=").concat(activation));
      this.modelid = modelid;
      this.training = false;
      this.trainedimages = 0;
      this.lastrainedimages = 0;
      this.pausecbs = []; // this.els.trainingAccuracy.innerHTML = ``;

      this.els.trainingProgress.innerHTML = this.trainedimages; // delete old model if it has been existing

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
                _context3.next = 5;
                return this.visualization.setCurrentTraining(trainXs, trainYs);

              case 5:
                _context3.next = 7;
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
                                _this.trainedimages += BATCH_SIZE; // this.els.trainingAccuracy.innerHTML =
                                //  `Accuracy on current training data: ${(logs.acc * 1000 | 0)/10}%`;

                                _this.els.trainingProgress.innerHTML = _this.trainedimages;

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

              case 7:
                tf.dispose(trainXs);
                tf.dispose(trainYs);

                if (TRAIN_DATA_SIZE === 1 || BATCH_SIZE === 1) {
                  tf.setBackend('webgl'); // fitting with single training-data results in NaNs when WebGL-backend
                  // is used for unknown reasons
                }

              case 10:
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
                this.vp.updateValidationImages(this.model);
                this.vp.updateAccuracy(this.model);

              case 4:
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
                  _context5.next = 15;
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
                  _context5.next = 13;
                  break;
                }

                this.vp.updateValidationImages(this.model);
                this.vp.updateAccuracy(this.model);

                if (!(this.trainedimages < 100)) {
                  _context5.next = 12;
                  break;
                }

                _context5.next = 12;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 1000 / (5 + 4 * _this2.trainedimages) * (_this2.trainedimages - _this2.lastrainedimages));
                });

              case 12:
                this.lastrainedimages = this.trainedimages;

              case 13:
                _context5.next = 1;
                break;

              case 15:
                while (this.pausecbs.length > 0) {
                  this.pausecbs.pop()();
                }

              case 16:
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

},{"./TrainingVisualization.js":9}],7:[function(require,module,exports){
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

},{"./BarChart.js":1}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slide = _interopRequireDefault(require("./slide.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SlideShow = /*#__PURE__*/function () {
  function SlideShow(controller) {
    var _this = this;

    _classCallCheck(this, SlideShow);

    this.createEventMask();
    this.controller = controller;
    this.slides = Array.from(document.querySelectorAll('[data-slide]')).map(function (element) {
      return element.getAttribute('data-slide');
    });
    this.currentSlide = 0;
    this.currentSlideController = null;
    window.onhashchange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.maskEvents();

              _context.next = 3;
              return _this.doSlideChange();

            case 3:
              _this.unmaskEvents();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    this.doSlideChange();
    window.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          _this.goPrevious();

          break;

        case 'ArrowRight':
          _this.goNext();

          break;

        default:
          break;
      }
    });
  }

  _createClass(SlideShow, [{
    key: "createEventMask",
    value: function createEventMask() {
      this.eventMask = document.createElement('div');
      this.eventMask.style.position = 'absolute';
      this.eventMask.style.top = '0';
      this.eventMask.style.left = '0';
      this.eventMask.style.width = '100%';
      this.eventMask.style.height = '100%';
      this.eventMask.style.zIndex = '1000000';
      this.eventMask.style.pointerEvents = 'all';
      this.eventMask.style.backgroundColor = 'transparent';
      this.eventMask.style.display = 'none';
      window.document.body.appendChild(this.eventMask);
    }
  }, {
    key: "maskEvents",
    value: function maskEvents() {
      this.eventMask.style.display = 'block';
    }
  }, {
    key: "unmaskEvents",
    value: function unmaskEvents() {
      this.eventMask.style.display = 'none';
    }
    /**
     * Go to the first slide
     */

  }, {
    key: "goFirst",
    value: function goFirst() {
      if (this.slides.length > 0) {
        this.goTo(this.slides[0]);
      }
    }
    /**
     * Go the net slide
     */

  }, {
    key: "goNext",
    value: function goNext() {
      var currentID = this.slides.indexOf(this.getCurrentSlide());

      if (currentID < this.slides.length - 1) {
        this.goTo(this.slides[currentID + 1]);
      }
    }
    /**
     * Go to the previous slide
     */

  }, {
    key: "goPrevious",
    value: function goPrevious() {
      var currentID = this.slides.indexOf(this.getCurrentSlide());

      if (currentID > 0) {
        this.goTo(this.slides[currentID - 1]);
      }
    }
    /**
     * Go to the requested slide
     * @param {string} id
     */

  }, {
    key: "goTo",
    value: function goTo(id) {
      if (this.slides.includes(id)) {
        window.location.hash = id;
      }
    }
    /**
     * Returns the ID of the current slide
     * @return {null|string}
     */

  }, {
    key: "getCurrentSlide",
    value: function getCurrentSlide() {
      var hash = window.location.hash.substring(1);

      if (this.slides.length === 0) {
        return null;
      }

      return hash !== '' ? hash : this.slides[0];
    }
    /**
     * Handles a slide change by modifying the view and navigation
     *
     * @private
     */

  }, {
    key: "doSlideChange",
    value: function () {
      var _doSlideChange = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var currentSlide, element, nav, menuItem, SlideClass;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                currentSlide = this.getCurrentSlide();
                document.querySelector('.footer .navigation').childNodes.forEach(function (btn) {
                  btn.classList.remove('selected');
                });
                this.slides.forEach(function (slide) {
                  var element = document.querySelector("[data-slide=".concat(slide, "]"));

                  if (element.onExit && element.open) {
                    element.onExit(_this2.controller);
                  }

                  element.open = false;
                  element.classList.remove('visible');
                  element.classList.remove('entering');
                });

                if (!this.currentSlideController) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 6;
                return this.currentSlideController.onExit();

              case 6:
                this.currentSlideController = null;

              case 7:
                element = document.querySelector("[data-slide=".concat(currentSlide, "]"));

                if (!element) {
                  _context2.next = 21;
                  break;
                }

                nav = element.getAttribute('data-slide-nav') || currentSlide;
                menuItem = document.querySelector(".footer .navigation [href='#".concat(nav, "']"));

                if (menuItem) {
                  menuItem.classList.add('selected');
                }

                element.open = true;
                element.classList.add('visible');
                setTimeout(function () {
                  element.classList.add('entering');
                }, 0);

                if (element.onEnter) {
                  element.onEnter(this.controller);
                }

                SlideClass = _slide["default"].getClass(currentSlide);

                if (!SlideClass) {
                  _context2.next = 21;
                  break;
                }

                this.currentSlideController = new SlideClass(element, this.controller);
                _context2.next = 21;
                return this.currentSlideController.onEnter();

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function doSlideChange() {
        return _doSlideChange.apply(this, arguments);
      }

      return doSlideChange;
    }()
  }]);

  return SlideShow;
}();

exports["default"] = SlideShow;

},{"./slide.js":18}],9:[function(require,module,exports){
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

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HEIGHT = 500;
var DENSEWIDTH = 380;
var XOFFSET = 20;

var TrainingVisualization = /*#__PURE__*/function () {
  function TrainingVisualization(nn, els) {
    _classCallCheck(this, TrainingVisualization);

    this.els = els;
    this.nn = nn;
    this.currentDigit = new Float32Array(784);
    this.currentProbabilities = new Float32Array(10);
    this.canvas = this.els.network;
    var canvas = this.canvas;
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    this.ctx = canvas.getContext('2d');
    this.acanvas = this.els.activations;
    var acanvas = this.acanvas;
    acanvas.height = acanvas.clientHeight;
    acanvas.width = acanvas.clientWidth;
    this.actx = acanvas.getContext('2d');
    this.icanvas = this.els.input;
    var icanvas = this.icanvas;
    icanvas.height = icanvas.clientHeight;
    icanvas.width = icanvas.clientWidth;
    this.ictx = icanvas.getContext('2d');
    this.barchart = new _BarChart["default"](this.els.bars); // this.lastvisualization = -1;

    this.traindigit = document.createElement('canvas');
    this.traindigit.height = 28;
    this.traindigit.width = 28;
    this.lt1 = 0.08;
    this.lt2 = 0.2; // this.animateNetwork();

    this.renderNetwork();
    this.renderActivations();
  }

  _createClass(TrainingVisualization, [{
    key: "findthreshold",
    value: function findthreshold(arr, a, b, target) {
      // binary search to find good
      var m = (a + b) / 2;
      var ccnt = arr.filter(function (x) {
        return x * x > m * m;
      }).length;

      if (b - a < 0.001 || Math.abs(ccnt - target) < target * 0.2) {
        // correct up to 20%
        return m;
      }

      if (ccnt < target) {
        // to few elements for threshold=m -> threshold should be smaller than m
        return this.findthreshold(arr, a, m, target);
      }

      return this.findthreshold(arr, m, b, target);
    }
  }, {
    key: "drawdenselayer",
    value: function drawdenselayer(N, M, weights, x0, y0, width, height, lastthreshold) {
      var ctx = this.ctx;
      /*
      // takes about 120ms for 78400 weights
      const topWeights = Array.from(weights)
      .map((v, k) => [Math.abs(v), k]).sort((a, b) => (a[0] - b[0]))
      .slice(Math.max(0, weights.length - 100));
      const maxWeight = topWeights[topWeights.length - 1][0];
      for (let k in topWeights) {
        const nodeB = topWeights[k][1] % M;
        const nodeA = topWeights[k][1] / M;
        const val = topWeights[k][0];
        ctx.beginPath();
        ctx.globalAlpha = val / topWeights[0][0];
        ctx.moveTo(x0, y0 + nodeA * height / N);
        ctx.lineTo(x0 + width, y0 + nodeB * height / M);
        ctx.stroke();
      }
      */
      // takes about 40ms for 784 weights

      var threshold = this.findthreshold(weights, lastthreshold * 0.8, lastthreshold * 1.2, 200);

      for (var nodeA = 0; nodeA < N; nodeA += 1) {
        for (var nodeB = 0; nodeB < M; nodeB += 1) {
          var val = weights[nodeA * M + nodeB];

          if (val * val > threshold * threshold) {
            ctx.beginPath();
            ctx.globalAlpha = Math.abs(val) * (0.3 / threshold);
            ctx.strokeStyle = val > 0 ? 'blue' : 'red';
            ctx.moveTo(x0, y0 + nodeA * height / (N - 1)); // ctx.lineTo(x0 + width, y0 + nodeB * height / (M - 1));

            ctx.bezierCurveTo(x0 + width / 2, y0 + nodeA * height / (N - 1), x0 + width / 2, y0 + nodeB * height / (M - 1), x0 + width, y0 + nodeB * height / (M - 1));
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      return threshold;
    }
  }, {
    key: "drawnodes",
    value: function drawnodes(ctx, N, values, x0, y0, height, radius) {
      values = values || new Array(N).fill(0);

      for (var nodeA = 0; nodeA < N; nodeA += 1) {
        var cval = Math.max(128, 255 - (values[nodeA] * 128 | 0));

        if (radius <= 2) {
          cval = (cval + 128) / 2 | 0;
        }

        ctx.fillStyle = "rgb(".concat(cval, ", ").concat(cval, ", ").concat(cval, ")");
        ctx.beginPath();
        ctx.arc(x0, y0 + nodeA * height / (N - 1), radius, 0, 2 * Math.PI, false);
        /*
          if (cval > 200 && radius > 2) {
            ctx.strokeStyle = `rgb(128, 128, 128)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        */
        // ctx.stroke();

        ctx.fill();
      }
    }
  }, {
    key: "renderNetwork",
    value: function renderNetwork() {
      if (this.nn.modelid === 'dense') {
        var canvas = this.canvas,
            ctx = this.ctx;
        var weights = this.nn.model.getWeights().map(function (w) {
          return w.dataSync();
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.lt1 = this.drawdenselayer(784, 100, weights[0], XOFFSET, 50, DENSEWIDTH, HEIGHT - 100, this.lt1);
        this.lt2 = this.drawdenselayer(100, 10, weights[2], XOFFSET + DENSEWIDTH, 50, DENSEWIDTH, HEIGHT - 100, this.lt2);
      } // this.lastvisualization = this.nn.trainedimages;

    }
  }, {
    key: "renderActivations",
    value: function renderActivations() {
      this.actx.clearRect(0, 0, this.acanvas.width, this.acanvas.height);
      this.ictx.clearRect(0, 0, this.icanvas.width, this.icanvas.height);

      if (this.traindigit.active) {
        this.ictx.imageSmoothingEnabled = false; // no antialiasin

        this.ictx.filter = 'brightness(0.5) invert(1) brightness(0.95)';
        this.ictx.drawImage(this.traindigit, 0, 0, 28, 28, 60, 60, 28 * 6, 28 * 6);
        this.ictx.filter = 'none';
      } // draw bars for activations

      /*
        this.octx.beginPath();
        this.octx.strokeStyle = '#c4c4c4';
        this.octx.lineWidth = 20;
        this.octx.lineCap = "round";
        for (let k = 0; k < 10; k++) {
          const x0 = 10;
          const x1 = 95;
          const y0 = 50 + (HEIGHT - 100) * k / (10 - 1);
          this.octx.moveTo(x0, y0);
          this.octx.lineTo(
            this.currentProbabilities[k] * x1 + (1 - this.currentProbabilities[k]) * x0,
            y0
          );
        }
        this.octx.stroke();
        this.octx.lineWidth = 1;
        this.octx.lineCap = "butt";
      */


      this.barchart.update(this.currentProbabilities, this.currentTarget);
      this.drawnodes(this.actx, 784, this.currentDigit, XOFFSET, 50, HEIGHT - 100, 0.5);

      if (this.nn.modelid === 'dense') {
        this.drawnodes(this.actx, 100, this.intermediateActivations, XOFFSET + DENSEWIDTH, 50, HEIGHT - 100, 1.5);
      } // this.drawnodes(this.octx, 10, this.currentProbabilities, 8, 50, (HEIGHT - 100), 8);

      /*
          //draw digits
          this.octx.fillStyle = 'black';
          for (let k = 0; k < 10; k++) {
            const x0 = 105;
            const y0 = 50 + (HEIGHT - 100) * k / (10 - 1);
            this.octx.font = "20px 'Exo 2'";
            this.octx.fillText(k, x0, y0 + 8);
          }
      */

    }
    /*
      animateNetwork() {
        if (this.nn.trainedimages
          > this.lastvisualization + Math.min(512, 0.1 * this.nn.trainedimages)) {
          this.renderNetwork();
        }
        requestAnimationFrame(() => this.animateNetwork());
      }
    */

  }, {
    key: "setCurrentTraining",
    value: function () {
      var _setCurrentTraining = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(trainXs, trainYs) {
        var trainX1, imageTensor, trainY1, _trainY1$argMax$dataS, _trainY1$argMax$dataS2;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                trainX1 = trainXs.slice([0, 0, 0, 0], [1, 28, 28, 1]); // only the first

                imageTensor = trainX1.reshape([28, 28, 1]); // first as image

                _context.next = 4;
                return tf.browser.toPixels(imageTensor, this.traindigit);

              case 4:
                this.traindigit.active = true;
                this.currentDigit = imageTensor.dataSync();
                this.computeActivations(trainX1);
                trainY1 = trainYs.slice([0, 0], [1, 10]); // only the first
                // const target = trainY1.reshape([10]);

                _trainY1$argMax$dataS = trainY1.argMax([-1]).dataSync();
                _trainY1$argMax$dataS2 = _slicedToArray(_trainY1$argMax$dataS, 1);
                this.currentTarget = _trainY1$argMax$dataS2[0];
                this.renderNetwork();
                this.renderActivations(); // clean up tensors

                trainX1.dispose();
                trainY1.dispose();
                imageTensor.dispose(); // target.dispose();

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setCurrentTraining(_x, _x2) {
        return _setCurrentTraining.apply(this, arguments);
      }

      return setCurrentTraining;
    }()
  }, {
    key: "show",
    value: function () {
      var _show = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(imageTensor, pixels) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.computeActivations(imageTensor);
                this.currentDigit = pixels;
                this.traindigit.active = false;
                this.renderActivations();

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function show(_x3, _x4) {
        return _show.apply(this, arguments);
      }

      return show;
    }()
  }, {
    key: "computeActivations",
    value: function computeActivations(input) {
      if (this.nn.modelid === 'dense') {
        var A1 = this.nn.model.layers[0].apply(input);
        var A2 = this.nn.model.layers[1].apply(A1);
        var A3 = this.nn.model.layers[2].apply(A2);
        this.intermediateActivations = A2.dataSync().map(function (x) {
          return Math.abs(x) / 2;
        });
        this.currentProbabilities = A3.dataSync();

        var _A3$argMax$dataSync = A3.argMax([-1]).dataSync();

        var _A3$argMax$dataSync2 = _slicedToArray(_A3$argMax$dataSync, 1);

        this.currentTarget = _A3$argMax$dataSync2[0];
        A1.dispose();
        A2.dispose();
        A3.dispose();
      } else {
        var prediction = this.nn.model.predict(input);
        this.currentProbabilities = prediction.dataSync();

        var _prediction$argMax$da = prediction.argMax([-1]).dataSync();

        var _prediction$argMax$da2 = _slicedToArray(_prediction$argMax$da, 1);

        this.currentTarget = _prediction$argMax$da2[0];
        prediction.dispose();
      }
    }
  }]);

  return TrainingVisualization;
}();

exports["default"] = TrainingVisualization;

},{"./BarChart.js":1}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-await-in-loop */

/* globals tf */
var NUM_EXAMPLES = 50; // TODO

var ValidationPreview = /*#__PURE__*/function () {
  function ValidationPreview(data, els) {
    _classCallCheck(this, ValidationPreview);

    this.data = data;
    this.els = els;
    this.displayedAccuracy = 0;
    this.accuracy = this.displayedAccuracy;
    this.isanimating = true;
    this.acccbs = []; // this.animate();
  }

  _createClass(ValidationPreview, [{
    key: "initValidationImages",
    value: function () {
      var _initValidationImages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.els.validationImages) {
                  _context3.next = 2;
                  break;
                }

                return _context3.delegateYield( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var examples, container, _loop, i;

                  return regeneratorRuntime.wrap(function _callee$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _this.digittext = [];
                          _this.digitcontainer = []; // Get the examples

                          _this.examples = _this.data.nextTestBatch(NUM_EXAMPLES);
                          examples = _this.examples;
                          _context2.next = 6;
                          return examples.labels.argMax([-1]).dataSync();

                        case 6:
                          _this.examplelabels = _context2.sent;
                          container = document.createElement('div');
                          _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                            var imageTensor, canvas;
                            return regeneratorRuntime.wrap(function _loop$(_context) {
                              while (1) {
                                switch (_context.prev = _context.next) {
                                  case 0:
                                    // Reshape the image to 28x28 px
                                    imageTensor = tf.tidy(function () {
                                      return examples.xs.slice([i, 0], [1, examples.xs.shape[1]]).reshape([28, 28, 1]);
                                    });
                                    canvas = document.createElement('canvas');
                                    _this.digitcontainer[i] = document.createElement('div');
                                    _context.next = 5;
                                    return tf.browser.toPixels(imageTensor, canvas);

                                  case 5:
                                    _this.digitcontainer[i].appendChild(canvas);

                                    _this.digittext[i] = document.createElement('div');

                                    _this.digitcontainer[i].appendChild(_this.digittext[i]);

                                    container.appendChild(_this.digitcontainer[i]);
                                    imageTensor.dispose();

                                  case 10:
                                  case "end":
                                    return _context.stop();
                                }
                              }
                            }, _loop);
                          });
                          i = 0;

                        case 10:
                          if (!(i < NUM_EXAMPLES)) {
                            _context2.next = 15;
                            break;
                          }

                          return _context2.delegateYield(_loop(i), "t0", 12);

                        case 12:
                          i += 1;
                          _context2.next = 10;
                          break;

                        case 15:
                          //
                          _this.els.validationImages.appendChild(container); // document.body.appendChild(container);


                        case 16:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee);
                })(), "t0", 2);

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function initValidationImages() {
        return _initValidationImages.apply(this, arguments);
      }

      return initValidationImages;
    }()
  }, {
    key: "updateValidationImages",
    value: function () {
      var _updateValidationImages = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(model) {
        var _this2 = this;

        var values, i;
        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this.els.validationImages) {
                  values = tf.tidy(function () {
                    var testxs = _this2.examples.xs.reshape([NUM_EXAMPLES, 28, 28, 1]);

                    return model.predict(testxs).argMax([-1]).dataSync();
                  }); //  console.log(preds);

                  for (i = 0; i < NUM_EXAMPLES; i += 1) {
                    // digittext[i].innerHTML = `${values[i]} (${examplelabels[i]})`;
                    this.digittext[i].innerHTML = "".concat(values[i]);
                    this.digitcontainer[i].style.backgroundColor = values[i] === this.examplelabels[i] ? 'green' : 'red';
                  }
                }

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateValidationImages(_x) {
        return _updateValidationImages.apply(this, arguments);
      }

      return updateValidationImages;
    }()
  }, {
    key: "updateAccuracy",
    value: function () {
      var _updateAccuracy = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(model) {
        var _this3 = this;

        var TEST_DATA_SIZE,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                TEST_DATA_SIZE = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : 100;
                this.accuracy = tf.tidy(function () {
                  var d = _this3.data.nextTestBatch(TEST_DATA_SIZE);

                  var testXs = d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]);
                  var testYs = d.labels;
                  return model.evaluate(testXs, testYs)[1].dataSync();
                });

                if (!(TEST_DATA_SIZE < 1000 && this.accuracy > 0.9)) {
                  _context5.next = 5;
                  break;
                }

                _context5.next = 5;
                return this.updateAccuracy(model, 1000);

              case 5:
                // this.els.validationAccuracy.innerHTML =
                // `Accuracy on validation data (approx.): ${(acc * 1000 | 0)/10} %`;
                this.els.validationAccuracy.innerHTML = "".concat(this.accuracy < 0.9 ? Math.round(this.accuracy * 100) : Math.round(this.accuracy * 1000) / 10, "%"); // run all callbacks for a lower accuracy

                this.acccbs.filter(function (p) {
                  return p.acc <= _this3.accuracy;
                }).map(function (p) {
                  return p.cb();
                }); // delete all callbacks that have been run

                this.acccbs = this.acccbs.filter(function (p) {
                  return p.acc > _this3.accuracy;
                });

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateAccuracy(_x2) {
        return _updateAccuracy.apply(this, arguments);
      }

      return updateAccuracy;
    }()
    /* This function is not used anymore: smooth rendering of accuracy */

  }, {
    key: "animate",
    value: function animate() {
      var _this4 = this;

      if (!this.isanimating) {
        return;
      }

      var alpha = 0.05;
      this.displayedAccuracy = (1 - alpha) * this.displayedAccuracy + alpha * this.accuracy; // this.els.validationAccuracy.style = `--angle: ${(1-this.displayedAccuracy)*360}deg;`;
      // const accuracy = (this.displayedAccuracy < 0.95)
      //  ? Math.round(this.displayedAccuracy * 100)
      //  : Math.round(this.displayedAccuracy * 1000) /10;
      // this.els.validationAccuracy.firstElementChild.innerHTML = `${accuracy}%`;

      var accuracy = this.displayedAccuracy < 0.95 ? Math.round(this.displayedAccuracy * 100) : Math.round(this.displayedAccuracy * 1000) / 10;
      this.els.validationAccuracy.innerHTML = "".concat(accuracy, "%");
      window.requestAnimationFrame(function () {
        return _this4.animate();
      });
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      while (this.els.validationImages && this.els.validationImages.firstChild) {
        this.els.validationImages.removeChild(this.els.validationImages.firstChild);
      }

      this.isanimating = false;
    }
  }, {
    key: "addAccuracyCallback",
    value: function addAccuracyCallback(acc, cb) {
      this.acccbs.push({
        cb: cb,
        acc: acc
      });
    }
  }]);

  return ValidationPreview;
}();

exports["default"] = ValidationPreview;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-param-reassign */

/* globals IMAGINARY */
var I18nControler = /*#__PURE__*/function () {
  function I18nControler() {
    _classCallCheck(this, I18nControler);
  }

  _createClass(I18nControler, null, [{
    key: "init",
    value: function init() {
      var defaultLanguage = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';
      return IMAGINARY.i18n.init({
        queryStringVariable: 'lang',
        translationsDirectory: 'tr',
        defaultLanguage: defaultLanguage
      }).then(function () {
        I18nControler.update();
      });
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(code) {
      IMAGINARY.i18n.setLang(code).then(function () {
        I18nControler.update();
      });
    }
  }, {
    key: "update",
    value: function update() {
      document.querySelectorAll('[data-i18n-str]').forEach(function (element) {
        element.innerHTML = IMAGINARY.i18n.t(element.getAttribute('data-i18n-str'));
      });
      document.querySelectorAll('[data-i18n-str-title]').forEach(function (element) {
        element.setAttribute('title', IMAGINARY.i18n.t(element.getAttribute('data-i18n-str-title')));
      });
      document.querySelectorAll('[data-i18n-html]').forEach(function (element) {
        var path = "pages/".concat(IMAGINARY.i18n.getLang(), "/").concat(element.getAttribute('data-i18n-html'), ".html");
        fetch(path).then(function (response) {
          if (response.status >= 200 && response.status < 300) {
            return response.text();
          }

          throw new Error(response.statusText);
        }).then(function (content) {
          element.innerHTML = content;
        })["catch"](function (err) {
          console.error("Error fetching i18n page ".concat(path));
          console.error(err);
        });
      });
    }
  }]);

  return I18nControler;
}();

exports["default"] = I18nControler;

},{}],12:[function(require,module,exports){
"use strict";

require("./main");

},{"./main":13}],13:[function(require,module,exports){
"use strict";

var _Controller = _interopRequireDefault(require("./Controller.js"));

var _IdleDetector = _interopRequireDefault(require("./IdleDetector.js"));

var _SlideShow = _interopRequireDefault(require("./SlideShow.js"));

var _i18nController = _interopRequireDefault(require("./i18nController.js"));

var _LangSwitcher = _interopRequireDefault(require("./LangSwitcher.js"));

require("./slide-controllers/intro.js");

require("./slide-controllers/training.js");

require("./slide-controllers/what-is-training-data.js");

require("./slide-controllers/design-network.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-unused-vars */

/**
 * Return the URL of the user-supplied config file or {null} if it is not present.
 *
 * A custom config file name can be provided via the 'config' query string variable.
 * Allowed file names must match the regex /^[A-Za-z0\-_.]+$/.
 *
 * @returns {URL|null} User-supplied config URL or {null} if not supplied.
 * @throws {Error} If the user-supplied config file name doesn't match the regex.
 */
function getCustomConfigUrl() {
  var urlSearchParams = new URLSearchParams(window.location.search);

  if (!urlSearchParams.has('config')) {
    return null;
  }

  var customConfigName = urlSearchParams.get('config');
  var whitelistRegex = /^[A-Za-z0\-_.]+$/;

  if (whitelistRegex.test(customConfigName)) {
    return new URL(customConfigName, window.location.href);
  }

  throw new Error("Custom config path ".concat(customConfigName, " must match ").concat(whitelistRegex.toString(), "."));
}

var configDefaults = {
  paintClearTimeout: 2.2,
  idleReload: 300,
  lastTrainStepTimeout: 1.5,
  languages: {
    en: 'English'
  },
  defaultLanguage: 'en',
  modelPath: 'assets/models/my-model.json'
};
var defaultConfigUrl = new URL('./config.json', window.location.href);
var customConfigUrl = getCustomConfigUrl();
var configUrl = customConfigUrl || defaultConfigUrl;
fetch(configUrl, {
  cache: 'no-store'
}).then(function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  throw new Error(response.statusText);
})["catch"](function (err) {
  throw new Error("Failed to load config file ".concat(configUrl, ": ").concat(err));
}).then(function (config) {
  return Object.assign({}, configDefaults, config);
}).then(function (config) {
  _i18nController["default"].init(config.defaultLanguage).then(function () {
    var controller = new _Controller["default"](config);
    var slideShow = new _SlideShow["default"](controller);
    controller.loadData();

    if (Object.entries(config.languages).length > 1) {
      var langSwitcher = new _LangSwitcher["default"](document.querySelector('.footer .utility'), config, function (code) {
        _i18nController["default"].setLanguage(code);
      });
    }

    var id = new _IdleDetector["default"]();
    id.setTimeout(function () {
      window.location.hash = '#intro';
      window.location.reload();
      controller.loadData();
    }, 1000 * config.idleReload); // Disable dragging a elements

    document.querySelectorAll('a').forEach(function (aElement) {
      aElement.addEventListener('dragstart', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
      });
    });
  });
})["catch"](function (err) {
  return console.error(err);
});

},{"./Controller.js":2,"./IdleDetector.js":3,"./LangSwitcher.js":4,"./SlideShow.js":8,"./i18nController.js":11,"./slide-controllers/design-network.js":14,"./slide-controllers/intro.js":15,"./slide-controllers/training.js":16,"./slide-controllers/what-is-training-data.js":17}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slide = _interopRequireDefault(require("../slide.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DesignNetworkSlide = /*#__PURE__*/function (_Slide) {
  _inherits(DesignNetworkSlide, _Slide);

  var _super = _createSuper(DesignNetworkSlide);

  function DesignNetworkSlide() {
    _classCallCheck(this, DesignNetworkSlide);

    return _super.apply(this, arguments);
  }

  _createClass(DesignNetworkSlide, [{
    key: "onEnter",
    value: function () {
      var _onEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this = this;

        var istraining, isBusy, d, resetadvancedoptions, els, updateUI, resetadvancednetwork, rateSlider, rateLabel;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.controller.testpaint = true;
                istraining = true;
                isBusy = false;
                d = document.querySelector('[data-slide=design-network] .train');

                resetadvancedoptions = function resetadvancedoptions() {
                  d.querySelectorAll('.parameter .select').forEach(function (select) {
                    select.querySelectorAll('.option').forEach(function (option, k) {
                      option.classList.toggle('selected', k === 0);

                      if (k === 0) {
                        select.value = option.dataset.value;
                      }
                    });
                  });
                  d.querySelector('.learningrate').value = -3;
                  d.querySelector('.learningratetxt').innerHTML = '0.001';
                };

                resetadvancedoptions();
                els = {
                  trainingProgress: d.querySelector('.imagesused .number'),
                  // validationImages: d.querySelector('#validation-images'),
                  validationAccuracy: d.querySelector('.accuracy .number'),
                  input: d.querySelector('.traininputcanvas'),
                  network: d.querySelector('.simplenetwork > .network'),
                  activations: d.querySelector('.simplenetwork > .activations'),
                  bars: d.querySelector('.bars'),
                  paint: d.querySelector('.paint')
                };

                updateUI = function updateUI() {
                  istraining = _this.controller.nn && _this.controller.nn.training;

                  if (_this.controller.nn && _this.controller.nn.trainedimages > 0) {
                    d.querySelector('.reset').classList.add('visible');
                  } else {
                    d.querySelector('.reset').classList.remove('visible');
                  }

                  d.querySelector('.paint').classList.toggle('visible', _this.controller.testpaint);
                  d.querySelector('.training').classList.toggle('visible', !_this.controller.testpaint);

                  if (_this.controller.testpaint) {
                    if (_this.controller.paint) {
                      _this.controller.paint.clear();
                    }
                  }

                  var pr = d.querySelector('.pause-resume');

                  if (istraining) {
                    pr.classList.remove('resume');
                    pr.classList.add('pause');
                  } else {
                    pr.classList.add('resume');
                    pr.classList.remove('pause');
                  }

                  d.querySelectorAll('.parameter .select').forEach(function (select) {
                    select.querySelectorAll('.option').forEach(function (option) {
                      option.onpointerdown = function () {
                        if (select.value !== option.dataset.value) {
                          select.querySelectorAll('.option').forEach(function (ooption) {
                            ooption.classList.toggle('selected', ooption === option);
                          });
                          select.value = option.dataset.value;
                          resetadvancednetwork();
                        }
                      };
                    });
                  });
                };

                updateUI();
                /* buttons */

                /*
                  if (d.querySelector(".testit")) d.querySelector(".testit").onpointerdown = async () => {
                    controller.testpaint = true;
                    updateUI();
                    await controller.pauseTraining();
                    updateUI();
                  };
                */

                d.querySelector('.pause-resume').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!isBusy) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return");

                        case 2:
                          isBusy = true;
                          istraining = !istraining;
                          _context.next = 6;
                          return _this.controller.toggleTraining(updateUI);

                        case 6:
                          updateUI();
                          d.querySelector('.reset').classList.add('visible');
                          isBusy = false;

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                d.querySelector('.single-step').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!isBusy) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt("return");

                        case 2:
                          isBusy = true;

                          if (!istraining) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 6;
                          return _this.controller.pauseTraining(updateUI);

                        case 6:
                          // await controller.singleStep(updateUI);
                          istraining = false;
                          _context2.next = 11;
                          break;

                        case 9:
                          _context2.next = 11;
                          return _this.controller.singleStep(updateUI);

                        case 11:
                          updateUI();
                          isBusy = false;

                        case 13:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                d.querySelector('.reset').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!isBusy) {
                            _context3.next = 2;
                            break;
                          }

                          return _context3.abrupt("return");

                        case 2:
                          isBusy = true;
                          _context3.next = 5;
                          return _this.controller.pauseTraining(updateUI);

                        case 5:
                          _context3.next = 7;
                          return _this.controller.resetTraining(els);

                        case 7:
                          resetadvancednetwork();
                          updateUI();
                          isBusy = false;

                        case 10:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));
                /* expert mode */

                resetadvancednetwork = /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var learningRate;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!isBusy) {
                              _context4.next = 2;
                              break;
                            }

                            return _context4.abrupt("return");

                          case 2:
                            isBusy = true;
                            _context4.next = 5;
                            return _this.controller.pauseTraining(updateUI);

                          case 5:
                            learningRate = Math.pow(10, d.querySelector('.learningrate').value);
                            d.querySelector('.learningratetxt').innerHTML = learningRate.toPrecision(1);

                            _this.controller.resetNetwork(d.querySelector('.modelid').value, d.querySelector('.optimizerid').value, learningRate, d.querySelector('.activation').value);

                            updateUI();
                            isBusy = false;

                          case 10:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function resetadvancednetwork() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                rateSlider = d.querySelector('.learningrate');
                rateLabel = d.querySelector('.learningratetxt');

                rateSlider.oninput = function () {
                  var rate = Math.pow(10, rateSlider.value);
                  rateLabel.innerText = rate.toPrecision(1);
                };

                d.querySelector('.learningrate').onchange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          resetadvancednetwork();

                        case 1:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));
                _context6.next = 19;
                return this.controller.initTrainingEnvironment(els);

              case 19:
                // controller.startTraining();
                updateUI();

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onEnter() {
        return _onEnter.apply(this, arguments);
      }

      return onEnter;
    }()
  }, {
    key: "onExit",
    value: function () {
      var _onExit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.controller.cleanupPaint();
                _context7.next = 3;
                return this.controller.pauseTraining();

              case 3:
                this.controller.cleanupValidationPreview();
                this.controller.cleanupNetwork();

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onExit() {
        return _onExit.apply(this, arguments);
      }

      return onExit;
    }()
  }]);

  return DesignNetworkSlide;
}(_slide["default"]);

exports["default"] = DesignNetworkSlide;

_slide["default"].registerClass('design-network', DesignNetworkSlide);

},{"../slide.js":18}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slide = _interopRequireDefault(require("../slide.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var IntroSlide = /*#__PURE__*/function (_Slide) {
  _inherits(IntroSlide, _Slide);

  var _super = _createSuper(IntroSlide);

  function IntroSlide() {
    _classCallCheck(this, IntroSlide);

    return _super.apply(this, arguments);
  }

  _createClass(IntroSlide, [{
    key: "onEnter",
    value: function () {
      var _onEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.controller.initIntroPaint(this.element);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onEnter() {
        return _onEnter.apply(this, arguments);
      }

      return onEnter;
    }()
  }, {
    key: "onExit",
    value: function () {
      var _onExit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.controller.cleanupPaint();

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onExit() {
        return _onExit.apply(this, arguments);
      }

      return onExit;
    }()
  }]);

  return IntroSlide;
}(_slide["default"]);

exports["default"] = IntroSlide;

_slide["default"].registerClass('intro', IntroSlide);

},{"../slide.js":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slide = _interopRequireDefault(require("../slide.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TrainingSlide = /*#__PURE__*/function (_Slide) {
  _inherits(TrainingSlide, _Slide);

  var _super = _createSuper(TrainingSlide);

  function TrainingSlide() {
    _classCallCheck(this, TrainingSlide);

    return _super.apply(this, arguments);
  }

  _createClass(TrainingSlide, [{
    key: "onEnter",
    value: function () {
      var _onEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this = this;

        var istraining, isBusy, d, resetadvancedoptions, els, updateUI, resetadvancednetwork, rateSlider, rateLabel;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.controller.testpaint = true;
                istraining = true;
                isBusy = false;
                d = document.querySelector('[data-slide=training] .train');

                resetadvancedoptions = function resetadvancedoptions() {
                  d.querySelectorAll('.parameter .select').forEach(function (select) {
                    select.querySelectorAll('.option').forEach(function (option, k) {
                      option.classList.toggle('selected', k === 0);

                      if (k === 0) {
                        select.value = option.dataset.value;
                      }
                    });
                  });
                  d.querySelector('.learningrate').value = -3;
                  d.querySelector('.learningratetxt').innerHTML = '0.001';
                };

                resetadvancedoptions();
                els = {
                  trainingProgress: d.querySelector('.imagesused .number'),
                  // validationImages: d.querySelector('#validation-images'),
                  validationAccuracy: d.querySelector('.accuracy .number'),
                  input: d.querySelector('.traininputcanvas'),
                  network: d.querySelector('.simplenetwork > .network'),
                  activations: d.querySelector('.simplenetwork > .activations'),
                  bars: d.querySelector('.bars'),
                  paint: d.querySelector('.paint')
                };

                updateUI = function updateUI() {
                  istraining = _this.controller.nn && _this.controller.nn.training;

                  if (_this.controller.nn && _this.controller.nn.trainedimages > 0) {
                    d.querySelector('.reset').classList.add('visible');
                  } else {
                    d.querySelector('.reset').classList.remove('visible');
                  }

                  d.querySelector('.paint').classList.toggle('visible', _this.controller.testpaint);
                  d.querySelector('.training').classList.toggle('visible', !_this.controller.testpaint);

                  if (_this.controller.testpaint) {
                    if (_this.controller.paint) {
                      _this.controller.paint.clear();
                    }
                  } // d.querySelector(".expertmode-on-off").innerHTML = expertmode ? "on" : "off";


                  var pr = d.querySelector('.pause-resume');

                  if (istraining) {
                    pr.classList.remove('resume');
                    pr.classList.add('pause');
                  } else {
                    pr.classList.add('resume');
                    pr.classList.remove('pause');
                  }

                  d.querySelectorAll('.parameter .select').forEach(function (select) {
                    select.querySelectorAll('.option').forEach(function (option) {
                      option.onpointerdown = function () {
                        if (select.value !== option.dataset.value) {
                          select.querySelectorAll('.option').forEach(function (ooption) {
                            ooption.classList.toggle('selected', ooption === option);
                          });
                          select.value = option.dataset.value;
                          resetadvancednetwork();
                        }
                      };
                    });
                  });
                };

                updateUI();
                /* buttons */

                /*
                  if (d.querySelector(".testit")) d.querySelector(".testit").onpointerdown = async () => {
                    controller.testpaint = true;
                    updateUI();
                    await controller.pauseTraining();
                    updateUI();
                  };
                */

                d.querySelector('.pause-resume').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!isBusy) {
                            _context.next = 2;
                            break;
                          }

                          return _context.abrupt("return");

                        case 2:
                          isBusy = true;
                          istraining = !istraining;
                          _context.next = 6;
                          return _this.controller.toggleTraining(updateUI);

                        case 6:
                          updateUI();
                          d.querySelector('.reset').classList.add('visible');
                          isBusy = false;

                        case 9:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                d.querySelector('.single-step').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!isBusy) {
                            _context2.next = 2;
                            break;
                          }

                          return _context2.abrupt("return");

                        case 2:
                          isBusy = true;

                          if (!istraining) {
                            _context2.next = 9;
                            break;
                          }

                          _context2.next = 6;
                          return _this.controller.pauseTraining(updateUI);

                        case 6:
                          // await controller.singleStep(updateUI);
                          istraining = false;
                          _context2.next = 11;
                          break;

                        case 9:
                          _context2.next = 11;
                          return _this.controller.singleStep(updateUI);

                        case 11:
                          updateUI();
                          isBusy = false;

                        case 13:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                d.querySelector('.reset').onpointerdown = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          if (!isBusy) {
                            _context3.next = 2;
                            break;
                          }

                          return _context3.abrupt("return");

                        case 2:
                          isBusy = true;
                          _context3.next = 5;
                          return _this.controller.pauseTraining(updateUI);

                        case 5:
                          _context3.next = 7;
                          return _this.controller.resetTraining(els);

                        case 7:
                          _context3.next = 9;
                          return resetadvancednetwork();

                        case 9:
                          updateUI();
                          isBusy = false;

                        case 11:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));
                /* expert mode */

                resetadvancednetwork = /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                    var learningRate;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return _this.controller.pauseTraining(updateUI);

                          case 2:
                            learningRate = Math.pow(10, d.querySelector('.learningrate').value);
                            d.querySelector('.learningratetxt').innerHTML = learningRate.toPrecision(1);

                            _this.controller.resetNetwork(d.querySelector('.modelid').value, d.querySelector('.optimizerid').value, learningRate, d.querySelector('.activation').value);

                            updateUI();

                          case 6:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function resetadvancednetwork() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                rateSlider = d.querySelector('.learningrate');
                rateLabel = d.querySelector('.learningratetxt');

                rateSlider.oninput = function () {
                  var rate = Math.pow(10, rateSlider.value);
                  rateLabel.innerText = rate.toPrecision(1);
                };

                d.querySelector('.learningrate').onchange = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return resetadvancednetwork();

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));
                _context6.next = 19;
                return this.controller.initTrainingEnvironment(els);

              case 19:
                // controller.startTraining();
                updateUI();

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function onEnter() {
        return _onEnter.apply(this, arguments);
      }

      return onEnter;
    }()
  }, {
    key: "onExit",
    value: function () {
      var _onExit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                this.controller.cleanupPaint();
                _context7.next = 3;
                return this.controller.pauseTraining();

              case 3:
                this.controller.cleanupValidationPreview();
                this.controller.cleanupNetwork();

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function onExit() {
        return _onExit.apply(this, arguments);
      }

      return onExit;
    }()
  }]);

  return TrainingSlide;
}(_slide["default"]);

exports["default"] = TrainingSlide;

_slide["default"].registerClass('training', TrainingSlide);

},{"../slide.js":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slide = _interopRequireDefault(require("../slide.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var WhatIsTrainingDataSlide = /*#__PURE__*/function (_Slide) {
  _inherits(WhatIsTrainingDataSlide, _Slide);

  var _super = _createSuper(WhatIsTrainingDataSlide);

  function WhatIsTrainingDataSlide() {
    _classCallCheck(this, WhatIsTrainingDataSlide);

    return _super.apply(this, arguments);
  }

  _createClass(WhatIsTrainingDataSlide, [{
    key: "onEnter",
    value: function () {
      var _onEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.controller.initIntroPaint(document.querySelector('#normalizepaint'));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onEnter() {
        return _onEnter.apply(this, arguments);
      }

      return onEnter;
    }()
  }, {
    key: "onExit",
    value: function () {
      var _onExit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.controller.cleanupPaint();

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onExit() {
        return _onExit.apply(this, arguments);
      }

      return onExit;
    }()
  }]);

  return WhatIsTrainingDataSlide;
}(_slide["default"]);

exports["default"] = WhatIsTrainingDataSlide;

_slide["default"].registerClass('what-is-training-data', WhatIsTrainingDataSlide);

},{"../slide.js":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable class-methods-use-this */
var Slide = /*#__PURE__*/function () {
  function Slide(element, controller) {
    _classCallCheck(this, Slide);

    this.element = element;
    this.controller = controller;
  }

  _createClass(Slide, [{
    key: "onEnter",
    value: function () {
      var _onEnter = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onEnter() {
        return _onEnter.apply(this, arguments);
      }

      return onEnter;
    }()
  }, {
    key: "onExit",
    value: function () {
      var _onExit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", Promise.resolve());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function onExit() {
        return _onExit.apply(this, arguments);
      }

      return onExit;
    }()
  }]);

  return Slide;
}();

exports["default"] = Slide;
Slide.slideClasses = {};

Slide.registerClass = function (id, slideClass) {
  Slide.slideClasses[id] = slideClass;
};

Slide.getClass = function (id) {
  return Slide.slideClasses[id];
};

},{}]},{},[12])

