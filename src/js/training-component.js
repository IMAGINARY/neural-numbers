import TrainingController from "./training-controller";

export default class TrainingComponent {
    constructor(nnComponent, element, props = {}) {
        this.trainingController = new TrainingController(nnComponent, props);
        this.nnComponent = nnComponent;
        this.$element = $(element);
        this.props = Object.assign({}, {
            imageCountLabelText: 'Images used:',
            predictedAccuracyLabelText: 'Predicted accuracy:',
        }, props);

        this.$element.addClass('neural-numbers-training-component');

        this.$controlsL = $('<div>')
            .addClass(['controls', 'controls-l'])
            .appendTo(this.$element);

        this.$progress = $('<div>')
            .addClass('training-progress')
            .appendTo(this.$element);

        this.$imageCount = $('<div>')
            .addClass('image-count')
            .appendTo(this.$progress);

        this.$imageCountLabel = $('<div>')
            .addClass('image-count-label')
            .html(this.props.imageCountLabelText)
            .appendTo(this.$imageCount);

        this.$imageCountValue = $('<div>')
            .addClass('image-count-value')
            .appendTo(this.$imageCount);

        this.$accuracy = $('<div>')
            .addClass('accuracy')
            .appendTo(this.$progress);

        this.$accuracyLabel = $('<div>')
            .addClass('accuracy-label')
            .html(this.props.predictedAccuracyLabelText)
            .appendTo(this.$accuracy);

        this.$accuracyValue = $('<div>')
            .addClass('accuracy-value')
            .appendTo(this.$accuracy);

        this.$controlsR = $('<div>')
            .addClass(['controls', 'controls-r'])
            .appendTo(this.$element);

        this.$startPauseBtn = $('<button>')
            .addClass(['start-pause-btn', 'btn'])
            .text('Start')
            .on('click', this.handleStartPauseBtn.bind(this))
            .appendTo(this.$controlsL);

        this.$stepBtn = $('<button>')
            .addClass(['step-btn', 'btn'])
            .text('Step')
            .on('click', this.handleStepBtn.bind(this))
            .appendTo(this.$controlsL);

        this.$resetBtn = $('<button>')
            .addClass(['reset-btn', 'btn'])
            .text('Reset')
            .on('click', this.handleResetBtn.bind(this))
            .appendTo(this.$controlsR);

        this.trainingController.events.on('batch', this.handleBatch.bind(this));
        this.trainingController.events.on('accuracy', this.handleAccuracy.bind(this));
        this.trainingController.events.on('start', this.handleTrainingStart.bind(this));
        this.trainingController.events.on('pause', this.handleTrainingPause.bind(this));
        this.trainingController.events.on('training-complete', this.handleTrainingComplete.bind(this));
        this.trainingController.events.on('reset', this.handleTrainingReset.bind(this));

        this.disableButtons();
    }

    async init() {
        await this.trainingController.init();
        this.enableButtons();
    }

    disableButtons() {
        this.$startPauseBtn.attr('disabled', true);
        this.$stepBtn.attr('disabled', true);
        this.$resetBtn.attr('disabled', true);
    }

    enableButtons() {
        this.$startPauseBtn.attr('disabled', false);
        this.$stepBtn.attr('disabled', false);
        this.$resetBtn.attr('disabled', false);
    }

    disableTrainingButtons() {
        this.$startPauseBtn.attr('disabled', true);
        this.$stepBtn.attr('disabled', true);
    }

    enableTrainingButtons() {
        this.$startPauseBtn.attr('disabled', false);
        this.$stepBtn.attr('disabled', false);
    }

    handleStartPauseBtn() {
        if (this.trainingController.isTraining()) {
            this.trainingController.pause();
        } else {
            this.trainingController.start();
        }
    }

    handleStepBtn() {
        this.trainingController.step();
    }

    handleResetBtn() {
        this.trainingController.reset();
    }

    handleBatch(imageCount) {
        this.$imageCountValue.text(imageCount);
    }

    handleAccuracy(accuracy) {
        this.$accuracyValue.attr('data-ranking', accuracy > 50 ? accuracy > 85 ? 'good' : 'mediocre' : 'bad');
        this.$accuracyValue.text(`${Math.round(accuracy)}%`);
    }

    handleTrainingStart() {
        this.$startPauseBtn.text('Pause');
        this.$element.addClass('running');
        this.nnComponent.disableDrawing();
    }

    handleTrainingPause() {
        this.$startPauseBtn.text('Start');
        this.$element.removeClass('running');
        this.nnComponent.enableDrawing();
    }

    handleTrainingComplete() {
        this.disableTrainingButtons();
    }

    handleTrainingReset() {
        this.enableTrainingButtons();
    }
}
