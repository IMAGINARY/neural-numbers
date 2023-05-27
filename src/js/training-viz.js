export default class TrainingViz {
    constructor(trainingController) {
        this.trainingController = trainingController;
        this.nnComponent = trainingController.nnComponent;
        this.drawCanvas = this.nnComponent.$drawCanvas[0];
        this.drawCanvasCtx = this.drawCanvas.getContext('2d');

        this.trainDigitBuffer = document.createElement('canvas');
        this.trainDigitBuffer.height = 28;
        this.trainDigitBuffer.width = 28;
    }

    async init() {

    }

    async setCurrentTraining(trainXs, trainYs) {
        const trainX1 = trainXs.slice([0, 0, 0, 0], [1, 28, 28, 1]); // only the first
        const imageTensor = trainX1.reshape([28, 28, 1]); // first as image
        await tf.browser.toPixels(imageTensor, this.trainDigitBuffer);
        this.trainDigitBuffer.active = true;
        this.currentDigit = imageTensor.dataSync();
        this.computeActivations(trainX1);
        const trainY1 = trainYs.slice([0, 0], [1, 10]); // only the first
        [this.currentTarget] = trainY1.argMax([-1]).dataSync();
        this.renderNetwork();
        this.renderActivations();
        // clean up
        trainX1.dispose();
        trainY1.dispose();
        imageTensor.dispose();
    }

    computeActivations(input) {
        const { nn } = this.trainingController;
        if (nn.modelid === 'dense') {
            const A1 = nn.model.layers[0].apply(input);
            const A2 = nn.model.layers[1].apply(A1);
            const A3 = nn.model.layers[2].apply(A2);
            this.intermediateActivations = A2.dataSync().map(x => Math.abs(x) / 2);
            this.currentProbabilities = A3.dataSync();
            [this.currentTarget] = A3.argMax([-1]).dataSync();
            A1.dispose();
            A2.dispose();
            A3.dispose();
        } else {
            const prediction = nn.model.predict(input);
            this.currentProbabilities = prediction.dataSync();
            [this.currentTarget] = prediction.argMax([-1]).dataSync();
            prediction.dispose();
        }
    }

    renderNetwork() {

    }

    clearActivations() {
        this.drawCanvasCtx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
    }

    renderActivations() {
        this.clearActivations();

        if (this.trainDigitBuffer.active) {
            const destOrigin = this.drawCanvas.width * 0.125;
            const destSize = this.drawCanvas.width * 0.75;
            this.drawCanvasCtx.imageSmoothingEnabled = false; // no antialiasing
            this.drawCanvasCtx.drawImage(this.trainDigitBuffer, 0, 0, 28, 28, destOrigin, destOrigin, destSize, destSize);
            this.nnComponent.setClearTimeout();
            this.nnComponent.setClearOnInput();
        }

        this.nnComponent.getBarChart().update(this.currentProbabilities, this.currentTarget);
    }

    async estimateAccuracy(model, testDataSize = 100) {
        const { data }  = this.trainingController;
        const accuracy = tf.tidy(() => {
            const d = data.nextTestBatch(testDataSize);
            const testXs = d.xs.reshape([testDataSize, 28, 28, 1]);
            const testYs = d.labels;
            return model.evaluate(testXs, testYs)[1].dataSync();
        });

        if (testDataSize < 1000 && accuracy > 0.9) {
            // compute more exact accuracy if it is close to 100%
            return await this.estimateAccuracy(model, 1000);
        }

        return (accuracy < 0.9) ?
            Math.round(accuracy * 100) :
            Math.round(accuracy * 1000) / 10;
    }
}
