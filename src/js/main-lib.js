import NeuralNumbersComponent from './neural-numbers-component';
import TrainingController from './training-controller';
import TrainingComponent from "./training-component";

function attrFlag(attribute, defaultValue) {
  if (attribute === undefined) {
    return defaultValue;
  }
  return attribute !== 'false';
}

$('[data-component=neural-numbers]')
  .each((i, element) => {
    const props = {
      modelPath: $(element).attr('data-model') || null,
      inputPlaceholder: $(element).attr('data-input-placeholder') || '',
      showBars: attrFlag($(element).attr('data-show-bars'), false),
      showNormalizer: attrFlag($(element).attr('data-show-normalizer'), false),
      showOutput: attrFlag($(element).attr('data-show-output'), true),
    };
    const component = new NeuralNumbersComponent(element, props);
    component.init();
  });

if (window.IMAGINARY === undefined) {
  window.IMAGINARY = {};
}

if (window.IMAGINARY.NeuralNumbers === undefined) {
  window.IMAGINARY.NeuralNumbers = NeuralNumbersComponent;
  window.IMAGINARY.NeuralNumbersTrainingController = TrainingController;
  window.IMAGINARY.NeuralNumbersTraining = TrainingComponent;
}
