/* eslint-disable no-param-reassign */

window.currentSlide().onEnter = async (controller) => {
  controller.testpaint = true;
  let expertmode = false;
  let istraining = true;
  const d = document.querySelector('.train');

  d.querySelector('.modeswitch .activate').classList.add('visible');
  d.querySelector('.modeswitch .cancel').classList.remove('visible');

  const resetadvancedoptions = () => {
    d.querySelectorAll('.parameter .select').forEach((select) => {
      select.querySelectorAll('.option').forEach((option, k) => {
        option.classList.toggle('selected', k === 0);
        if (k === 0) {
          select.value = option.dataset.value;
        }
      });
    });
    d.querySelector('.learningrate').value = -3;
    d.querySelector('.learningratetxt').innerHTML = '0.001';
  };

  resetadvancedoptions();

  const els = {
    trainingProgress: d.querySelector('.imagesused .number'),
    // validationImages: d.querySelector('#validation-images'),
    validationAccuracy: d.querySelector('.accuracy .number'),
    input: d.querySelector('.traininputcanvas'),
    network: d.querySelector('.simplenetwork > .network'),
    activations: d.querySelector('.simplenetwork > .activations'),
    bars: d.querySelector('.bars'),
    paint: d.querySelector('.paint'),
  };

  const updateUI = () => {
    istraining = (controller.nn && controller.nn.training);
    expertmode = d.querySelector('.modeswitch .cancel').classList.contains('visible');
    if (controller.nn && controller.nn.trainedimages > 0) {
      d.querySelector('.reset').classList.add('visible');
    } else {
      d.querySelector('.reset').classList.remove('visible');
    }
    d.querySelector('.paint').classList.toggle('visible', controller.testpaint);
    d.querySelector('.training').classList.toggle('visible', !controller.testpaint);
    if (controller.testpaint) {
      if (controller.paint) {
        controller.paint.clear();
      }
    }
    document.querySelector('.titletrain').classList.toggle('visible', !controller.testpaint);
    document.querySelector('.titletest').classList.toggle('visible', controller.testpaint);

    d.querySelector('.simplenetwork').classList.toggle('visible', !expertmode);
    d.querySelector('.advanced').classList.toggle('visible', expertmode);

    // d.querySelector(".expertmode-on-off").innerHTML = expertmode ? "on" : "off";

    const pr = d.querySelector('.pause-resume');

    if (istraining) {
      pr.classList.remove('resume');
      pr.classList.add('pause');
    } else {
      pr.classList.add('resume');
      pr.classList.remove('pause');
    }

    d.querySelectorAll('.parameter .select').forEach((select) => {
      select.querySelectorAll('.option').forEach((option) => {
        option.onpointerdown = () => {
          if (select.value !== option.dataset.value) {
            select.querySelectorAll('.option').forEach((ooption) => {
              ooption.classList.toggle('selected', ooption === option);
            });
            select.value = option.dataset.value;
            resetadvancednetwork();
          }
        };
      });
    });
  };
  updateUI();
  /* buttons */
  /*
    if (d.querySelector(".testit")) d.querySelector(".testit").onpointerdown = async () => {
      controller.testpaint = true;
      updateUI();
      await controller.pauseTraining();
      updateUI();
    };
  */

  d.querySelector('.pause-resume').onpointerdown = async () => {
    istraining = !istraining;
    await controller.toggleTraining(updateUI);
    updateUI();
    d.querySelector('.reset').classList.add('visible');
  };

  d.querySelector('.single-step').onpointerdown = async () => {
    if ((istraining)) {
      await controller.pauseTraining(updateUI);
      // await controller.singleStep(updateUI);
      istraining = false;
    } else {
      await controller.singleStep(updateUI);
    }
    updateUI();
  };

  d.querySelector('.reset').onpointerdown = async () => {
    await controller.pauseTraining(updateUI);
    await controller.resetTraining(els);
    updateUI();
  };

  /* expert mode */

  const resetadvancednetwork = async () => {
    await controller.pauseTraining(updateUI);
    const learningRate = Math.pow(10, d.querySelector('.learningrate').value);
    d.querySelector('.learningratetxt').innerHTML = learningRate.toPrecision(1);
    controller.resetNetwork(
      d.querySelector('.modelid').value,
      d.querySelector('.optimizerid').value,
      learningRate,
      d.querySelector('.activation').value
    );
    updateUI();
  };

  d.querySelector('.modeswitch').onpointerdown = async () => {
    d.querySelector('.modeswitch .activate').classList.toggle('visible');
    d.querySelector('.modeswitch .cancel').classList.toggle('visible');
    resetadvancedoptions();
    resetadvancednetwork();
    updateUI();
    await controller.pauseTraining(updateUI);
  };

  d.querySelector('.learningrate').onchange = async () => {
    resetadvancednetwork();
  };

  await controller.initTrainingEnvironment(els);
  // controller.startTraining();
  updateUI();
};

window.currentSlide().onExit = async (controller) => {
  controller.cleanupPaint();
  await controller.pauseTraining();
  controller.cleanupValidationPreview();
  controller.cleanupNetwork();
};
