import NeuralNumbersComponent from './neural-numbers-component';

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
      showTraining: attrFlag($(element).attr('data-show-training'), false),
      showOutput: attrFlag($(element).attr('data-show-output'), true),
    };
    const component = new NeuralNumbersComponent(element, props);
    component.init();
  });
