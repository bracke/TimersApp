import Model, { attr } from '@ember-data/model';


export default class PresetModel extends Model {
  @attr name;
  @attr runtime_in_minutes;
  @attr is_countdown;
  @attr play_sound_when_done;

}
