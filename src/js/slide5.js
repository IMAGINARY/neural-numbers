var starttraining, pausetraining, toggletraining;

currentSlide().onEnter = async (controller) => {
  trainingcontrolbutton = document.querySelector("#training-controls");
  trainingcontrolbutton.onclick = starttraining;

  controller.loadData().then(() => {
    document.querySelector('#status').innerHTML = "MNIST data loaded.";
    trainingcontrolbutton.style.visibility = "visible";
  }, () => {});

  starttraining = async () => {
    controller.initTraining({
      status: document.querySelector('#status'),
      validationImages: document.querySelector('#validation-images')
    }).then(
      () => {
        trainingcontrolbutton.innerHTML = "pause training";
        trainingcontrolbutton.onclick = () => {
          console.log(this);
          controller.toggleTraining();
        };
      }, () => {}
    );
  };
};


currentSlide().onExit = (controller) => {

};
