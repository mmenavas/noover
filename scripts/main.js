/**
 * Project name: Noover 
 * Description: Configurable timer.
 * 
 * Author: Maximo Mena
 */

/*global require*/
'use strict';

require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    backboneLocalstorage: {
      deps: [
        'backbone'
      ],
      exports: 'Store'
    }
  },
  paths: {
    jquery: 'vendor/jquery.min',
    backbone: 'vendor/backbone',
    backboneLocalstorage: 'vendor/backbone.localStorage-min',
    underscore: 'vendor/lodash.min'
  }
});

require([
  'backbone',
  'views/app'
], function (Backbone, AppView) {
  Backbone.history.start();

  new AppView();

});
