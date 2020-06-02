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
    this.model = null;
    this.paint = null;

    const {
      inputPlaceholder,
      showBars,
      showNormalizer,
      showTraining,
      showOutput,
    } = this.props;

    this.$element.addClass('neural-numbers-component');
    this.$element.toggleClass('with-bars', showBars);
    this.$element.toggleClass('with-normalizer', showNormalizer);
    this.$element.toggleClass('with-training', showTraining);
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

    if (inputPlaceholder) {
      $('<div>')
        .addClass('input-placeholder')
        .append(
          $('<span>').html(inputPlaceholder)
        )
        .appendTo(this.$inputStage);
    }

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
    this.model = await loadModel(modelPath);

    this.paint = new Paint(
      this.$element[0],
      this.model,
      0.5,
      false,
      NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT);
  }
}

NeuralNumbersComponent.PAINT_CLEAR_TIMEOUT = 2.2;
