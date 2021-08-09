export default class Timer {

  static increment(aTimer) {
    if (!aTimer.runtime) {
      aTimer.runtime = 0;
    }
    aTimer.runtime = aTimer.runtime + 1;
    if (aTimer.is_countdown) {
      // Are we done?
      if (aTimer.runtime === aTimer.target_runtime) {
        clearTimeout(aTimer.timer);
        aTimer.running = false;
        if (aTimer.play_sound_when_done) {
         document.getElementById('timer_beep').muted = false;
         document.getElementById('timer_beep').play();
        }
      }
    }
    aTimer.save();
  }
  static start(aTimer) {
    aTimer.timer = setInterval(() => {
      Timer.increment(aTimer);
    }, 1000);
    aTimer.running = true;
    aTimer.save();
  }
  static stop(aTimer) {
    clearInterval(aTimer.timer);
    aTimer.running = false;
    aTimer.save();
  }
  static reset(aTimer) {
    console.log("reset",aTimer);
    aTimer.runtime = 0;
    aTimer.save();
  }
}
