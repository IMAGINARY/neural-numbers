/* eslint-disable no-await-in-loop */
/* globals tf */
const NUM_EXAMPLES = 50; // TODO

export default class ValidationPreview {
  constructor(data, els) {
    this.data = data;
    this.els = els;

    this.displayedAccuracy = 0;
    this.accuracy = this.displayedAccuracy;
    this.isanimating = true;
    this.acccbs = [];
    // this.animate();
  }

  async initValidationImages() {
    if (this.els.validationImages) {
      this.digittext = [];
      this.digitcontainer = [];
      // Get the examples
      this.examples = this.data.nextTestBatch(NUM_EXAMPLES);
      const { examples } = this;
      this.examplelabels = await examples.labels.argMax([-1]).dataSync();

      const container = document.createElement('div');
      for (let i = 0; i < NUM_EXAMPLES; i += 1) {
        // Reshape the image to 28x28 px
        const imageTensor = tf.tidy(() => examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]));

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
      // document.body.appendChild(container);
    }
  }

  async updateValidationImages(model) {
    if (this.els.validationImages) {
      const values = tf.tidy(() => {
        const testxs = this.examples.xs.reshape([NUM_EXAMPLES, 28, 28, 1]);
        return model.predict(testxs).argMax([-1]).dataSync();
      });
      //  console.log(preds);

      for (let i = 0; i < NUM_EXAMPLES; i += 1) {
        // digittext[i].innerHTML = `${values[i]} (${examplelabels[i]})`;
        this.digittext[i].innerHTML = `${values[i]}`;
        this.digitcontainer[i].style.backgroundColor = (values[i] === this.examplelabels[i]) ? 'green' : 'red';
      }
    }
  }

  async updateAccuracy(model, TEST_DATA_SIZE = 100) {
    this.accuracy = tf.tidy(() => {
      const d = this.data.nextTestBatch(TEST_DATA_SIZE);
      const testXs = d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]);
      const testYs = d.labels;
      return model.evaluate(testXs, testYs)[1].dataSync();
    });

    if (TEST_DATA_SIZE < 1000 && this.accuracy > 0.9) {
      // compute more exact accuracy if it is close to 100%
      await this.updateAccuracy(model, 1000);
    }
    // this.els.validationAccuracy.innerHTML =
    // `Accuracy on validation data (approx.): ${(acc * 1000 | 0)/10} %`;
    this.els.validationAccuracy.innerHTML = `${(this.accuracy < 0.9)
      ? Math.round(this.accuracy * 100)
      : Math.round(this.accuracy * 1000) / 10}%`;

    // run all callbacks for a lower accuracy
    this.acccbs.filter(p => p.acc <= this.accuracy).map(p => (p.cb)());
    // delete all callbacks that have been run
    this.acccbs = this.acccbs.filter(p => p.acc > this.accuracy);
  }

  /* This function is not used anymore: smooth rendering of accuracy */
  animate() {
    if (!this.isanimating) {
      return;
    }
    const alpha = 0.05;
    this.displayedAccuracy = (1 - alpha) * this.displayedAccuracy + alpha * this.accuracy;
    // this.els.validationAccuracy.style = `--angle: ${(1-this.displayedAccuracy)*360}deg;`;
    // const accuracy = (this.displayedAccuracy < 0.95)
    //  ? Math.round(this.displayedAccuracy * 100)
    //  : Math.round(this.displayedAccuracy * 1000) /10;
    // this.els.validationAccuracy.firstElementChild.innerHTML = `${accuracy}%`;
    const accuracy = (this.displayedAccuracy < 0.95)
      ? Math.round(this.displayedAccuracy * 100)
      : Math.round(this.displayedAccuracy * 1000) / 10;
    this.els.validationAccuracy.innerHTML = `${accuracy}%`;
    window.requestAnimationFrame(() => this.animate());
  }

  cleanup() {
    while (this.els.validationImages && this.els.validationImages.firstChild) {
      this.els.validationImages.removeChild(this.els.validationImages.firstChild);
    }
    this.isanimating = false;
  }

  addAccuracyCallback(acc, cb) {
    this.acccbs.push({
      cb,
      acc,
    });
  }
}
