currentSlide().onEnter = async (controller) => {
  controller.testpaint = true;
  var expertmode = false;
  var istraining = true;
  const d = document.querySelector(".train");

  d.querySelector('.modeswitch .activate').classList.add("visible");
  d.querySelector('.modeswitch .cancel').classList.remove("visible");
  d.querySelector('.modelid').selectedIndex = 0;
  d.querySelector('.activation').selectedIndex = 0;
  d.querySelector('.optimizerid').selectedIndex = 0;
  d.querySelector('.learningrate').value = -3;
  d.querySelector('.learningratetxt').innerHTML = "0.001";

  const els = {
    trainingProgress: d.querySelector('.imagesused .number'),
    //validationImages: d.querySelector('#validation-images'),
    validationAccuracy: d.querySelector('.accuracy .number'),
    input: d.querySelector('.traininputcanvas'),
    network: d.querySelector('.simplenetwork > .network'),
    activations: d.querySelector('.simplenetwork > .activations'),
    bars: d.querySelector('.bars'),
    paint: d.querySelector(".paint")
  };

  var updateUI = () => {
    istraining = (controller.nn && controller.nn.training);
    expertmode = d.querySelector('.modeswitch .cancel').classList.contains("visible");
    if (controller.nn && controller.nn.trainedimages > 0) {
      d.querySelector(".reset").classList.add("visible");
    } else {
      d.querySelector(".reset").classList.remove("visible");
    }
    d.querySelector(".paint").classList.toggle("visible", controller.testpaint);
    d.querySelector(".training").classList.toggle("visible", !controller.testpaint);
    if (controller.testpaint) {
      if (controller.paint) {
        controller.paint.clear();
      }
      document.querySelector("#title").innerHTML = "Test the Network!";
      //d.querySelector(".menu").classList.add("drawmode");
    } else {
      document.querySelector("#title").innerHTML = "Train the Network!";
      //d.querySelector(".menu").classList.remove("drawmode");
    }


    d.querySelector(".simplenetwork").classList.toggle("visible", !expertmode);
    d.querySelector(".advanced").classList.toggle("visible", expertmode);


    //d.querySelector(".expertmode-on-off").innerHTML = expertmode ? "on" : "off";

    const pr = d.querySelector(".pause-resume");

    if (istraining) {
      pr.classList.remove("resume");
      pr.classList.add("pause");
    } else {
      pr.classList.add("resume");
      pr.classList.remove("pause");
    }
  };
  updateUI();
  /* buttons */
  /*
  if (d.querySelector(".testit")) d.querySelector(".testit").onpointerdown = async () => {
    controller.testpaint = true;
    updateUI();
    await controller.pauseTraining();
    updateUI();
  };*/


  d.querySelector(".pause-resume").onpointerdown = async () => {
    istraining = !istraining;
    await controller.toggleTraining(updateUI);
    updateUI();
    d.querySelector(".reset").classList.add("visible");
  };

  d.querySelector(".single-step").onpointerdown = async () => {
    if ((istraining)) {
      await controller.pauseTraining(updateUI);
      await controller.singleStep(updateUI);
      istraining = false;
    } else {
      await controller.singleStep(updateUI);
    }
    updateUI();
  };

  d.querySelector(".reset").onpointerdown = async () => {
    await controller.pauseTraining(updateUI);
    await controller.resetTraining(els);
    controller.testpaint = true;
    updateUI();
  };

  /*expert mode */

  var resetadvancednetwork = async () => {
    await controller.pauseTraining();
    const learningRate = Math.pow(10, d.querySelector(".learningrate").value);
    d.querySelector(".learningratetxt").innerHTML = learningRate.toPrecision(1);
    controller.resetNetwork(
      d.querySelector(".modelid").value,
      d.querySelector(".optimizerid").value,
      learningRate,
      d.querySelector(".activation").value
    );
    updateUI();
  };

  d.querySelector('.modeswitch').onpointerdown = async () => {
    d.querySelector('.modeswitch .activate').classList.toggle("visible");
    d.querySelector('.modeswitch .cancel').classList.toggle("visible");
    if (d.querySelector(".modelid").selectedIndex != 0) {
      d.querySelector(".modelid").selectedIndex = 0;
      resetadvancednetwork();
    }
    updateUI();
    await controller.pauseTraining(updateUI);
  };


  d.querySelector('.modelid').onchange = async () => {
    resetadvancednetwork();
  };

  d.querySelector('.optimizerid').onchange = async () => {
    resetadvancednetwork();
  };

  d.querySelector('.learningrate').onchange = async () => {
    resetadvancednetwork();
  };

  d.querySelector('.activation').onchange = async () => {
    resetadvancednetwork();
  };



  await controller.initTrainingEnvironment(els);
  //controller.startTraining();
  updateUI();
};

currentSlide().onExit = async (controller) => {
  controller.cleanupPaint();
  await controller.pauseTraining();
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
};
