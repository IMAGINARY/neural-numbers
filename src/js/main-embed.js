import NeuralNumbersComponent from './neural-numbers-component';

function buildComponent(container, props) {
  const element = $('<div></div>')
    .addClass('component neural-numbers-component')
    .appendTo(container);

  const styles = ['default', 'bad', 'mediocre'];
  if (props.style && styles.includes(props.style)) {
    element.addClass(`neural-numbers-component-${props.style}`);
  }

  const component = new NeuralNumbersComponent(element, props);
  component.init();
}

function showError(container, error) {
  $('<div></div>')
    .addClass(['error', 'text-center'])
    .text(error)
    .appendTo(container);
}

const urlSearchParams = new URLSearchParams(window.location.search);

const modelName = urlSearchParams.get('model') || 'my-model';

const modelNameValidationRegex = /^[0-9A-Za-z0\-_.]+$/;
if (modelNameValidationRegex.test(modelName)) {
  const props = {
    modelPath: `assets/models/${modelName}.json`,
    safeInputPlaceholder: urlSearchParams.get('input-placeholder') || '',
    showBars: urlSearchParams.get('show-bars') === 'true' || false,
    showNormalizer: urlSearchParams.get('show-normalizer') === 'true' || false,
    showOutput: urlSearchParams.get('show-output') !== 'false',
    style: urlSearchParams.get('style') || 'default',
  };

  buildComponent('body', props);
} else {
  showError('body', 'Invalid model name');
}
