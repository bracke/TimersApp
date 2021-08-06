import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';


module('Integration | Component | timers/item', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders without countdown', async function (assert) {

    var aTimer = {
      name: 'untitled',
      target_runtime: 0,
      is_countdown: false,
      Play_Sound_When_Done: false,
      running: false,
      runtime: 0
    };
    this.set('timer', aTimer);
    this.set('closeAction', function (val) {  });

    await render(hbs`<Timers::Item
      @timer={{this.timer}}
      @close={{this.closeAction}}
    />`);

    assert.dom('[data-test-close-button]').exists();

    assert.dom('[data-test-start-button]').exists();
    assert.dom('[data-test-reset-button]').exists();
    assert.dom('[data-test-stop-button]').doesNotExist();

    assert.dom('[data-test-runtime]').exists();
    assert.dom('[data-test-countdown]').doesNotExist();
    assert.dom('[data-test-progress-circle]').doesNotExist();
  });

  test('it renders with countdown', async function (assert) {
    var aTimer = {
      name: 'untitled',
      target_runtime: 0,
      is_countdown: true,
      Play_Sound_When_Done: true,
      running: true,
      runtime: 0,
    };
    this.set('timer', aTimer);
    this.set('closeAction', function (val) {});

    await render(hbs`<Timers::Item
      @timer={{this.timer}}
      @close={{this.closeAction}}
    />`);

    assert.dom('[data-test-close-button]').exists();

    assert.dom('[data-test-start-button]').doesNotExist();
    assert.dom('[data-test-reset-button]').exists();
    assert.dom('[data-test-stop-button]').exists();

    assert.dom('[data-test-runtime]').exists();
    assert.dom('[data-test-countdown]').exists();
    assert.dom('[data-test-progress-circle]').exists();
  });
});
