const NUM_EXAMPLES = 50; //TODO

export class ValidationPreview {
  constructor(data, els) {
    this.data = data;
    this.els = els;
  }

  async initValidationImages() {
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

  async updateValidationImages(model) {
    const testxs = this.examples.xs.reshape([NUM_EXAMPLES, 28, 28, 1]);
    const preds = model.predict(testxs).argMax([-1]);
    //  console.log(preds);

    const values = await preds.dataSync();
    for (let i = 0; i < NUM_EXAMPLES; i++) {
      //digittext[i].innerHTML = `${values[i]} (${examplelabels[i]})`;
      this.digittext[i].innerHTML = `${values[i]}`;
      this.digitcontainer[i].style.backgroundColor = (values[i] == this.examplelabels[i]) ? 'green' : 'red';
    }
  }

  async updateAccuracy(model) {
    const TEST_DATA_SIZE = 100; //TODO: change based on demand
    let testXs, testYs;
    [testXs, testYs] = tf.tidy(() => {
      const d = this.data.nextTestBatch(TEST_DATA_SIZE);
      return [
        d.xs.reshape([TEST_DATA_SIZE, 28, 28, 1]),
        d.labels
      ];
    });
    const acc = await model.evaluate(testXs, testYs)[1].dataSync();

console.log(this.els.validationAccuracy);
    this.els.validationAccuracy.style = `--angle: ${(1-acc)*360}deg;`;
    this.els.validationAccuracy.firstElementChild.innerHTML = `${(acc * 1000 | 0)/10} %`;
    //this.els.validationAccuracy.innerHTML = `Accuracy on validation data (approx.): ${(acc * 1000 | 0)/10} %`;


    testXs.dispose();
    testYs.dispose();
  }

  cleanup() {
    while (this.els.validationImages.firstChild) {
      this.els.validationImages.removeChild(this.els.validationImages.firstChild);
    }
  }
}
