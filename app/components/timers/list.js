import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';
import { TrackedArray } from 'tracked-built-ins';
import { inject as service } from '@ember/service';
import store from '@ember-data/store';
import timer from './timer';
import presets from './presets';

export default class TimersListComponent extends Component {
  Timers;
  Max_Id;
  Presets;

  @service store;
  @tracked Display_Create_Dialog;

  constructor() {
    super(...arguments);

    this.Display_Create_Dialog = false;
    this.Max_Id = 0;
    this.Timers = new TrackedArray([]);

    let that = this;
    this.store.findAll('preset').then(function (fetchedPresets) {
      if (fetchedPresets.length == 0) {
        console.log('presetStorage is empty');

        presets.forEach((element) => {
          let aPReset = that.store.createRecord('preset', {
            name: element.name,
            runtime_in_minutese: element.runtime_in_minutese,
            is_countdown: element.is_countdown,
            play_sound_when_done: element.play_sound_when_done,
          });
          aPReset.save();
          that.store.findAll('preset').then(function (fetchedNewlyCreatedPresets) {
            that.Presets = fetchedNewlyCreatedPresets;
          });
        });
      } else {
        that.Presets = fetchedPresets;
      }
    });
  }
  @action
  close(aTimer) {
    aTimer.stop();
    aTimer.AudioContext.close();

    // Remove timer from array
    const index = this.Timers.findIndex((v) => v.Id === aTimer.Id);
    if (index > -1) {
      this.Timers.splice(index, 1);
    }
  }
  @action
  cancelCreateDialog() {
    this.Display_Create_Dialog = false;
  }
  @action
  addButtonClicked() {
    this.Display_Create_Dialog = true;
    this.args.started();
  }
  @action
  addTimer(
    New_Timer_Name,
    New_Timer_Target_Runtime_In_Minutes,
    New_Timer_Is_Countdown,
    New_Timer_Play_Sound_When_Done
  ) {
    this.Timers.push(
      new timer(
        this.Max_Id++,
        New_Timer_Name,
        New_Timer_Target_Runtime_In_Minutes * 60,
        New_Timer_Is_Countdown,
        New_Timer_Play_Sound_When_Done
      )
    );
    this.Display_Create_Dialog = false;
  }
}