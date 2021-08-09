import Component from '@glimmer/component';
import Timer from './timer';
export default class TimersItemComponent extends Component {
  start(aTimer) {
    Timer.start(aTimer);
    aTimer.save();
  }
  stop(aTimer) {
    Timer.stop(aTimer);
    aTimer.save();
  }
  reset(aTimer) {
    Timer.reset(aTimer);
    aTimer.save();
  }
}