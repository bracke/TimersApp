import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | preset-menu', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

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
    this.set('setPreset', function (val) {});

    await render(hbs`<Timers::PresetMenu
      @presets={{this.Presets}}
      @setPreset={{this.setPreset}}
      class="PresetMenu"
    />`);
    assert.dom('[data-test-preset-button]').exists({ count: 2 });
    assert.dom('[data-test-preset-button]').includesText('Pomodoro');
    assert.dom('[data-test-presetmenu-open-button]').isVisible();
    assert.dom('[data-test-preset-menu-dropdown]').isNotVisible();

    await click('[data-test-presetmenu-open-button]');
    assert.dom('[data-test-preset-menu-dropdown]').isVisible();

  });

  test('Triggers external action on select', async function (assert) {

    assert.expect(4);

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
    let that = this;
    this.set(
      'setPreset',
      function (
        actual_name,
        actual_runtime_in_minutes,
        actual_is_countdown,
        actual_play_sound_when_done
      ) {
        assert.equal(actual_name, that.Presets[0].name);
        assert.equal(
          actual_runtime_in_minutes,
          that.Presets[0].runtime_in_minutes
        );
        assert.equal(actual_is_countdown, that.Presets[0].is_countdown);
        assert.equal(
          actual_play_sound_when_done,
          that.Presets[0].play_sound_when_done
        );
      }
    );

    await render(hbs`<Timers::PresetMenu
          @presets={{this.Presets}}
          @setPreset={{this.setPreset}}
          class="PresetMenu"
        />`);

    await click('[data-test-presetmenu-open-button]');
    await click('[data-test-preset-button]');


  });

});
