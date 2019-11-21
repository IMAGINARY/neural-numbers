currentSlide().onEnter = async (controller) => {
  trainingcontrolbutton = document.querySelector("#training-controls");

  controller.loadData().then(() => {
    document.querySelector('#status').innerHTML = "MNIST data loaded.";
    trainingcontrolbutton.style.visibility = "visible";
  }, () => {});

  trainingcontrolbutton.onclick = async () => {
    controller.initTraining({
      status: document.querySelector('#status'),
      validationImages: document.querySelector('#validation-images')
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

};
