currentSlide().onEnter = async (controller) => {
  document.querySelector("#previewpaint").style.visibility = "hidden";
  let interaction = false;
  const els = {
    trainingAccuracy: document.querySelector('#training-accuracy'),
    trainingProgress: document.querySelector('#training-progress'),
    validationImages: document.querySelector('#validation-images'),
    validationAccuracy: document.querySelector('#validation-accuracy'),
    network: document.querySelector('#network'),
    paint: document.querySelector("#previewpaint")
  };

  const updateTrainingUI = () => {
    document.querySelector("#previewpaint").style.visibility = (controller.nn && controller.nn.training) ? "hidden" : "visible";
    document.querySelector("#training-controls .pause-resume").innerHTML = (controller.nn && controller.nn.training) ? "pause training" : "resume training";
  };

  document.querySelector("#training-controls .pause-resume").onclick = async () => {
    interaction = true;
    document.querySelector("#training-controls").style.visibility = "hidden";
    await controller.toggleTraining();
    updateTrainingUI();
    document.querySelector("#training-controls").style.visibility = "visible";
  };

  document.querySelector("#training-controls .reset").onclick = async () => {
    interaction = true;
    document.querySelector("#training-controls").style.visibility = "hidden";
    await controller.resetTraining(els);
    updateTrainingUI();
    document.querySelector("#training-controls").style.visibility = "visible";
  };

  document.querySelector("#training-controls").style.visibility = "visible";

  await controller.initTrainingEnvironment(els);
  controller.startTraining();
  setTimeout(async () => {
      if (!interaction) {
        document.querySelector("#training-controls").style.visibility = "hidden";
        await controller.pauseTraining();
        updateTrainingUI();
        document.querySelector("#training-controls").style.visibility = "visible";
      }
    }, 5000 //5 seconds of training until automatic pause
  );
};


currentSlide().onExit = async (controller) => {
  document.querySelector("#training-controls").style.visibility = "hidden";
  controller.cleanupPaint();
  await controller.pauseTraining();
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
  document.querySelector("#training-controls .pause-resume").innerHTML = "start training";
};
