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
      var totalSeconds = options.green + options.yellow;
      var clockId;
      var blinkerId;

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
            console.log(blinkerId);
          }
          else if (totalSeconds == 0) {
            clearInterval(blinkerId);
            this.$el.attr('class', Signal.getColor());
          }

        }
      }.bind(this), 1000);


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
