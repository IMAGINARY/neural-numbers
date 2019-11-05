(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paint = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SCALE_FACTOR = 10;

var Paint =
/*#__PURE__*/
function () {
  function Paint(element, model) {
    _classCallCheck(this, Paint);

    this.drawingChanged = true;
    this.element = element;
    this.model = model;
    this.createUI();
  }

  _createClass(Paint, [{
    key: "createUI",
    value: function createUI() {
      console.log("Creating Paint");
      var canvas = this.canvas = document.createElement("canvas");
      var inputcanvas = this.inputcanvas = document.createElement("canvas");
      canvas.width = canvas.height = 28;
      inputcanvas.width = inputcanvas.height = 28 * SCALE_FACTOR;
      canvas.style.border = '1px solid blue';
      var inputctx = this.inputctx = this.inputcanvas.getContext('2d');
      var ctx = this.ctx = this.canvas.getContext('2d');
      inputctx.fillStyle = "black";
      inputctx.fillRect(0, 0, inputcanvas.width, inputcanvas.height);
      canvas.style.width = 28 * SCALE_FACTOR + 'px';
      canvas.style.height = 28 * SCALE_FACTOR + 'px';
      canvas.style.imageRendering = 'pixelated'; // last known position

      var pos = {
        x: 0,
        y: 0
      };
      var top = 1000,
          bottom = -1000,
          left = 1000,
          right = -1000;
      var LINEWIDTH = 2 * SCALE_FACTOR;

      function setPosition(e) {
        pos.x = e.clientX - inputcanvas.offsetLeft;
        pos.y = e.clientY - inputcanvas.offsetTop;
        top = Math.min(top, pos.y - LINEWIDTH / 2);
        bottom = Math.max(bottom, pos.y + LINEWIDTH / 2);
        left = Math.min(left, pos.x - LINEWIDTH / 2);
        right = Math.max(right, pos.x + LINEWIDTH / 2);
      }

      inputcanvas.addEventListener('mousemove', draw);
      inputcanvas.addEventListener('mousedown', setPosition);
      inputcanvas.addEventListener('mouseenter', setPosition);

      function draw(e) {
        // mouse left button must be pressed
        if (e.buttons !== 1) return;
        inputctx.beginPath(); // begin

        inputctx.lineWidth = LINEWIDTH;
        inputctx.lineCap = 'round';
        inputctx.strokeStyle = 'white';
        inputctx.moveTo(pos.x, pos.y); // from

        setPosition(e);
        inputctx.lineTo(pos.x, pos.y); // to

        inputctx.stroke(); // draw it!

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var centerx = 0;
        var centery = 0;
        var imgData = inputctx.getImageData(0, 0, inputcanvas.width, inputcanvas.height);
        var data = imgData.data;
        var totalweight = 0;
        var SKIPFACTOR = LINEWIDTH;

        for (var i = 0; i < data.length; i += 4 * SKIPFACTOR) {
          var x = i / 4 % inputcanvas.width;
          var y = i / 4 / inputcanvas.width | 0;
          totalweight += data[i];
          centerx += data[i] * x;
          centery += data[i] * y;
        }

        centerx /= totalweight;
        centery /= totalweight; //console.log(`computed center: ${centerx}, ${centery}`);

        var boxsize = Math.max(right - left, bottom - top); //according to MNIST normalization:

        /*
        The original black and white (bilevel) images from NIST were size normalized
        to fit in a 20x20 pixel box while preserving their aspect ratio. The
        resulting images contain grey levels as a result of the anti-aliasing
        technique used by the normalization algorithm. the images were centered
        in a 28x28 image by computing the center of mass of the pixels, and
        translating the image so as to position this point at the center of the 28x28 field.
        */

        ctx.drawImage(inputcanvas, left, top, boxsize, boxsize, 14 + 20 / boxsize * (left - centerx), 14 + 20 / boxsize * (top - centery), 20, 20);
        this.drawingChanged = true;
      }

      var resetbutton = document.createElement("button");
      resetbutton.innerHTML = "reset";
      resetbutton.addEventListener('click', function () {
        top = 1000;
        bottom = -1000;
        left = 1000;
        right = -1000;
        inputctx.fillRect(0, 0, inputcanvas.width, inputcanvas.height);
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      this.element.appendChild(document.createTextNode("Paint here:"));
      this.element.appendChild(inputcanvas);
      this.element.appendChild(document.createTextNode("normalized image:"));
      this.element.appendChild(canvas);
      this.element.appendChild(resetbutton);
      this.bars = [];

      for (var i = 0; i < 10; i++) {
        var cbarcontainer = document.createElement("div");
        cbarcontainer.style.width = '100px';
        cbarcontainer.style.height = '1em';
        this.bars[i] = document.createElement("div");
        this.bars[i].style.width = '0%';
        this.bars[i].style.height = '95%';
        this.bars[i].style.backgroundColor = 'red';
        this.bars[i].innerHTML = i;
        cbarcontainer.appendChild(this.bars[i]);
        this.element.appendChild(cbarcontainer);
      }

      this.output = document.createElement("div");
      this.element.appendChild(this.output);
    }
  }, {
    key: "createNNoutput",
    value: function createNNoutput() {//TODO
    }
  }, {
    key: "predict",
    value: function predict() {
      if (this.model && this.canvas && this.drawingChanged) {
        var imageTensor = tf.browser.fromPixels(this.canvas, 1).toFloat().mul(tf.scalar(1 / 255)).clipByValue(0, 1).reshape([1, 28, 28, 1]); //tf.browser.fromPixels(this.canvas, 1).print();

        var result = this.model.predict(imageTensor);
        var probabilities = result.dataSync();
        var predicted = result.argMax([-1]).dataSync();

        for (var i = 0; i < 10; i++) {
          this.bars[i].style.width = probabilities[i] * 100 + '%';
          this.bars[i].style.backgroundColor = i == predicted ? 'blue' : 'gray';
        }
      }
    }
  }]);

  return Paint;
}();

exports.Paint = Paint;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

var _Paint = require("./Paint.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var View =
/*#__PURE__*/
function () {
  function View() {
    _classCallCheck(this, View);

    this.createEvents();
  }

  _createClass(View, [{
    key: "createEvents",
    value: function createEvents() {
      var _this = this;

      window.addEventListener('DOMContentLoaded', function (event) {
        _this.slides = document.querySelectorAll('.slide');

        _this.enterSlideByURL();
      });

      window.onhashchange = function (event) {
        _this.enterSlideByURL();
      };
    }
  }, {
    key: "enterSlideByURL",
    value: function enterSlideByURL() {
      var hash = window.location.hash.substring(1);

      if (hash === "") {
        hash = 1;
      } else {
        hash = hash | 0;
      }

      this.enterSlide(hash);
    }
  }, {
    key: "enterSlide",
    value: function enterSlide(id) {
      var _this2 = this;

      this.slides.forEach(function (slide) {
        if (slide.onExit) slide.onExit();
        slide.className = 'slide';
      });

      if (this.slides[id]) {
        this.slides[id].classList.add('visible');
        setTimeout(function () {
          _this2.slides[id].classList.add('entering');
        }, 0);

        if (this.slides[id].onEnter) {
          this.slides[id].onEnter(this);
        }
      }
    }
  }, {
    key: "initIntroPaint",
    value: function initIntroPaint(el) {
      el.innerHTML = "Hello from View"; //TODO

      console.log("A"); //const model = await tf.loadLayersModel('assets/models/my-model.json');

      console.log("B"); //new Paint(el, model);
    }
  }]);

  return View;
}();

exports.View = View;

},{"./Paint.js":1}],3:[function(require,module,exports){
"use strict";

var _View = require("./View.js");

// eslint-disable-next-line import/no-extraneous-dependencies
// import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
var view = new _View.View();

},{"./View.js":2}]},{},[3]);
