/* globals tf */

import Paint from './Paint';

const models = {};

async function loadModel(path) {
  if (path && !(path in models)) {
    models[path] = await tf.loadLayersModel(path);
  }
  return models[path];
}

export default class NeuralNumbersComponent {
  constructor(element, props) {
    this.$element = $(element);
    this.props = props;
    this.defaultModel = null;
    this.model = null;
    this.paint = null;

    const {
      inputPlaceholder,
      safeInputPlaceholder,
      showBars,
      showNormalizer,
      showOutput,
      verticalBars
    } = this.props;

    this.$element.addClass('neural-numbers-component');
    this.$element.toggleClass('with-bars', showBars);
    this.$element.toggleClass('with-normalizer', showNormalizer);
    this.$element.toggleClass('with-output', showOutput);

    this.$inputStage = $('<div>')
      .addClass(['stage', 'stage-input', 'input', 'box'])
      .appendTo(this.$element);

    this.$drawCanvas = $('<canvas>')
      .addClass(['drawcanvas', 'input-canvas'])
      .appendTo(
        $('<div>')
          .addClass('input-canvas-wrapper')
          .appendTo(this.$inputStage)
      );

    const placeholderText = $('<span>');
    if (inputPlaceholder) {
      placeholderText.html(inputPlaceholder);
    } else if (safeInputPlaceholder) {
      placeholderText.text(safeInputPlaceholder);
    }
    $('<div>')
        .addClass('input-placeholder')
        .append(placeholderText)
        .appendTo(this.$inputStage);

    this.$normalizeStage = $('<div>')
      .addClass(['stage', 'stage-normalize'])
      .appendTo(this.$element);

    this.$normalizeCanvas = $('<canvas>')
      .addClass('normalizecanvas')
      .appendTo($('<div>')
        .addClass('normalize-canvas-wrapper')
        .appendTo(this.$normalizeStage));

    this.$probabilityStage = $('<div>')
      .addClass(['stage', 'stage-bars'])
      .appendTo(this.$element);

    this.$bars = $('<div>')
      .addClass('bars')
      .toggleClass('bars-vertical', verticalBars || false)
      .appendTo(this.$probabilityStage);

    this.$outputStage = $('<div>')
      .addClass(['stage', 'stage-output'])
      .appendTo(this.$element);

    this.$output = $('<div>')
      .addClass(['output', 'digit'])
      .appendTo($('<div>')
        .addClass('output-wrapper')
        .appendTo(this.$outputStage));
  }

  async init() {
    const { modelPath } = this.props;
    this.defaultModel = await loadModel(modelPath);
    this.model = this.defaultModel;

    this.paint = new Paint(
      this.$element[0],
      this.model,
      0.5,
      false,
      NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT);
  }

  setModel(model = null) {
    if (model === null) {
      model = this.defaultModel;
    }
    this.model = model;
    this.paint.swapModel(model);
  }

  getBarChart() {
    return this.paint.barchart;
  }

  disableDrawing() {
    this.paint.disableDrawing();
  }

  enableDrawing() {
    this.paint.enableDrawing();
  }

  setClearTimeout() {
    this.paint.setClearTimeout();
  }

  setClearOnInput() {
    this.paint.setClearOnInput();
  }
}

NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT = 2.2;
