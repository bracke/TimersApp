import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from 'tracked-built-ins';

export default class IndexController extends Controller {
  @tracked Started;

  constructor() {
    super(...arguments);

    this.Started = false;
  }

  @action
  started() {
    this.Started = true;
  }
}
