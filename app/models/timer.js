import Model, { attr } from '@ember-data/model';

export default class TimerModel extends Model {
  @attr('string', { defaultValue: 'Untitled' }) name;
  @attr('number', { defaultValue: 0 }) target_runtime;
  @attr('boolean', { defaultValue: false }) is_countdown;
  @attr('boolean', { defaultValue: false }) play_sound_when_done;

  @attr('boolean', { defaultValue: false }) running;
  @attr('number', { defaultValue: 0 }) runtime;

  @attr('number', { defaultValue: 0 }) timer;

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

  get is_paused() {
    return !this.running && this.runtime > 0 && (this.is_countdown && this.runtime !== this.target_runtime);
  }
  get is_done() {
    return !this.running && this.runtime === this.target_runtime;
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
}
