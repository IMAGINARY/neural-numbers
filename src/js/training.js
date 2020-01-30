currentSlide().onEnter = async (controller) => {
  var showpreviewpaint = false;
  var expertmode = false;
  var istraining = true;
  const d = document.querySelector(".train");

  const els = {
    trainingProgress: d.querySelector('.imagesused .number'),
    //validationImages: d.querySelector('#validation-images'),
    validationAccuracy: d.querySelector('.accuracy .number'),
    network: d.querySelector('.simplenetwork > canvas'),
    paint: d.querySelector(".paint")
  };

  var updateUI = () => {
    istraining = (controller.nn && controller.nn.training);
    expertmode = d.querySelector('.expertmode').checked;
    if (controller.nn.trainedimages > 0) {
      d.querySelector(".reset").classList.add("visible");
    } else {
      d.querySelector(".reset").classList.remove("visible");
    }
    if (showpreviewpaint) {
      d.querySelector(".simplenetwork").classList.remove("visible");
      d.querySelector(".advanced").classList.remove("visible");
      d.querySelector(".paint").classList.add("visible");
      d.querySelector(".testit").innerHTML = "-&gt; Continue Training!";

      d.querySelector(".menu").classList.add("drawmode");
    } else {
      if (expertmode) {
        d.querySelector(".simplenetwork").classList.remove("visible");
        d.querySelector(".advanced").classList.add("visible");
      } else {
        d.querySelector(".simplenetwork").classList.add("visible");
        d.querySelector(".advanced").classList.remove("visible");
      }

      d.querySelector(".paint").classList.remove("visible");
      d.querySelector(".testit").innerHTML = "-&gt; Test the Network!";

      d.querySelector(".menu").classList.remove("drawmode");
    }

    d.querySelector(".expertmode-on-off").innerHTML = expertmode ? "on" : "off";

    const pr = d.querySelector(".pause-resume");

    if (istraining) {
      pr.classList.remove("resume");
      pr.classList.add("pause");
    } else {
      pr.classList.add("resume");
      pr.classList.remove("pause");
    }
  };

  /* buttons */
  d.querySelector(".testit").onclick = async () => {
    showpreviewpaint = !showpreviewpaint;
    updateUI();
    await controller.pauseTraining();
    updateUI();
  };


  d.querySelector(".pause-resume").onclick = async () => {
    istraining = !istraining;
    await controller.toggleTraining();
    updateUI();
    d.querySelector(".reset").classList.add("visible");
  };

  d.querySelector(".single-step").onclick = async () => {
    if ((istraining)) {
      await controller.pauseTraining();
      istraining = false;
    } else {
      await controller.singleStep();
    }
    updateUI();
  };

  d.querySelector(".reset").onclick = async () => {
    await controller.pauseTraining();
    await controller.resetTraining(els);

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

  d.querySelector('.expertmode').onchange = async () => {
    if (d.querySelector(".modelid").selectedIndex != 0) {
      d.querySelector(".modelid").selectedIndex = 0;
      resetadvancednetwork();
    }
    updateUI();
    await controller.pauseTraining();
    updateUI();
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
