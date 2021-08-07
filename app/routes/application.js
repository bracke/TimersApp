import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

  @service intl;
  @service('best-language') bestLanguage;

  beforeModel() {
    this._super(...arguments);

    const bestLanguage = this.bestLanguage.bestLanguageOrFirst([
      'en-US',
      'de-DE',
      'da-DK',
    ]);
    this.intl.setLocale([bestLanguage.language]);
  }
}