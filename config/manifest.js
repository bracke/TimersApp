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
    icons: [
      {
        src: 'favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: 'apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: 'icon192.png',
        sizes: '192x192',
        purpose: 'any',
        type: 'image/png',
      },
      {
        src: 'maskable_icon.png',
        sizes: '192x192',
        purpose: 'maskable',
        type: 'image/png',
      },
    ],
    ms: {
      tileColor: '#fff',
    },
  };
};
