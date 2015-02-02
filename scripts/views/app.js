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
      var greenMinutes = $('input.green.minutes');
      var greenSeconds = $('input.green.seconds');
      var yellowMinutes = $('input.yellow.minutes');
      var yellowSeconds = $('input.yellow.seconds');
      var settings = $('#settings');

      settings.attr('class', 'minimize');

      if (!isNaN(greenMinutes.val()) && (greenMinutes.val() > 0)) {
        greenTime = parseInt(greenMinutes.val()) * 60;
      }
      if (!isNaN(greenSeconds.val()) && (greenSeconds.val() > 0)) {
        greenTime = greenTime + parseInt(greenSeconds.val());
      }
      if (!isNaN(yellowMinutes.val()) && (yellowMinutes.val() > 0)) {
        yellowTime = parseInt(yellowMinutes.val()) * 60;
      }
      if (!isNaN(yellowSeconds.val()) && (yellowSeconds.val() > 0)) {
        yellowTime = yellowTime + parseInt(yellowSeconds.val());
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
