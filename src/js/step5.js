currentSlide().onEnter = async (controller) => {
  trainingcontrolbutton = document.querySelector("#training-controls");
  document.querySelector("#previewpaint").style.visibility = "hidden";

  controller.loadData().then(() => {
    document.querySelector('#status').innerHTML = "MNIST data loaded.";
    trainingcontrolbutton.style.visibility = "visible";
    controller.initTrainingEnvironment({
      status: document.querySelector('#status'),
      trainingAccuracy: document.querySelector('#training-accuracy'),
      trainingProgress: document.querySelector('#training-progress'),
      validationImages: document.querySelector('#validation-images'),
      validationAccuracy: document.querySelector('#validation-accuracy'),
      paint: document.querySelector("#previewpaint")
    });
    document.querySelector("#previewpaint").style.visibility = "visible";
  }, () => {});

  trainingcontrolbutton.onclick = async () => {
    controller.toggleTraining();
    trainingcontrolbutton.innerHTML = controller.nn.training ? "pause training" : "resume training";
    document.querySelector("#previewpaint").style.visibility = controller.nn.training ? "hidden" : "visible";
  };


};


currentSlide().onExit = (controller) => {
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
  controller.cleanupPaint();
  trainingcontrolbutton.innerHTML = "start training";
};
