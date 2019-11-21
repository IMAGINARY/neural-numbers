currentSlide().onEnter = async (controller) => {
  trainingcontrolbutton = document.querySelector("#training-controls");
  document.querySelector("#previewpaint").style.visibility = "hidden";

  const updateTrainingUI = () => {
    document.querySelector("#previewpaint").style.visibility = controller.nn.training ? "hidden" : "visible";
    trainingcontrolbutton.innerHTML = controller.nn.training ? "pause training" : "resume training";
  };

  controller.loadData().then(() => {
    document.querySelector('#status').innerHTML = "MNIST data loaded. Training the neural network...";
    trainingcontrolbutton.style.visibility = "visible";
    controller.initTrainingEnvironment({
      status: document.querySelector('#status'),
      trainingAccuracy: document.querySelector('#training-accuracy'),
      trainingProgress: document.querySelector('#training-progress'),
      validationImages: document.querySelector('#validation-images'),
      validationAccuracy: document.querySelector('#validation-accuracy'),
      paint: document.querySelector("#previewpaint")
    });
    controller.startTraining();
    setTimeout(() => {
        controller.pauseTraining();
        updateTrainingUI();
      }, 5000 //5 seconds of training
    );
    //document.querySelector("#previewpaint").style.visibility = "visible";
  }, () => {});

  trainingcontrolbutton.onclick = async () => {
    controller.toggleTraining();
    updateTrainingUI();
  };


};


currentSlide().onExit = (controller) => {
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
  controller.cleanupPaint();
  trainingcontrolbutton.innerHTML = "start training";
};
