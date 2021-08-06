import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | timers/create', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('Presets', [
      {
        name: 'Pomodoro',
        runtime_in_minutes: 25,
        is_countdown: true,
        play_sound_when_done: false,
      },
      {
        name: 'Break',
        runtime_in_minutes: 5,
        is_countdown: true,
        play_sound_when_done: false,
      },
    ]);
    this.set('addTimer', function () {});
    this.set('cancelCreateDialog', function () {});

    await render(hbs`<Timers::Create
        @cancel={{this.cancelCreateDialog}}
        @addTimer={{this.addTimer}}
        @presets={{this.Presets}}
      />
    `);

    assert.dom('[data-test-cancel-button]').exists();
    assert.dom('[data-test-add-button]').exists();

    assert.dom('[data-test-timer_name]').exists();
    assert.dom('[data-test-is-countdown]').exists();

    // target-runtime and play-sound-when-done
    // should not be visible unless countdown is selected.
    assert.dom('[data-test-target-runtime]').doesNotExist();
    assert.dom('[data-test-play-sound-when-done]').doesNotExist();

    assert.dom('[data-test-is-countdown]').exists();

    await click('[data-test-is-countdown] .x-toggle');
    assert.dom('[data-test-target-runtime]').exists();
    assert.dom('[data-test-play-sound-when-done]').exists();
  });
});
