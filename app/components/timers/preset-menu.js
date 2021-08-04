import Component from '@glimmer/component';

export default class PresetMenuComponent extends Component {

  show;

  constructor() {
    super(...arguments);

    this.show = false;
  }
}
