;(function($) {
  var defaults = {
    tickFrequency: 100,
    arcWidth: 10,
    arcColor: "#27ae60",
    arcBackgroundColor: "#d7d8d9",
    toFixed: 1,
    introDuration: 500,
    completeFn: null
  };
  var STATE = {
    PLAYING: "playing",
    PAUSED: "paused",
    STOPPED: "stopped"
  };

  $.fn.cooldown = function(options) {
    if (this.length > 1) {
      var elements = [];
      for (var i = 0; i < this.length; i++) {
        elements.push(this.eq(i).cooldown(options));
      }
      return elements;
    }

    var _this = this;
    $.extend(this, {
      // Private methods, chainable
      _init: function() {
        // TODO: Validate options
        this.sideLength = Math.min(this.width(), this.height());

        return this;
      },
      _tick: function() {
        // Note: This will fail during DST and other freak of nature time rewinds
        this.remainingTime = this.duration - (new Date() - this.timePing) / 1000;
        if (this.remainingTime <= 0) {
          this.state = STATE.STOPPED;
          clearInterval(this.interval);
          this.remainingTime = 0;
          if (this.completeFn) {
            this.completeFn();
          }
        }
        this.remainingTimeElement.html(this.remainingTime.toFixed(this.toFixed));

        return this;
      },
      _setActive: function(active) {
        if (active) {
          this.interval = setInterval(function() {
            _this._tick.apply(_this);
          }, this.tickFrequency);
          if (this.svgElement) {
            this.svgElement.unpauseAnimations();
          }
        } else {
          clearInterval(this.interval);
          if (this.svgElement) {
            this.svgElement.pauseAnimations();
          }
        }

        return this;
      },
      // Public methods, not chainable
      start: function(duration) {
        this.stop();
        this.duration = this.remainingTime = duration;

        if (!(typeof this.duration === "number" && this.duration >= 0)) {
          throw new SyntaxError("Invalid [duration]");
        }

        var radius = this.sideLength / 2 - this.arcWidth / 2;
        var pathDescription = ["M", this.sideLength / 2, this.arcWidth / 2,
            "a", radius, radius, 0, 1, 0, 0.01, 0].join(" ");
        var circumference = Math.ceil(Math.PI * (this.sideLength - this.arcWidth));

        this.css("position", "relative").html([
          "<svg style='position: absolute; top: 0; left: 0;'",
              "width='", this.sideLength, "' height='", this.sideLength, "'>",
            "<path fill='none' stroke-dashoffset='", circumference, "' ",
                "stroke-dasharray='", circumference, "' ",
                "stroke='", this.arcBackgroundColor, "' ",
                "stroke-width='", this.arcWidth, "' ",
                "d='", pathDescription, "'>",
              "<animate attributeName='stroke-dashoffset' from='", -circumference, "' to='0' ",
                  "dur='", this.introDuration / 1000, "' />",
              "<animate attributeName='stroke-dashoffset' from='0' to='", circumference, "' ",
                  "begin='", this.introDuration / 1000, "' dur='", this.duration, "' />",
            "</path>",
            "<path fill='none' stroke-opacity='0' ",
                "stroke-dasharray='", circumference, "' ",
                "stroke='", this.arcColor, "' ",
                "stroke-width='", this.arcWidth, "' ",
                "d='", pathDescription, "'>",
              "<animate attributeName='stroke-dashoffset' from='", -circumference, "' to='0' ",
                  "begin='", this.introDuration / 1000, "' dur='", this.duration, "' />",
              "<animate attributeName='stroke-opacity' from='1' to='1' ",
                  "begin='", this.introDuration / 1000, "' dur='indefinite' />",
            "</path>",
          "</svg>",
          "<div class='remaining-time' style='",
              "width: 100%; height: 100%; margin: 0; padding: 0; text-align: center; font-size: 16px;",
              "line-height: ", this.sideLength, "px;'></div>"
        ].join(""));
        this.svgElement = this.find("svg")[0];
        this.remainingTimeElement = this.find(".remaining-time");

        setTimeout(function() {
          _this.state = STATE.PAUSED;
          _this.remainingTimeElement.html(_this.duration.toFixed(_this.toFixed));
          _this.resume.apply(_this);
        }, this.introDuration);
      },
      stop: function() {
        this.state = STATE.STOPPED;
        this._setActive(false).empty();
      },
      pause: function() {
        if (this.state !== STATE.PLAYING) {
          return;
        }
        this.state = STATE.PAUSED;
        this._setActive(false)._tick();
        this.duration = this.remainingTime;
      },
      resume: function() {
        if (this.state !== STATE.PAUSED) {
          return;
        }
        this.state = STATE.PLAYING;
        this.timePing = new Date();
        this._setActive(true);
      }
    }, defaults, options);
    this._init();

    return {
      start: function() { return _this.start.apply(_this, arguments); },
      stop: function() { return _this.stop.apply(_this); },
      pause: function() { return _this.pause.apply(_this); },
      resume: function() { return _this.resume.apply(_this); }
    };
  };
})(jQuery);
