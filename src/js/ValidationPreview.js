const NUM_EXAMPLES = 50; //TODO

export class ValidationPreview {
  constructor(data, els) {
    this.data = data;
    this.els = els;

    this.accuracy = this.displayedAccuracy = 0;
    this.isanimating = true;
    this.acccbs = [];
    this.animate();
  }

  async initValidationImages() {
    if (this.els.validationImages) {
      this.digittext = [];
      this.digitcontainer = [];
      // Get the examples
      const examples = this.examples = this.data.nextTestBatch(NUM_EXAMPLES);
      const examplelabels = this.examplelabels = await examples.labels.argMax([-1]).dataSync();

      const container = document.createElement('div');
      for (let i = 0; i < NUM_EXAMPLES; i++) {
        const imageTensor = tf.tidy(() => {
          // Reshape the image to 28x28 px
          return examples.xs
            .slice([i, 0], [1, examples.xs.shape[1]])
            .reshape([28, 28, 1]);
        });

        const canvas = document.createElement('canvas');
        this.digitcontainer[i] = document.createElement('div');

        await tf.browser.toPixels(imageTensor, canvas);
        this.digitcontainer[i].appendChild(canvas);
        this.digittext[i] = document.createElement('div');
        this.digitcontainer[i].appendChild(this.digittext[i]);
        container.appendChild(this.digitcontainer[i]);
        imageTensor.dispose();
      }
      //
      this.els.validationImages.appendChild(container);
      //document.body.appendChild(container);    
    }

  }

  async updateValidationImages(model) {
    const values = tf.tidy(() => {
      const testxs = this.examples.xs.reshape([NUM_EXAMPLES, 28, 28, 1]);
      return model.predict(testxs).argMax([-1]).dataSync();
    });
    //  console.log(preds);

    for (let i = 0; i < NUM_EXAMPLES; i++) {
      //digittext[i].innerHTML = `${values[i]} (${examplelabels[i]})`;
      this.digittext[i].innerHTML = `${values[i]}`;
      this.digitcontainer[i].style.backgroundColor = (values[i] == this.examplelabels[i]) ? 'green' : 'red';
    }
  }

  async updateAccuracy(model) {
    const TEST_DATA_SIZE = 100; //TODO: change based on demand
    let testXs, testYs;
    this.accuracy = tf.tidy(() => {
      const d = this.data.nextTestBatch(TEST_DATA_SIZE);
      const testXs = d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]);
      const testYs = d.labels;
      return model.evaluate(testXs, testYs)[1].dataSync();
    });
    //this.els.validationAccuracy.innerHTML = `Accuracy on validation data (approx.): ${(acc * 1000 | 0)/10} %`;


    //run all callbacks for a lower accuracy
    this.acccbs.filter(p => p.acc <= this.accuracy).map(p => (p.cb)());
    //delete all callbacks that have been run
    this.acccbs = this.acccbs.filter(p => p.acc > this.accuracy);
  }

  animate() {
    if (!this.isanimating)
      return;
    const alpha = 0.05;
    this.displayedAccuracy = (1 - alpha) * this.displayedAccuracy + alpha * this.accuracy;
    //this.els.validationAccuracy.style = `--angle: ${(1-this.displayedAccuracy)*360}deg;`;
    //this.els.validationAccuracy.firstElementChild.innerHTML = `${(this.displayedAccuracy < 0.95) ? Math.round(this.displayedAccuracy * 100) : Math.round(this.displayedAccuracy * 1000) /10}%`;
    this.els.validationAccuracy.innerHTML = `${(this.displayedAccuracy < 0.95) ? Math.round(this.displayedAccuracy * 100) : Math.round(this.displayedAccuracy * 1000) /10}%`;
    window.requestAnimationFrame(() => this.animate());
  }

  cleanup() {
    while (this.els.validationImages.firstChild) {
      this.els.validationImages.removeChild(this.els.validationImages.firstChild);
    }
    this.isanimating = false;
  }

  addAccuracyCallback(acc, cb) {
    this.acccbs.push({
      cb: cb,
      acc: acc
    });
  }
}
