import TrainingController from "./training-controller";

export default class TrainingComponent {
    constructor(nnComponent, element, props = {}) {
        this.trainingController = new TrainingController(nnComponent);
        this.$element = $(element);
        this.props = Object.assign({}, {
            imageCountLabelText: 'Images used:',
        }, props);

        this.$element.addClass('neural-numbers-training-component');

        this.$progressBar = $('<div>')
            .addClass('progress-bar')
            .appendTo(this.$element);

        this.$imageCount = $('<div>')
            .addClass('image-count')
            .appendTo(this.$progressBar);

        this.$imageCountLabel = $('<span>')
            .addClass('image-count-label')
            .html(this.props.imageCountLabelText)
            .appendTo(this.$imageCount);

        this.$imageCountValue = $('<span>')
            .addClass('image-count-value')
            .appendTo(this.$imageCount);

        this.$controls = $('<div>')
            .addClass('controls')
            .appendTo(this.$element);

        this.$startPauseBtn = $('<button>')
            .addClass(['start-pause-btn', 'btn'])
            .text('Start')
            .on('click', this.handleStartPauseBtn.bind(this))
            .appendTo(this.$controls);

        this.$stepBtn = $('<button>')
            .addClass(['step-btn', 'btn'])
            .text('Step')
            .on('click', this.handleStepBtn.bind(this))
            .appendTo(this.$controls);

        this.$resetBtn = $('<button>')
            .addClass(['reset-btn', 'btn'])
            .text('Reset')
            .on('click', this.handleResetBtn.bind(this))
            .appendTo(this.$controls);

        this.trainingController.events.on('batch', this.handleBatch.bind(this));
        this.trainingController.events.on('start', this.handleTrainingStart.bind(this));
        this.trainingController.events.on('pause', this.handleTrainingPause.bind(this));

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

    handleTrainingStart() {
        this.$startPauseBtn.text('Pause');
        this.$element.addClass('running');
    }

    handleTrainingPause() {
        this.$startPauseBtn.text('Start');
        this.$element.removeClass('running');
    }
}
