/* eslint-disable no-param-reassign,no-restricted-properties */
import Slide from '../slide.js';

export default class DesignNetworkSlide extends Slide {
  async onEnter() {
    this.controller.testpaint = true;
    let istraining = true;
    let isBusy = false;
    const d = document.querySelector('[data-slide=design-network] .train');
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
      istraining = (this.controller.nn && this.controller.nn.training);
      if (this.controller.nn && this.controller.nn.trainedimages > 0) {
        d.querySelector('.reset').classList.add('visible');
      } else {
        d.querySelector('.reset').classList.remove('visible');
      }
      d.querySelector('.paint').classList.toggle('visible', this.controller.testpaint);
      d.querySelector('.training').classList.toggle('visible', !this.controller.testpaint);
      if (this.controller.testpaint) {
        if (this.controller.paint) {
          this.controller.paint.clear();
        }
      }

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
      if (isBusy) {
        return;
      }
      isBusy = true;
      istraining = !istraining;
      await this.controller.toggleTraining(updateUI);
      updateUI();
      d.querySelector('.reset').classList.add('visible');
      isBusy = false;
    };

    d.querySelector('.single-step').onpointerdown = async () => {
      if (isBusy) {
        return;
      }
      isBusy = true;
      if (istraining) {
        await this.controller.pauseTraining(updateUI);
        // await controller.singleStep(updateUI);
        istraining = false;
      } else {
        await this.controller.singleStep(updateUI);
      }
      updateUI();
      isBusy = false;
    };

    d.querySelector('.reset').onpointerdown = async () => {
      if (isBusy) {
        return;
      }
      isBusy = true;
      await this.controller.pauseTraining(updateUI);
      await this.controller.resetTraining(els);
      resetadvancednetwork();
      updateUI();
      isBusy = false;
    };

    /* expert mode */

    const resetadvancednetwork = async () => {
      if (isBusy) {
        return;
      }
      isBusy = true;
      await this.controller.pauseTraining(updateUI);
      const learningRate = Math.pow(10, d.querySelector('.learningrate').value);
      d.querySelector('.learningratetxt').innerHTML = learningRate.toPrecision(1);
      this.controller.resetNetwork(
        d.querySelector('.modelid').value,
        d.querySelector('.optimizerid').value,
        learningRate,
        d.querySelector('.activation').value
      );
      updateUI();
      isBusy = false;
    };

    const rateSlider = d.querySelector('.learningrate');
    const rateLabel = d.querySelector('.learningratetxt');
    rateSlider.oninput = () => {
      const rate = Math.pow(10, rateSlider.value);
      rateLabel.innerText = rate.toPrecision(1);
    };

    d.querySelector('.learningrate').onchange = async () => {
      resetadvancednetwork();
    };

    await this.controller.initTrainingEnvironment(els);
    // controller.startTraining();
    updateUI();
  }

  async onExit() {
    this.controller.cleanupPaint();
    await this.controller.pauseTraining();
    this.controller.cleanupValidationPreview();
    this.controller.cleanupNetwork();
  }
}

Slide.registerClass('design-network', DesignNetworkSlide);
