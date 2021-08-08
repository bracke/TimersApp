import Component from '@glimmer/component';
import { tracked } from 'tracked-built-ins';
import { action } from '@ember/object';

export default class AddToHomescreenComponent extends Component {
  @tracked ShowDialog = false;
  @tracked State;

  isIDevice;
  class_descriptor;

  @action
  OnLoad() {
    let UserAgent = window.navigator.userAgent;
    this.isIDevice = /iphone|ipod|ipad/i.test(UserAgent);
    let isMobileChrome =
      UserAgent.indexOf('Android') > -1 &&
      /Chrome\/[.0-9]*/.test(UserAgent) &&
      UserAgent.indexOf('Version') == -1;
    let isMobileSafari =
      this.isIDevice &&
      UserAgent.indexOf('Safari') > -1 &&
      UserAgent.indexOf('CriOS') < 0;

    let isCompatible = isMobileSafari || isMobileChrome;

    let OS = this.isIDevice ? 'ios' : isMobileChrome ? 'android' : 'unsupported';

    let OSVersion = UserAgent.match(/(OS|Android) (\d+[_\.]\d+)/);
    let isTablet =
      (isMobileSafari && UserAgent.indexOf('iPad') > -1) ||
      (isMobileChrome && UserAgent.indexOf('Mobile') < 0);

    let isStandalone = isMobileSafari && window.navigator.standalone === true;
    isStandalone =
      isStandalone || window.matchMedia('(display-mode: standalone)').matches;

    this.class_descriptor =
      'ath-' +
      OS +
      ' ath-' +
      OS +
      (parseInt(OSVersion) || '') +
      ' ath-' +
      (isTablet ? 'tablet' : 'phone');

    this.ShowDialog = isCompatible && !isStandalone;

    if (this.ShowDialog) {
      setTimeout(() => {
        this.ShowDialog = false;
      }, 5000);
    }
  }
}
