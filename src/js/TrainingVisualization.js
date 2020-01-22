/* jshint esversion: 8*/

const HEIGHT = 500;

export class TrainingVisualization {
  constructor(nn, els) {
    this.els = els;
    this.nn = nn;
    this.currentDigit = new Float32Array(784);
    this.currentProbabilities = this.currentTarget = new Float32Array(10);

    const canvas = this.canvas = this.els.network;
    canvas.height = canvas.clientHeight;
    canvas.width = canvas.clientWidth;
    const ctx = this.ctx = canvas.getContext('2d');

    canvas.addEventListener("resize", (e) => this.updatescaling());
    this.updatescaling();
    //this.lastvisualization = -1;

    this.traindigit = document.createElement("canvas");
    this.traindigit.width = this.traindigit.height = 28;

    this.lt1 = 0.08;
    this.lt2 = 0.2;
    //this.animateNetwork();

    this.renderNetwork();
  }

  updatescaling() {
    const ratio = this.canvas.clientHeight / HEIGHT;
    this.ctx.scale(ratio, ratio);
  }

  findthreshold(arr, a, b, target) { //binary search to find good
    const m = (a + b) / 2;
    const ccnt = arr.filter(x => x * x > m * m).length;
    if (b - a < 0.001 || Math.abs(ccnt - target) < target * 0.2) { //correct up to 20%
      return m;
    } else if (ccnt < target) { //to few elements for threshold=m -> threshold should be smaller than m
      return this.findthreshold(arr, a, m, target);
    } else { //to many elements
      return this.findthreshold(arr, m, b, target);
    }
  }


  drawdenselayer(N, M, weights, x0, y0, width, height, lastthreshold) {
    const ctx = this.ctx;

    /*
    //takes about 120ms for 78400 weights

    const topWeights = Array.from(weights).map((v, k) => [Math.abs(v), k]).sort((a, b) => (a[0] - b[0])).slice(Math.max(0, weights.length - 100));
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

    //takes about 40ms for 784 weights
    let threshold = this.findthreshold(weights, lastthreshold * 0.8, lastthreshold * 1.2, 200);
    for (let nodeA = 0; nodeA < N; nodeA++) {
      for (let nodeB = 0; nodeB < M; nodeB++) {
        const val = weights[nodeA * M + nodeB];
        if (val * val > threshold * threshold) {
          ctx.beginPath();
          ctx.globalAlpha = Math.abs(val) * (0.3 / threshold);
          ctx.strokeStyle = val > 0 ? "blue" : "red";
          ctx.moveTo(x0, y0 + nodeA * height / (N - 1));


          //ctx.lineTo(x0 + width, y0 + nodeB * height / (M - 1));
          ctx.bezierCurveTo(x0 + width / 2, y0 + nodeA * height / (N - 1), x0 + width / 2, y0 + nodeB * height / (M - 1), x0 + width, y0 + nodeB * height / (M - 1));
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    return threshold;
  }

  drawnodes(N, values, x0, y0, height, radius) {
    values = values || new Array(N).fill(0);
    const ctx = this.ctx;
    for (let nodeA = 0; nodeA < N; nodeA++) {
      const cval = values[nodeA] * 255 | 0;
      ctx.fillStyle = `rgb(${cval}, ${cval}, ${cval})`;
      ctx.beginPath();
      ctx.arc(x0, y0 + nodeA * height / (N - 1), radius, 0, 2 * Math.PI, false);
      //ctx.stroke();
      ctx.fill();
    }
  }


  renderNetwork() {
    const canvas = this.canvas;
    const ctx = this.ctx;
    const weights = this.nn.model.getWeights().map(w => w.dataSync());
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.lt1 = this.drawdenselayer(784, 100, weights[0], 200, 50, 250, (HEIGHT - 100), this.lt1);
    this.drawnodes(100, this.intermediateActivations, 450, 50, (HEIGHT - 100), 1);
    this.lt2 = this.drawdenselayer(100, 10, weights[2], 450, 50, 250, (HEIGHT - 100), this.lt2);
    this.renderCurrentTraining();

    //draw digits
    ctx.fillStyle = 'black';
    for (let k = 0; k < 10; k++) {
      const x0 = 770;
      const y0 = 50 + (HEIGHT - 100) * k / (10 - 1);
      ctx.font = "20px Roboto";
      ctx.fillText(k, x0, y0 + 8);
    }
    //this.lastvisualization = this.nn.trainedimages;
  }

  /*
    animateNetwork() {
      if (this.nn.trainedimages > this.lastvisualization + Math.min(512, 0.1 * this.nn.trainedimages)) {
        this.renderNetwork();
      }
      requestAnimationFrame(() => this.animateNetwork());
    }
  */
  async setCurrentTraining(trainXs, trainYs) {
    const trainX1 = trainXs.slice([0, 0, 0, 0], [1, 28, 28, 1]); //only the first
    const imageTensor = trainX1.reshape([28, 28, 1]); //first as image
    await tf.browser.toPixels(imageTensor, this.traindigit);
    this.currentDigit = imageTensor.dataSync();

    const A1 = this.nn.model.layers[0].apply(trainX1);
    const A2 = this.nn.model.layers[1].apply(A1);
    const A3 = this.nn.model.layers[2].apply(A2);

    this.intermediateActivations = A2.dataSync().map(x => Math.abs(x) / 2);


    this.currentProbabilities = A3.dataSync();

    const trainY1 = trainYs.slice([0, 0], [1, 10]); //only the first
    //const target = trainY1.reshape([10]);
    this.currentTarget = trainY1.dataSync();

    this.renderNetwork();

    //clean up tensors
    trainX1.dispose();
    trainY1.dispose();
    imageTensor.dispose();
    A1.dispose();
    A2.dispose();
    A3.dispose();
    //target.dispose();
  }

  renderCurrentTraining() {
    const ctx = this.ctx;
    this.drawnodes(784, this.currentDigit, 200, 50, (HEIGHT - 100), 0.5);
    this.drawnodes(10, this.currentProbabilities, 700, 50, (HEIGHT - 100), 5);
    this.drawnodes(10, this.currentTarget, 750, 50, (HEIGHT - 100), 5);
    ctx.imageSmoothingEnabled = false; //no antialiasing
    ctx.filter = "brightness(0.5) invert(1)";
    ctx.drawImage(this.traindigit, 0, 0, 28, 28, 50, HEIGHT / 2 - 4 * 28 / 2, 28 * 4, 28 * 4);
    ctx.filter = "none";
  }
}
