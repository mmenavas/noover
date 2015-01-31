/*global define*/
define([
	'jquery',
	'underscore',
	'backbone',
  'views/signal',
], function ($, _, Backbone, SignalView ) {
  'use strict';

  var AppView = Backbone.View.extend({

    events: {
      'click #start': 'startTimer',
      'click h1': 'toggleSettings'
    },

    el: 'body',

    initialize: function() {
      $('#app').attr('class', 'noover-off');
    },

    startTimer: function(event) {
      event.preventDefault();
      
      var greenTime = 0;
      var yellowTime = 0;
      var greenInput = $('input.green');
      var yellowInput = $('input.yellow');
      var settings = $('#settings');

      settings.attr('class', 'minimize');

      if (!isNaN(greenInput.val()) && (greenInput.val() > 0)) {
        greenTime = greenInput.val();
      }
      if (!isNaN(yellowInput.val()) && (yellowInput.val() > 0)) {
        yellowTime = yellowInput.val();
      }

      new SignalView({
        green: greenTime,
        yellow: yellowTime
      });    
    },

    toggleSettings: function() {
      var settings = $('#settings');
      if (settings.hasClass('minimize')) {
        settings.removeClass('minimize');
      }
      else {
        settings.addClass('minimize');
      }
    }

  });

  return AppView;

});
