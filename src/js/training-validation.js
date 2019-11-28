currentSlide().onEnter = async (controller) => {
  document.querySelector("#previewpaint").style.visibility = "hidden";
  let interaction = false;
  const els = {
    trainingProgress: document.querySelector('#training-progress'),
    validationImages: document.querySelector('#validation-images'),
    validationAccuracy: document.querySelector('#validation-accuracy'),
    network: document.querySelector('#network'),
    paint: document.querySelector("#previewpaint")
  };

  const updateTrainingUI = () => {
    document.querySelector("#previewpaint").style.visibility = (controller.nn && controller.nn.training) ? "hidden" : "visible";
    document.querySelector("#training-controls .pause-resume").innerHTML = (controller.nn && controller.nn.training) ? "▮▮" : "▶";
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
  const automaticstop = async () => {
    if (!interaction) {
      document.querySelector("#training-controls").style.visibility = "hidden";
      await controller.pauseTraining();
      updateTrainingUI();
      document.querySelector("#training-controls").style.visibility = "visible";
      interaction = true;
    }
  };
  controller.addAccuracyCallback(0.8, automaticstop);
  setTimeout(interaction, 60000); //automatic stop after one minute
};


currentSlide().onExit = async (controller) => {
  document.querySelector("#training-controls").style.visibility = "hidden";
  controller.cleanupPaint();
  await controller.pauseTraining();
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
  document.querySelector("#training-controls .pause-resume").innerHTML = "▮▮";
};
