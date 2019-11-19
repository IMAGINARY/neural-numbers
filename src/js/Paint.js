const SCALE_FACTOR = 10;
const LINEWIDTH = 2 * SCALE_FACTOR;

export class Paint {
  constructor(element, model) {
    this.drawingChanged = true;
    this.element = element;
    this.model = model;
    this.createUI();
  }

  createUI() {
    const normalizecanvas = this.normalizecanvas = document.createElement("canvas");
    const drawcanvas = this.drawcanvas = document.createElement("canvas");
    normalizecanvas.width = normalizecanvas.height = 28;
    drawcanvas.width = drawcanvas.height = 28 * SCALE_FACTOR;
    const drawcontext = this.drawcontext = this.drawcanvas.getContext('2d');
    const normalizecontext = this.normalizecontext = this.normalizecanvas.getContext('2d');

    this.drawcontext.fillStyle = "black";
    this.drawcontext.fillRect(0, 0, drawcanvas.width, drawcanvas.height);

    normalizecanvas.style.width = 28 * SCALE_FACTOR + 'px';
    normalizecanvas.style.height = 28 * SCALE_FACTOR + 'px';
    normalizecanvas.style.imageRendering = 'pixelated';

    // last known position
    this.pos = {
      x: 0,
      y: 0
    };

    this.top = 1000;
    this.bottom = -1000;
    this.left = 1000;
    this.right = -1000;


    drawcanvas.addEventListener('mousemove', (e) => this.draw(e));
    drawcanvas.addEventListener('mouseup', (e) => this.predict(e));
    drawcanvas.addEventListener('mousedown', (e) => this.setPosition(e));
    drawcanvas.addEventListener('mouseenter', (e) => this.setPosition(e));


    const resetbutton = document.createElement("button");
    resetbutton.innerHTML = "reset";
    resetbutton.addEventListener('click', () => {
      this.top = 1000;
      this.bottom = -1000;
      this.left = 1000;
      this.right = -1000;
      this.drawcontext.fillRect(0, 0, this.drawcanvas.width, this.drawcanvas.height);
      this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
    });


    this.element.appendChild(document.createTextNode("Paint here:"));//TODO
    this.element.appendChild(drawcanvas);
    this.element.appendChild(document.createTextNode("what the network sees:"));//TODO
    this.element.appendChild(normalizecanvas);
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


  setPosition(e) {
    const rect = this.drawcanvas.getBoundingClientRect();
    this.pos.x = (e.clientX - rect.left);
    this.pos.y = (e.clientY - rect.top);
    this.top = Math.min(this.top, this.pos.y - LINEWIDTH / 2);
    this.bottom = Math.max(this.bottom, this.pos.y + LINEWIDTH / 2);
    this.left = Math.min(this.left, this.pos.x - LINEWIDTH / 2);
    this.right = Math.max(this.right, this.pos.x + LINEWIDTH / 2);
  }

  draw(e) {
    // mouse left button must be pressed
    if (e.buttons !== 1) return;
    this.drawcontext.beginPath(); // begin

    this.drawcontext.lineWidth = LINEWIDTH;
    console.log("set lineWidth to " + this.drawcontext.linewidth);
    this.drawcontext.lineCap = 'round';
    this.drawcontext.strokeStyle = 'white';

    this.drawcontext.moveTo(this.pos.x, this.pos.y); // from
    this.setPosition(e);
    this.drawcontext.lineTo(this.pos.x, this.pos.y); // to

    this.drawcontext.stroke(); // draw it!


    this.normalizecontext.fillStyle = "black";
    this.normalizecontext.fillRect(0, 0, this.normalizecanvas.width, this.normalizecanvas.height);
    let centerx = 0;
    let centery = 0;
    var imgData = this.drawcontext.getImageData(0, 0, this.drawcanvas.width, this.drawcanvas.height);
    var data = imgData.data;
    var totalweight = 0;
    const SKIPFACTOR = LINEWIDTH;
    for (var i = 0; i < data.length; i += 4 * SKIPFACTOR) {
      const x = (i / 4) % this.drawcanvas.width;
      const y = ((i / 4) / (this.drawcanvas.width)) | 0;
      totalweight += data[i];
      centerx += (data[i]) * x;
      centery += (data[i]) * y;
    }
    centerx /= totalweight;
    centery /= totalweight;
    //console.log(`computed center: ${centerx}, ${centery}`);

    let boxsize = Math.max(this.right - this.left, this.bottom - this.top);

    //according to MNIST normalization:
    /*
    The original black and white (bilevel) images from NIST were size normalized
    to fit in a 20x20 pixel box while preserving their aspect ratio. The
    resulting images contain grey levels as a result of the anti-aliasing
    technique used by the normalization algorithm. the images were centered
    in a 28x28 image by computing the center of mass of the pixels, and
    translating the image so as to position this point at the center of the 28x28 field.
    */
    this.normalizecontext.drawImage(this.drawcanvas, this.left, this.top, boxsize, boxsize, 14 + (20 / boxsize) * (this.left - centerx), 14 + (20 / boxsize) * (this.top - centery), 20, 20);
    this.drawingChanged = true;
    this.predict();
  }

  createNNoutput() {
    //TODO
  }

  predict() {
    if (this.model && this.normalizecanvas && this.drawingChanged) {
      const imageTensor = tf.browser.fromPixels(this.normalizecanvas, 1).toFloat().mul(tf.scalar(1 / 255)).clipByValue(0, 1).reshape([1, 28, 28, 1]);
      //tf.browser.fromPixels(this.normalizecanvas, 1).print();

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
