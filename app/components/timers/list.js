import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';
import { inject as service } from '@ember/service';
import Timer from './timer';
import store from '@ember-data/store';
import presets from './presets';
export default class TimersListComponent extends Component {
  Timers;
  Max_Id;
  Presets;

  @service store;
  @tracked state;
  @tracked timers;

  Load_Timers() {
    let that = this;
    this.store.findAll('timer').then(function (fetched_Timers) {

      that.timers = fetched_Timers;

      fetched_Timers.forEach(function (aTimer) {
        if (aTimer.running) {
          Timer.start(aTimer);
        }
      });
    });
  }
  Load_UI_State() {
    let that = this;
    this.store.findAll('uistate').then(function (fetched_UI_State) {
      if (fetched_UI_State.length > 0) {
        that.state = fetched_UI_State.firstObject;
      } else {
        that.state = that.store.createRecord('uistate', {
          display_create_dialog: false,
          started: false,
        });
        that.state.save();
      }
    });
  }
  Load_Presets() {
    let that = this;
    this.store.findAll('preset').then(function (fetchedPresets) {
      if (fetchedPresets.length == 0) {
        presets.forEach((element) => {
          let aPreset = that.store.createRecord('preset', {
            name: element.name,
            runtime_in_minutes: element.runtime_in_minutes,
            is_countdown: element.is_countdown,
            play_sound_when_done: element.play_sound_when_done,
          });
          aPreset.save();
          that.store
            .findAll('preset')
            .then(function (fetchedNewlyCreatedPresets) {
              that.Presets = fetchedNewlyCreatedPresets;
            });
        });
      } else {
        that.Presets = fetchedPresets;
      }
    });
  }
  constructor() {
    super(...arguments);

    this.Max_Id = 0;

    this.Load_Presets();
    this.Load_UI_State();
    this.Load_Timers();
  }
  @action
  close(aTimer) {
    clearInterval(aTimer.timer);
    aTimer.running = false;
   // aTimer.AudioContext.close();

    aTimer.deleteRecord;
    aTimer.save();

  }
  @action
  cancelCreateDialog() {
    this.state.display_create_dialog = false;
    this.state.save();
  }
  @action
  addButtonClicked() {
    this.state.display_create_dialog = true;
    this.state.started = true;
    this.state.save();

    this.args.started();
  }
  @action
  addTimer(
    New_Timer_Name,
    New_Timer_Target_Runtime_In_Minutes,
    New_Timer_Is_Countdown,
    New_Timer_Play_Sound_When_Done
  ) {
    let aTimer = this.store.createRecord('timer', {
      name: New_Timer_Name,
      target_runtime: New_Timer_Target_Runtime_In_Minutes * 60,
      is_countdown: New_Timer_Is_Countdown,
      play_sound_when_done: New_Timer_Play_Sound_When_Done
    });
    aTimer.save();

    this.state.display_create_dialog = false;
    this.state.save();
  }
}