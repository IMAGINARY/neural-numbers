currentSlide().onEnter = async (controller) => {
  trainingcontrolbutton = document.querySelector("#training-controls");

  controller.loadData().then(() => {
    document.querySelector('#status').innerHTML = "MNIST data loaded.";
    trainingcontrolbutton.style.visibility = "visible";
  }, () => {});

  trainingcontrolbutton.onclick = async () => {
    controller.initTraining({
      status: document.querySelector('#status'),
      trainingAccuracy: document.querySelector('#training-accuracy'),
      trainingProgress: document.querySelector('#training-progress'),
      validationImages: document.querySelector('#validation-images'),
      validationAccuracy: document.querySelector('#validation-accuracy'),
    }).then(
      () => {
        trainingcontrolbutton.innerHTML = "pause training";
        trainingcontrolbutton.onclick = () => {
          controller.toggleTraining();
          trainingcontrolbutton.innerHTML = controller.nn.training ? "pause training" : "resume training";
        };
      }, () => {}
    );
  };
};


currentSlide().onExit = (controller) => {
  //TODO
};
