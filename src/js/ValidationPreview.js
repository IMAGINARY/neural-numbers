const NUM_EXAMPLES = 42; //TODO

export class ValidationPreview {
  constructor(data) {
    this.data = data;
  }

  async initValidationImages(els) {
    this.digittext = [];
    this.digitcontainer = [];
    // Get the examples
    const examples = this.examples = this.data.nextTestBatch(NUM_EXAMPLES);
    const examplelabels = this.examplelabels = await examples.labels.argMax([-1]).dataSync();

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';
    for (let i = 0; i < NUM_EXAMPLES; i++) {
      const imageTensor = tf.tidy(() => {
        // Reshape the image to 28x28 px
        return examples.xs
          .slice([i, 0], [1, examples.xs.shape[1]])
          .reshape([28, 28, 1]);
      });

      const canvas = document.createElement('canvas');
      this.digitcontainer[i] = document.createElement('div');
      canvas.width = 28;
      canvas.height = 28;
      canvas.style = 'margin: 2px;';
      await tf.browser.toPixels(imageTensor, canvas);
      this.digitcontainer[i].appendChild(canvas);
      this.digittext[i] = document.createElement('div');
      this.digitcontainer[i].appendChild(this.digittext[i]);
      container.appendChild(this.digitcontainer[i]);
      imageTensor.dispose();
    }
    //
    els.validationImages.appendChild(container);
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
}
