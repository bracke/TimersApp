export default class Timer {

  static AudioContext = new AudioContext(); // browsers limit the number of concurrent audio contexts, so you better re-use'em

  static beep(vol, freq, duration) {
    v = AudioContext.createOscillator();
    u = AudioContext.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = 'square';
    u.connect(AudioContext.destination);
    u.gain.value = vol * 0.01;
    v.start(AudioContext.currentTime);
    v.stop(AudioContext.currentTime + duration * 0.001);
  }
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
          Timer.beep(100, 520, 200);
        }
      }
    }
  }
  static start(aTimer) {
    aTimer.timer = setInterval(() => {
      Timer.increment(aTimer);
    }, 1000);
    aTimer.running = true;
  }
  static stop(aTimer) {
    clearInterval(aTimer.timer);
    aTimer.running = false;
  }
  static reset(aTimer) {
    aTimer.runtime = 0;
  }
}
