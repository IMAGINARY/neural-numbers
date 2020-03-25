export default class LangSwitcher {
  constructor(container, config, langChangeCallback) {
    this.container = container;
    this.config = config;
    this.langChangeCallback = langChangeCallback;
    this.element = document.createElement('div');
    this.element.classList.add('lang-switcher');

    this.trigger = document.createElement('button');
    this.trigger.setAttribute('type', 'button');
    this.trigger.classList.add('lang-switcher-trigger');
    this.element.appendChild(this.trigger);

    const mask = document.createElement('div');
    mask.classList.add('lang-switcher-menu-mask');
    this.element.appendChild(mask);

    this.menu = document.createElement('ul');
    this.menu.classList.add('lang-switcher-menu');
    mask.appendChild(this.menu);

    Object.entries(config.languages).forEach(([code, name]) => {
      const item = document.createElement(('li'));
      const link = document.createElement('button');
      link.setAttribute('type', 'button');
      link.innerText = name;
      link.addEventListener('pointerdown', (ev) => {
        this.langChangeCallback(code);
        ev.preventDefault();
      });
      item.appendChild(link);
      this.menu.appendChild(item);
    });

    this.container.appendChild(this.element);

    this.menu.style.bottom = `${this.menu.clientHeight * -1 - 10}px`;

    window.document.addEventListener('pointerdown', (ev) => {
      console.log("hiding");
      this.hideMenu();
    });
    this.trigger.addEventListener('pointerdown', (ev) => {
      console.log("showing");
      this.showMenu();
      ev.stopPropagation();
    });
  }

  showMenu() {
    this.menu.classList.add('visible');
  }

  hideMenu() {
    this.menu.classList.remove('visible');
  }
}
