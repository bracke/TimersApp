import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | timers/create', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {

    this.set('Presets', [
      {
        Name: 'Pomodoro',
        Runtime_In_Minutes: 25,
        Is_Countdown: true,
        Play_Sound_When_Done: false,
      },
      {
        Name: 'Break',
        Runtime_In_Minutes: 5,
        Is_Countdown: true,
        Play_Sound_When_Done: false,
      },
    ]);
    this.set('addTimer', function (val) {});
    this.set('cancelCreateDialog', function (val) {});

    await render(hbs`<Timers::Create
        @cancel={{this.cancelCreateDialog}}
        @addTimer={{this.addTimer}}
        @presets={{this.Presets}}
      />
    `);

    assert.dom('[data-test-cancel-button]').exists();
    assert.dom('[data-test-add-button]').exists();

    assert.dom('[data-test-timer_name]').exists();
    assert.dom('[data-test-iscountdown]').exists();

    // Targetruntime and play-sound-when-done
    // should not be visible unless countdown is selected.
    assert.dom('[data-test-targetruntime]').doesNotExist();
    assert.dom('[data-test-play-sound-when-done]').doesNotExist();

    await click('[data-test-iscountdown]');
    assert.dom('[data-test-targetruntime]').exists();
    assert.dom('[data-test-play-sound-when-done]').exists();

    assert.dom('[data-test-preset-button]').exists({ count: 2 });

    assert.dom('[data-test-preset-button]').includesText('Pomodoro');

  });
});