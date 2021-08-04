import { tracked } from 'tracked-built-ins';

export default class Timer {
  id;
  name;
  timer;
  target_runtime;
  is_countdown;
  Play_Sound_When_Done;

  @tracked running;
  @tracked runtime;

  // If the time is larger than 24 hours (86400 seconds), this is going to give wrong results
  Date_Formatter = new Intl.DateTimeFormat('da-DK', {
    timeZone: 'Etc/UTC',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  Format_Time = (seconds) =>
    this.Date_Formatter.format(new Date(seconds * 1000));

  constructor(Id, Name, Target_Runtime, Is_Countdown, Play_Sound_When_Done) {
    this.name = Name || 'Untitled';
    this.runtime = 0;
    this.running = false;
    this.id = Id;
    this.target_runtime = Target_Runtime || 0;
    this.is_countdown = Is_Countdown || false;
    this.Play_Sound_When_Done = Play_Sound_When_Done;
  }
  get runtime_timestring() {
    return this.Format_Time(this.runtime);
  }
  get runtime_seconds() {
    return this.runtime;
  }
  get time_until_seconds() {
    let result = 0;
    if (this.target_runtime) {
      result = this.target_runtime - this.runtime;
    }
    return result;
  }
  get time_until_timestring() {
    return this.Format_Time(this.time_until_seconds);
  }
  get completion_percentage() {
    if (this.target_runtime === 0) {
      return 100;
    } else {
      return Math.trunc((this.runtime * 100) / this.target_runtime);
    }
  }

  AudioContext = new AudioContext(); // browsers limit the number of concurrent audio contexts, so you better re-use'em

  beep(vol, freq, duration) {
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
  increment() {
    if (!this.runtime) {
      this.runtime = 0;
    }
    this.runtime = this.runtime + 1;

    if (this.is_countdown) {
      // Are we done?
      if (this.runtime === this.target_runtime) {
        clearTimeout(this.timer);
        this.running = false;
        if (this.Play_Sound_When_Done) {
          this.beep(100, 520, 200);
        }
      }
    }
  }
  start() {
    this.timer = setInterval(() => {
      this.increment();
    }, 1000);
    this.running = true;
  }
  stop() {
    clearInterval(this.timer);
    this.running = false;
  }
  reset() {
    this.runtime = 0;
  }
}
