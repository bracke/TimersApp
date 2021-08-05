import Model, { attr } from '@ember-data/model';

export default class UistateModel extends Model {

  @attr display_create_dialog;
  @attr started;

}
