const SCALE_FACTOR = 10;


export class Paint {
  constructor(element, model) {
    this.drawingChanged = true;
    this.element = element;
    this.model = model;
    this.createUI();
  }

  createUI() {
    console.log("Creating Paint");
    const canvas = this.canvas = document.createElement("canvas");
    const inputcanvas = this.inputcanvas = document.createElement("canvas");
    canvas.width = canvas.height = 28;
    inputcanvas.width = inputcanvas.height = 28 * SCALE_FACTOR;
    canvas.style.border = '1px solid blue';
    const inputctx = this.inputctx = this.inputcanvas.getContext('2d');
    const ctx = this.ctx = this.canvas.getContext('2d');

    inputctx.fillStyle = "black";
    inputctx.fillRect(0, 0, inputcanvas.width, inputcanvas.height);

    canvas.style.width = 28 * SCALE_FACTOR + 'px';
    canvas.style.height = 28 * SCALE_FACTOR + 'px';
    canvas.style.imageRendering = 'pixelated';


    // last known position
    var pos = {
      x: 0,
      y: 0
    };

    var top = 1000,
      bottom = -1000,
      left = 1000,
      right = -1000;

    const LINEWIDTH = 2 * SCALE_FACTOR;

    function setPosition(e) {
      pos.x = (e.clientX - inputcanvas.offsetLeft);
      pos.y = (e.clientY - inputcanvas.offsetTop);
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
      let centerx = 0;
      let centery = 0;
      var imgData = inputctx.getImageData(0, 0, inputcanvas.width, inputcanvas.height);
      var data = imgData.data;
      var totalweight = 0;
      const SKIPFACTOR = LINEWIDTH;
      for (var i = 0; i < data.length; i += 4 * SKIPFACTOR) {
        const x = (i / 4) % inputcanvas.width;
        const y = ((i / 4) / (inputcanvas.width)) | 0;
        totalweight += data[i];
        centerx += (data[i]) * x;
        centery += (data[i]) * y;
      }
      centerx /= totalweight;
      centery /= totalweight;
      //console.log(`computed center: ${centerx}, ${centery}`);

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
      ctx.drawImage(inputcanvas, left, top, boxsize, boxsize, 14 + (20 / boxsize) * (left - centerx), 14 + (20 / boxsize) * (top - centery), 20, 20);
      this.drawingChanged = true;
    }

    const resetbutton = document.createElement("button");
    resetbutton.innerHTML = "reset";
    resetbutton.addEventListener('click', () => {
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
    for (let i = 0; i < 10; i++) {
      const cbarcontainer = document.createElement("div");
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

  createNNoutput() {
    //TODO
  }

  predict() {
    if (this.model && this.canvas && this.drawingChanged) {
      const imageTensor = tf.browser.fromPixels(this.canvas, 1).toFloat().mul(tf.scalar(1 / 255)).clipByValue(0, 1).reshape([1, 28, 28, 1]);
      //tf.browser.fromPixels(this.canvas, 1).print();

      const result = this.model.predict(imageTensor);
      const probabilities = result.dataSync();
      const predicted = result.argMax([-1]).dataSync();

      for (let i = 0; i < 10; i++) {
        this.bars[i].style.width = (probabilities[i] * 100) + '%';
        this.bars[i].style.backgroundColor = (i == predicted) ? 'blue' : 'gray';
      }
    }
  }
}
