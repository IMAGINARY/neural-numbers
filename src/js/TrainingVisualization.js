/* globals tf */
/* eslint-disable class-methods-use-this,no-param-reassign,no-bitwise */
import BarChart from './BarChart.js';

const HEIGHT = 500;
const DENSEWIDTH = 380;
const XOFFSET = 20;

export default class TrainingVisualization {
  constructor(nn, els) {
    this.els = els;
    this.nn = nn;
    this.currentDigit = new Float32Array(784);
    this.currentProbabilities = new Float32Array(10);

    this.canvas = this.els.network;
    const { canvas } = this;
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    this.ctx = canvas.getContext('2d');

    this.acanvas = this.els.activations;
    const { acanvas } = this;
    acanvas.height = acanvas.clientHeight;
    acanvas.width = acanvas.clientWidth;

    this.actx = acanvas.getContext('2d');

    this.icanvas = this.els.input;
    const { icanvas } = this;
    icanvas.height = icanvas.clientHeight;
    icanvas.width = icanvas.clientWidth;
    this.ictx = icanvas.getContext('2d');

    this.barchart = new BarChart(this.els.bars);

    // this.lastvisualization = -1;
    this.traindigit = document.createElement('canvas');
    this.traindigit.height = 28;
    this.traindigit.width = 28;

    this.lt1 = 0.08;
    this.lt2 = 0.2;
    // this.animateNetwork();

    this.renderNetwork();
    this.renderActivations();
  }

  findthreshold(arr, a, b, target) { // binary search to find good
    const m = (a + b) / 2;
    const ccnt = arr.filter(x => x * x > m * m).length;
    if (b - a < 0.001 || Math.abs(ccnt - target) < target * 0.2) { // correct up to 20%
      return m;
    }

    if (ccnt < target) {
      // to few elements for threshold=m -> threshold should be smaller than m
      return this.findthreshold(arr, a, m, target);
    }

    return this.findthreshold(arr, m, b, target);
  }


  drawdenselayer(N, M, weights, x0, y0, width, height, lastthreshold) {
    const { ctx } = this;

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
    const threshold = this.findthreshold(weights, lastthreshold * 0.8, lastthreshold * 1.2, 200);
    for (let nodeA = 0; nodeA < N; nodeA += 1) {
      for (let nodeB = 0; nodeB < M; nodeB += 1) {
        const val = weights[nodeA * M + nodeB];
        if (val * val > threshold * threshold) {
          ctx.beginPath();
          ctx.globalAlpha = Math.abs(val) * (0.3 / threshold);
          ctx.strokeStyle = val > 0 ? 'blue' : 'red';
          ctx.moveTo(x0, y0 + nodeA * height / (N - 1));

          // ctx.lineTo(x0 + width, y0 + nodeB * height / (M - 1));
          ctx.bezierCurveTo(
            x0 + width / 2, y0 + nodeA * height / (N - 1),
            x0 + width / 2, y0 + nodeB * height / (M - 1),
            x0 + width, y0 + nodeB * height / (M - 1)
          );
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    return threshold;
  }

  drawnodes(ctx, N, values, x0, y0, height, radius) {
    values = values || new Array(N).fill(0);
    for (let nodeA = 0; nodeA < N; nodeA += 1) {
      let cval = Math.max(128, 255 - (values[nodeA] * 128 | 0));
      if (radius <= 2) {
        cval = (cval + 128) / 2 | 0;
      }
      ctx.fillStyle = `rgb(${cval}, ${cval}, ${cval})`;
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

  renderNetwork() {
    if (this.nn.modelid === 'dense') {
      const { canvas, ctx } = this;
      const weights = this.nn.model.getWeights().map(w => w.dataSync());
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.lt1 = this.drawdenselayer(
        784, 100, weights[0], XOFFSET, 50, DENSEWIDTH, (HEIGHT - 100), this.lt1
      );
      this.lt2 = this.drawdenselayer(
        100, 10, weights[2], XOFFSET + DENSEWIDTH, 50, DENSEWIDTH, (HEIGHT - 100), this.lt2
      );
    }

    // this.lastvisualization = this.nn.trainedimages;
  }

  renderActivations() {
    this.actx.clearRect(0, 0, this.acanvas.width, this.acanvas.height);
    this.ictx.clearRect(0, 0, this.icanvas.width, this.icanvas.height);

    if (this.traindigit.active) {
      this.ictx.imageSmoothingEnabled = false; // no antialiasin
      this.ictx.filter = 'brightness(0.5) invert(1) brightness(0.95)';
      this.ictx.drawImage(this.traindigit, 0, 0, 28, 28, 60, 60, 28 * 6, 28 * 6);
      this.ictx.filter = 'none';
    }

    // draw bars for activations
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


    this.drawnodes(this.actx, 784, this.currentDigit, XOFFSET, 50, (HEIGHT - 100), 0.5);
    if (this.nn.modelid === 'dense') {
      this.drawnodes(this.actx, 100, this.intermediateActivations,
        XOFFSET + DENSEWIDTH, 50, (HEIGHT - 100), 1.5);
    }
    // this.drawnodes(this.octx, 10, this.currentProbabilities, 8, 50, (HEIGHT - 100), 8);

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
  async setCurrentTraining(trainXs, trainYs) {
    const trainX1 = trainXs.slice([0, 0, 0, 0], [1, 28, 28, 1]); // only the first
    const imageTensor = trainX1.reshape([28, 28, 1]); // first as image
    await tf.browser.toPixels(imageTensor, this.traindigit);
    this.traindigit.active = true;
    this.currentDigit = imageTensor.dataSync();
    this.computeActivations(trainX1);
    const trainY1 = trainYs.slice([0, 0], [1, 10]); // only the first
    // const target = trainY1.reshape([10]);
    [this.currentTarget] = trainY1.argMax([-1]).dataSync();
    this.renderNetwork();
    this.renderActivations();
    // clean up tensors
    trainX1.dispose();
    trainY1.dispose();
    imageTensor.dispose();
    // target.dispose();
  }

  async show(imageTensor, pixels) {
    this.computeActivations(imageTensor);
    this.currentDigit = pixels;
    this.traindigit.active = false;
    this.renderActivations();
  }

  computeActivations(input) {
    if (this.nn.modelid === 'dense') {
      const A1 = this.nn.model.layers[0].apply(input);
      const A2 = this.nn.model.layers[1].apply(A1);
      const A3 = this.nn.model.layers[2].apply(A2);
      this.intermediateActivations = A2.dataSync().map(x => Math.abs(x) / 2);
      this.currentProbabilities = A3.dataSync();
      [this.currentTarget] = A3.argMax([-1]).dataSync();
      A1.dispose();
      A2.dispose();
      A3.dispose();
    } else {
      const prediction = this.nn.model.predict(input);
      this.currentProbabilities = prediction.dataSync();
      [this.currentTarget] = prediction.argMax([-1]).dataSync();
      prediction.dispose();
    }
  }
}
