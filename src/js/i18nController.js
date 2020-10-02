/* eslint-disable no-param-reassign */
/* globals IMAGINARY */

export default class I18nControler {
  static init(defaultLanguage = 'en') {
    return IMAGINARY.i18n.init({
      queryStringVariable: 'lang',
      translationsDirectory: 'tr',
      defaultLanguage,
    }).then(() => {
      I18nControler.update();
    });
  }

  static setLanguage(code) {
    IMAGINARY.i18n.setLang(code).then(() => {
      I18nControler.update();
    });
  }

  static update() {
    document.querySelectorAll('[data-i18n-str]')
      .forEach((element) => {
        element.innerHTML = IMAGINARY.i18n.t(element.getAttribute('data-i18n-str'));
      });

    document.querySelectorAll('[data-i18n-str-title]')
      .forEach((element) => {
        element.setAttribute(
          'title',
          IMAGINARY.i18n.t(element.getAttribute('data-i18n-str-title')));
      });
  }
}
