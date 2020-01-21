currentSlide().onEnter = async (controller) => {
  var showpreviewpaint = false;
  const d = document.querySelector(".train");

  const els = {
    trainingProgress: d.querySelector('.imagesused .number'),
    //validationImages: d.querySelector('#validation-images'),
    validationAccuracy: d.querySelector('.accuracy .number'),
    network: d.querySelector('.simplenetwork > canvas'),
    paint: d.querySelector(".paint")
  };

  var updateUI = () => {
    if (showpreviewpaint) {
      d.querySelector(".simplenetwork").classList.remove("visible");
      d.querySelector(".advanced").classList.remove("visible");
      d.querySelector(".paint").classList.add("visible");
      d.querySelector(".testit").innerHTML = "-&gt; Continue Training!";
    } else {
      d.querySelector(".simplenetwork").classList.add("visible");
      d.querySelector(".advanced").classList.remove("visible");
      d.querySelector(".paint").classList.remove("visible");
      d.querySelector(".testit").innerHTML = "-&gt; Test the Network!";
    }
  };

  d.querySelector(".testit").onclick = () => {
    showpreviewpaint = !showpreviewpaint;
    updateUI();
  };


  await controller.initTrainingEnvironment(els);
  controller.startTraining();
};

currentSlide().onExit = async (controller) => {

};
