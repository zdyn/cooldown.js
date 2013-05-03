# Cooldown.js

A jQuery plugin that displays a circular timer.

[View the demo page](http://zdyn.github.io/cooldown.js)

## Prerequisites

jQuery (tested in 2+, but probably works in most versions)

## Supported browsers

Chrome (tested in 26+)  
Firefox (tested in 20+)

## Usage

Initialize the cooldown. The cooldown occupies a square space within the provided element.
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
  tickFrequency:      100,       // Frequency of ticks (milliseconds), not recommended <50, only affects
                                 // countdown
  arcWidth:           10,        // Arc stroke width
  arcColor:           "#27ae60", // Arc stroke color
  arcBackgroundColor: "#d7d8d9", // Arc stroke unfinished color
  toFixed:            1,         // Number of decimal places to show in countdown
  introDuration:      500,       // Duration of spinning intro (milliseconds), set to 0 to disable
  completeFn:         null       // Callback function called when cooldown expires
});
```

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
