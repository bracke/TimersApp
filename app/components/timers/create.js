import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class TimersCreateComponent extends Component {
  @tracked New_Timer_Name;
  @tracked New_Timer_Target_Runtime_In_Minutes;
  @tracked New_Timer_Is_Countdown;
  @tracked New_Timer_Play_Sound_When_Done;

  @tracked New_Timer_Name_IsValid;
  @tracked New_Timer_Target_Runtime_In_Minutes_IsValid;

  initialize_new_timer() {
    this.New_Timer_Name = 'Untitled';
    this.New_Timer_Target_Runtime_In_Minutes = 0;
    this.New_Timer_Is_Countdown = false;
    this.New_Timer_Play_Sound_When_Done = false;

    this.New_Timer_Name_IsValid = true;
    this.New_Timer_Target_Runtime_In_Minutes_IsValid = true;
  }
  constructor() {
    super(...arguments);

    this.initialize_new_timer();
  }
  @action
  Preset(Name, Target_Runtime_In_Minutes, Is_Countdown, Play_Sound_When_Done) {
    this.New_Timer_Name = Name;
    this.New_Timer_Target_Runtime_In_Minutes = Target_Runtime_In_Minutes;
    this.New_Timer_Is_Countdown = Is_Countdown;
    this.New_Timer_Play_Sound_When_Done = Play_Sound_When_Done;
  }
  validate() {
    let isValid = true;
    const Minutes_In_A_Day = 24 * 60;

    if (this.New_Timer_Name === '') {
      isValid = false;
      this.New_Timer_Name_IsValid = false;
    } else {
      this.New_Timer_Name_IsValid = true;
    }
    if (
      this.New_Timer_Is_Countdown &&
      (this.New_Timer_Target_Runtime_In_Minutes === 0 ||
        this.New_Timer_Target_Runtime_In_Minutes > Minutes_In_A_Day)
    ) {
      isValid = false;
      this.New_Timer_Target_Runtime_In_Minutes_IsValid = false;
    } else {
      this.New_Timer_Target_Runtime_In_Minutes_IsValid = true;
    }
    return isValid;
  }
  @action
  addTimer() {
    let isValid = this.validate();

    if (isValid) {
      this.args.addTimer(
        this.New_Timer_Name,
        this.New_Timer_Target_Runtime_In_Minutes,
        this.New_Timer_Is_Countdown,
        this.New_Timer_Play_Sound_When_Done
      );
      this.initialize_new_timer();
    }
  }
  @action
  addPreset() {
    let isValid = this.validate();
    this.args.addPreset(
        this.New_Timer_Name,
        this.New_Timer_Target_Runtime_In_Minutes,
        this.New_Timer_Is_Countdown,
        this.New_Timer_Play_Sound_When_Done
      );

  }
}
