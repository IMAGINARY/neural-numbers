currentSlide().onEnter = async (controller) => {
  document.querySelector("#previewpaint").style.visibility = "hidden";
  const els = {
    status: document.querySelector('#status'),
    trainingAccuracy: document.querySelector('#training-accuracy'),
    trainingProgress: document.querySelector('#training-progress'),
    validationImages: document.querySelector('#validation-images'),
    validationAccuracy: document.querySelector('#validation-accuracy'),
    paint: document.querySelector("#previewpaint")
  };

  const updateTrainingUI = () => {
    if(controller.nn) {
      document.querySelector("#previewpaint").style.visibility = controller.nn.training ? "hidden" : "visible";
      document.querySelector("#training-controls .pause-resume").innerHTML = controller.nn.training ? "pause training" : "resume training";
    }
  };

  document.querySelector("#training-controls .pause-resume").onclick = async () => {
    document.querySelector("#training-controls").style.visibility = "hidden";
    await controller.toggleTraining();
    updateTrainingUI();
    document.querySelector("#training-controls").style.visibility = "visible";
  };

  document.querySelector("#training-controls .reset").onclick = async () => {
    document.querySelector("#training-controls").style.visibility = "hidden";
    await controller.resetTraining(els);
    updateTrainingUI();
    document.querySelector("#training-controls").style.visibility = "visible";
  };


  await controller.loadData();
  document.querySelector('#status').innerHTML = "MNIST data loaded. Training the neural network...";
  document.querySelector("#training-controls").style.visibility = "visible";
  await controller.initTrainingEnvironment(els);

  controller.startTraining();
  setTimeout(async () => {
      document.querySelector("#training-controls").style.visibility = "hidden";
      await controller.pauseTraining();
      updateTrainingUI();
      document.querySelector("#training-controls").style.visibility = "visible";
    }, 5000 //5 seconds of training
  );
};


currentSlide().onExit = async (controller) => {
  document.querySelector("#training-controls").style.visibility = "hidden";
  await controller.pauseTraining();
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
  controller.cleanupPaint();
  document.querySelector("#training-controls .pause-resume").innerHTML = "start training";
};
