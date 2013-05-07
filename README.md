# Cooldown.js

A jQuery plugin that displays a circular timer.

[View the demo page](http://zdyn.github.io/cooldown.js)

4.4 KB minified  
1.5 KB minified and gzipped

## Prerequisites

jQuery (tested in 2+, but probably works in most versions)

## Supported browsers

* Chrome 26+
* Firefox 20+
* Safari 6+
* IE 9+

These are only the browsers/versions that I've tested. Older browsers may be supported.

## Usage

Initialize the cooldown. The cooldown occupies a maximum square space within the provided element.
```javascript
var cooldown = $("#some-div").cooldown();
```

The following methods are provided:

* start(durationInSeconds)
* stop
* pause
* resume
    
Example usage:
```javascript
var cooldown = $("#some-div").cooldown();
cooldown.start(20);
```

## Options

Override the default options by passing in an object of key-value pairs when initializing the cooldown. The defaults are shown below:

```javascript
var cooldown = $("#some-div").cooldown({
  tickFrequency:      50,        // Frequency of ticks (milliseconds), not recommended <50, affects
                                 // countdown (and arc in non-Chrome browsers)
  arcWidth:           10,        // Arc stroke width
  arcColor:           "#27ae60", // Arc stroke color
  arcBackgroundColor: "#d7d8d9", // Arc stroke unfinished color
  toFixed:            1,         // Number of decimal places to show in countdown
  introDuration:      500,       // Duration of spinning intro (milliseconds), set to 0 to disable
  countdownCss:       {          // Object of CSS attributes (passed to jQuery's css() function)
                        width: "100%",
                        height: "100%",
                        margin: 0,
                        padding: 0,
                        textAlign: "center",
                        fontSize: "16px"
                      },
  completeFn:         null       // Callback function called when cooldown expires
  countdownFn:        null       // Can be used to override how the countdown is displayed, is passed
                                 // the remaining time in seconds
});
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
