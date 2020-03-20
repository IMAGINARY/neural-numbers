export default class BarChart {
  constructor(el) {
    this.el = el;
    // cleanup potentially previously existing bars
    this.cleanup();

    this.bars = [];
    for (let i = 0; i < 10; i += 1) {
      const cbarcontainer = document.createElement('div');
      cbarcontainer.className = 'barcontainer';
      this.bars[i] = document.createElement('div');
      this.bars[i].classList.add('bar');
      const cbartext = document.createElement('div');
      cbartext.className = 'bartxt';
      cbartext.innerHTML = `${i}`;
      cbarcontainer.appendChild(this.bars[i]);
      cbarcontainer.appendChild(cbartext);
      this.el.appendChild(cbarcontainer);
    }
  }

  cleanup() {
    while (this.el.firstChild) {
      this.el.removeChild(this.el.firstChild);
    }
  }

  update(probabilities, highlighted = -1) {
    for (let i = 0; i < 10; i += 1) {
      this.bars[i].dataset.probability = probabilities[i];
      this.bars[i].style = `--probability: ${probabilities[i]}`;
      this.bars[i].classList.toggle('highlighted', i === highlighted);
    }
  }
}
