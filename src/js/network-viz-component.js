import TrainingVisualization from './TrainingVisualization';

export default class NetworkVizComponent {
  constructor(element, props) {
    this.$element = $(element);
    this.props = props;

    this.viz = new TrainingVisualization({
      input: null,
      network: null,
      activations: null,
      bars: null,
    });
  }
}
