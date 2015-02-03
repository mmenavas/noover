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

    timers: [],

    initialize: function(options) {

      // Timers
      var clockId;
      var blinkerId;
      var greenId;
      var yellowId;


      // Reset
      var totalSeconds = options.green + options.yellow;
      while(this.timers.length > 0) {
        clearInterval(this.timers.pop());
      }
      Signal.reset();
      this.$el.attr('class', Signal.getColor());


      // Start clock
      $('.clock .minutes').text(this.pad(parseInt(totalSeconds/60)));
      $('.clock .seconds').text(this.pad(totalSeconds % 60));

      clockId = setInterval(function() {
        totalSeconds--;
        if (totalSeconds < 0) {
          clearInterval(clockId);
        }
        else {
          $('.clock .minutes').text(this.pad(parseInt(totalSeconds/60)));
          $('.clock .seconds').text(this.pad(totalSeconds % 60));

          if (totalSeconds == 5) {
            var blink = true;
            blinkerId = setInterval(function() {
              if (blink) {
                this.$el.removeClass(Signal.getColor());
                blink = false;
              }
              else {
                this.$el.attr('class', Signal.getColor());
                blink = true;
              }
            }.bind(this), 125);
            this.timers.push(blinkerId);
          }
          else if (totalSeconds == 0) {
            clearInterval(blinkerId);
            this.$el.attr('class', Signal.getColor());
          }

        }
      }.bind(this), 1000);
      this.timers.push(clockId);


      // Start timer
      greenId = setTimeout(function() {

        this.next();
        yellowId = setTimeout(function() {
          this.next();
        }.bind(this), options.yellow * 1000); 
        this.timers.push(yellowId);

      }.bind(this), options.green * 1000);
      this.timers.push(greenId);

    },

    next: function() {
      Signal.next();
      this.$el.attr('class', Signal.getColor());
    },

    /**
     * Code borrowed from http://stackoverflow.com/a/11187738
     **/
    pad: function(input, size) {
      var s = String(input);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    }

  });

  return SignalView;

});
