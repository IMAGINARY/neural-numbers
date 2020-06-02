/* globals tf */
/* eslint-disable no-bitwise */
import BarChart from './BarChart.js';

let SCALE_FACTOR = 9;
let LINEWIDTH = 2 * SCALE_FACTOR;

export default class Paint {
  constructor(el, model, outputThreshold, nwvis = false, clearTimeoutTime = 2.2) {
    this.clearTimeoutTime = clearTimeoutTime;
    this.drawingChanged = true;
    this.model = model;
    this.nwvis = nwvis;

    this.outputThreshold = outputThreshold;

    // last known position
    this.pos = {
      x: 0,
      y: 0,
    };

    this.createUI(el);
    this.empty = true;
    this.isdown = false;
    this.pointerId = -1;
  }

  addEventListeners() {
    this.eventfunctions = {
      pointerdown: ((e) => {
        if (!this.isdown) {
          this.removeClearTimeout();
          this.setPosition(e);
          this.isdown = true;
          this.pointerId = e.pointerId;
        }
      }),
      pointermove: ((e) => {
        if (this.isdown && (this.pointerId === e.pointerId)) this.draw(e);
      }),
      pointerup: ((e) => {
        if ((this.pointerId === e.pointerId)) {
          this.setClearTimeout();
          this.isdown = false;
        }
      }),
      pointerleave: ((e) => {
        if ((this.pointerId === e.pointerId)) {
          this.setClearTimeout();
          this.isdown = false;
        }
      }),
      pointercancel: ((e) => {
        if ((this.pointerId === e.pointerId)) {
          this.setClearTimeout();
          this.isdown = false;
        }
      }),
    };

    for (const eventname in this.eventfunctions) {
      this.drawcanvas.addEventListener(eventname, this.eventfunctions[eventname], {
        passive: true,
      });
    }
  }

  removeEventListeners() {
    for (const eventname in this.eventfunctions) {
      this.drawcanvas.removeEventListener(eventname, this.eventfunctions[eventname]);
    }
  }

  createUI(el) {
    this.drawcanvas = el.querySelector('.drawcanvas');
    this.normalizecanvas = el.querySelector('.normalizecanvas') || document.createElement('canvas');
    this.outputbars = el.querySelector('.bars');
    this.outputdigit = el.querySelector('.digit');
    this.inputbox = el.querySelector('.input.box');

    this.addEventListeners();

    const { normalizecanvas, drawcanvas } = this;

    normalizecanvas.width = 28;
    normalizecanvas.height = 28;

    const updateDimensions = () => {
      SCALE_FACTOR = Math.floor(this.drawcanvas.clientWidth / 28) - 1;
      LINEWIDTH = 2 * SCALE_FACTOR;
      drawcanvas.width = this.drawcanvas.clientWidth;
      drawcanvas.height = this.drawcanvas.clientWidth;
    };
    updateDimensions();
    window.onresize = () => {
      updateDimensions();
    };

    this.drawcontext = this.drawcanvas.getContext('2d');
    this.normalizecontext = this.normalizecanvas.getContext('2d');
    // const { drawcontext, normalizecontext } = this;
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
      this.barchart = new BarChart(this.outputbars);
    }

    this.clear();
  }


  setPosition(e) {
    const rect = this.drawcanvas.getBoundingClientRect();
    this.pos.x = (e.clientX - rect.left);
    this.pos.y = (e.clientY - rect.top);
    return true;
  }

  removeClearTimeout() {
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
    return true;
  }

  setClearTimeout() {
    this.removeClearTimeout(); // remove previous clearTimeouts
    // clean up everything after specified time
    this.clearTimeout = setTimeout(() => {
      this.clear();
    }, this.clearTimeoutTime * 1000);
    return true;
  }

  draw(e) {
    this.removeClearTimeout();
    const ox = this.pos.x;
    const oy = this.pos.y;
    this.setPosition(e);
    const nx = this.pos.x;
    const ny = this.pos.y;
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
    this.predict();
    // this.resetbutton.style.visibility = 'visible';
  }

  // normalize image
  normalize(SKIPFACTOR) {
    let centerx = 0;
    let centery = 0;
    let top = 1000;
    let bottom = -1000;
    let left = 1000;
    let right = -1000;
    const imgData = this.drawcontext.getImageData(
      0, 0, this.drawcanvas.width, this.drawcanvas.height
    );
    const { data } = imgData;
    let totalweight = 0;
    for (let i = 0; i < data.length; i += 4 * SKIPFACTOR) {
      const x = (i / 4) % this.drawcanvas.width;
      const y = ((i / 4) / (this.drawcanvas.width)) | 0;
      totalweight += data[i];
      centerx += (data[i]) * x;
      centery += (data[i]) * y;

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

      const boxsize = Math.max(right - left, bottom - top);

      // according to MNIST normalization:
      /*
      The original black and white (bilevel) images from NIST were size normalized
      to fit in a 20x20 pixel box while preserving their aspect ratio. The
      resulting images contain grey levels as a result of the anti-aliasing
      technique used by the normalization algorithm. the images were centered
      in a 28x28 image by computing the center of mass of the pixels, and
      translating the image so as to position this point at the center of the 28x28 field.
      */
      this.normalizecontext.drawImage(
        this.drawcanvas,
        left, top,
        boxsize, boxsize,
        14 + (20 / boxsize) * (left - centerx),
        14 + (20 / boxsize) * (top - centery),
        20, 20
      );
    } else {
      this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
    }

    return true;
  }

  predict() {
    if (this.model && this.normalizecanvas && this.drawingChanged) { // && newFrame rendered TODO?
      const [probabilities, predicted] = tf.tidy(() => {
        const imageTensor = tf.browser
          .fromPixels(this.normalizecanvas, 1)
          .toFloat()
          .mul(tf.scalar(1 / 255))
          .clipByValue(0, 1)
          .reshape([1, 28, 28, 1]);
        if (this.nwvis) {
          this.nwvis.show(imageTensor,
            this.normalizecontext.getImageData(
              0, 0,
              this.normalizecanvas.width, this.normalizecanvas.height
            ).data.filter((d, k) => (k % 4 === 0)));
        }
        const result = this.model.predict(imageTensor);
        return [
          result.dataSync(),
          result.argMax([-1]).dataSync(),
        ];
      });

      if (this.barchart) {
        this.barchart.update(probabilities, predicted);
      }

      if (this.outputdigit) {
        this.outputdigit.innerHTML = (!this.empty && probabilities[predicted] > this.outputThreshold) ? predicted : '?';
        this.outputdigit.parentElement.classList.toggle('solved', probabilities[predicted] > this.outputThreshold);
      }
    }
    return true;
  }

  clear() {
    this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
    this.empty = true;
    this.normalize(100);
    this.predict();
    this.inputbox.classList.add('background');
  }

  cleanup() {
    this.clear();
    this.removeEventListeners();

    // this.predict();
    // this.resetbutton.style.visibility = 'hidden';

    if (this.barchart) {
      this.barchart.cleanup();
    }
  }
}
