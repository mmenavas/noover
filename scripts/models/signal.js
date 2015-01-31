/*global define*/
define([
  'underscore',
  'backbone',
  'backboneLocalstorage',
], function (_, Backbone, Store) {

  'use strict';

  var Signal = Backbone.Model.extend({

    localStorage: new Store('noover-backbone'),

    defaults: {
      colors: [
        'green',
        'yellow',
        'red'
      ],
      state: 0
    },

    reset: function() {
      this.save({
        state: 0
      });
    },

    next: function() {
      if ((this.get('state') + 1) < this.get('colors').length) {
        this.save({
          state: this.get('state') + 1
        });
      }
      else {
        this.reset();
      }
    },

    getColor: function() {
      return this.get('colors')[this.get('state')];
    }

  });

  return new Signal();

});
