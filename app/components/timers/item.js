import Component from '@glimmer/component';

export default class TimersItemComponent extends Component {

  start(aTimer) {
    aTimer.start();
  }
  stop(aTimer) {
    aTimer.stop();
  }
  reset(aTimer) {
    aTimer.reset();
  }
}