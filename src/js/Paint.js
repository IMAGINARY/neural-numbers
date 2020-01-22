let SCALE_FACTOR = 9;
let LINEWIDTH = 2 * SCALE_FACTOR;

export class Paint {
  constructor(el, model, showprobability) {
    this.drawingChanged = true;
    this.model = model;

    this.showprobability = showprobability;

    // last known position
    this.pos = {
      x: 0,
      y: 0
    };

    this.createUI(el);
  }

  addEventListeners() {
    this.eventfunctions = {
      'mousemove': ((e) => this.draw(e, e.buttons == 1)),
      'mouseup': ((e) => this.normalize(1) && this.predict()),
      'mousedown': ((e) => this.setPosition(e)),
      'mouseenter': ((e) => this.setPosition(e)),
      'touchstart': ((e) => this.setPosition(e.touches[0])),
      'touchmove': ((e) => this.draw(e.touches[0], true)),
      'touchend': ((e) => this.normalize(1) && this.predict())
    };

    for (let eventname in this.eventfunctions) {
      this.drawcanvas.addEventListener(eventname, this.eventfunctions[eventname]);
    }
  }

  removeEventListeners() {
    for (let eventname in this.eventfunctions) {
      this.drawcanvas.removeEventListener(eventname, this.eventfunctions[eventname]);
    }
  }

  createUI(el) {
    this.drawcanvas = el.querySelector(".drawcanvas");
    this.normalizecanvas = el.querySelector(".normalizecanvas") || document.createElement("canvas");
    this.outputbars = el.querySelector(".bars");
    this.outputdigit = el.querySelector(".digit");
    this.inputbox = el.querySelector(".input.box");

    this.addEventListeners();

    const normalizecanvas = this.normalizecanvas;
    const drawcanvas = this.drawcanvas;

    normalizecanvas.width = normalizecanvas.height = 28;

    const updateDimensions = () => {
      SCALE_FACTOR = Math.floor(this.drawcanvas.clientWidth / 28) - 1;
      LINEWIDTH = 2 * SCALE_FACTOR;
      drawcanvas.width = drawcanvas.height = this.drawcanvas.clientWidth;
    };
    updateDimensions();
    window.onresize = () => {
      updateDimensions();
    };

    const drawcontext = this.drawcontext = this.drawcanvas.getContext('2d');
    const normalizecontext = this.normalizecontext = this.normalizecanvas.getContext('2d');

    this.drawcontext.fillStyle = "black";
    this.drawcontext.fillRect(0, 0, drawcanvas.width, drawcanvas.height);

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

      //cleanup potentially previously existing bars
      while (this.outputbars.firstChild) {
        this.outputbars.removeChild(this.outputbars.firstChild);
      }

      this.bars = [];
      for (let i = 0; i < 10; i++) {
        const cbarcontainer = document.createElement("div");
        cbarcontainer.className = "barcontainer";
        this.bars[i] = document.createElement("div");
        this.bars[i].className = "bar";
        const cbartext = document.createElement("div");
        cbartext.className = "bartxt";
        cbartext.innerHTML = i;
        cbarcontainer.appendChild(this.bars[i]);
        cbarcontainer.appendChild(cbartext);
        this.outputbars.appendChild(cbarcontainer);
      }

    }


    this.normalize(100);
    this.predict();
  }


  setPosition(e) {
    const rect = this.drawcanvas.getBoundingClientRect();
    this.pos.x = (e.clientX - rect.left);
    this.pos.y = (e.clientY - rect.top);
  }

  draw(e, hasbeendown) {
    // mouse left button must be pressed
    if (!hasbeendown) return;

    this.inputbox.classList.remove('background');
    if (this.deleteTimeout) {
      clearTimeout(this.deleteTimeout);
    }
    //clean up everything in 1.5 seconds
    this.deleteTimeout = setTimeout(() => {
      this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
      this.normalize(100);
      this.predict();
      this.inputbox.classList.add('background');
    }, 1500);
    this.drawcontext.beginPath(); // begin

    this.drawcontext.lineWidth = LINEWIDTH;
    this.drawcontext.lineCap = 'round';
    this.drawcontext.strokeStyle = 'white';

    this.drawcontext.moveTo(this.pos.x, this.pos.y); // from
    this.setPosition(e);
    this.drawcontext.lineTo(this.pos.x, this.pos.y); // to

    this.drawcontext.stroke(); // draw it!

    this.normalizecontext.fillStyle = "black";
    this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);

    this.drawingChanged = true;
    this.normalize(23 * LINEWIDTH);
    this.predict();
    //this.resetbutton.style.visibility = 'visible';
  }

  //normalize image
  normalize(SKIPFACTOR) {
    let centerx = 0;
    let centery = 0;
    let top = 1000;
    let bottom = -1000;
    let left = 1000;
    let right = -1000;
    var imgData = this.drawcontext.getImageData(0, 0, this.drawcanvas.width, this.drawcanvas.height);
    var data = imgData.data;
    var totalweight = 0;
    for (var i = 0; i < data.length; i += 4 * SKIPFACTOR) {
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

      let boxsize = Math.max(right - left, bottom - top);

      //according to MNIST normalization:
      /*
      The original black and white (bilevel) images from NIST were size normalized
      to fit in a 20x20 pixel box while preserving their aspect ratio. The
      resulting images contain grey levels as a result of the anti-aliasing
      technique used by the normalization algorithm. the images were centered
      in a 28x28 image by computing the center of mass of the pixels, and
      translating the image so as to position this point at the center of the 28x28 field.
      */
      this.normalizecontext.drawImage(this.drawcanvas, left, top, boxsize, boxsize, 14 + (20 / boxsize) * (left - centerx), 14 + (20 / boxsize) * (top - centery), 20, 20);
    } else {
      this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
    }

    return true;
  }

  predict() {
    if (this.model && this.normalizecanvas && this.drawingChanged) { // && newFrame rendered TODO?
      const [probabilities, predicted] = tf.tidy(() => {
        const imageTensor = tf.browser.fromPixels(this.normalizecanvas, 1).toFloat().mul(tf.scalar(1 / 255)).clipByValue(0, 1).reshape([1, 28, 28, 1]);
        const result = this.model.predict(imageTensor);
        return [
          result.dataSync(),
          result.argMax([-1]).dataSync()
        ];
      });

      if (this.outputbars) {
        for (let i = 0; i < 10; i++) {
          /*this.bars[i].style.top = (100 - probabilities[i] * 100) + '%';
          this.bars[i].style.bottom = '0%';
          this.bars[i].style.height = (probabilities[i] * 100) + '%';*/
          this.bars[i].dataset.probability = probabilities[i];
          this.bars[i].style = `--probability: ${probabilities[i]}`;
          //this.bars[i].style.backgroundColor = (i == predicted) ? '#f60' : '#55b';
        }
      }

      if (this.outputdigit) {
        this.outputdigit.innerHTML = probabilities[predicted] > this.showprobability ? predicted : "?";
      }

    }
  }

  cleanup() {
    this.removeEventListeners();
    this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
    this.normalize(100);
    //this.predict();
    //this.resetbutton.style.visibility = 'hidden';

    if (this.outputbars) {
      while (this.outputbars.firstChild) {
        this.outputbars.removeChild(this.outputbars.firstChild);
      }
    }
  }
}
