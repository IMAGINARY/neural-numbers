(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;

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
        hash = 0;
      } else {
        hash = (hash | 0) - 1;
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
        if (this.slides[id].onEnter) this.slides[id].onEnter();
      }
    }
  }]);

  return View;
}();

exports.View = View;

},{}],2:[function(require,module,exports){
"use strict";

var _View = require("./View.js");

// eslint-disable-next-line import/no-extraneous-dependencies
// import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
var view = new _View.View();

},{"./View.js":1}]},{},[2]);
