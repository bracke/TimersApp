'use strict';

module.exports = function (/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: 'Timers',
    short_name: 'Timers',
    description: 'As Many Timers and Countdowns as You want!',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [],
    ms: {
      tileColor: '#fff',
    },
  };
};
