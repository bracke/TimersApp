import Component from '@glimmer/component';
export default class NavbarComponent extends Component {
  show;

  constructor() {
    super(...arguments);

    this.show = false;
  }
}
