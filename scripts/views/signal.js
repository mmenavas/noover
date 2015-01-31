/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
  'models/signal'
], function ($, _, Backbone, Signal) {
  'use strict';

  var SignalView = Backbone.View.extend({

    model: Signal,

    el: '#app',

    initialize: function(options) {
      Signal.reset();
      this.$el.attr('class', Signal.getColor());

      // @TODO Replace hardcoded values with #settings values
      setTimeout(function() {
        this.next();
        setTimeout(function() {
          this.next();
        }.bind(this), options.yellow * 1000); 
      }.bind(this), options.green * 1000);

    },

    next: function() {
      Signal.next();
      this.$el.attr('class', Signal.getColor());
    },

  });

  return SignalView;

});
