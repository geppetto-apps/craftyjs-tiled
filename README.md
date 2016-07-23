# Crafty Tiled

Crafty Tiled is an addon for the Crafty.js game engine.

The project goal is to support as many features from Tiled as possible.

## Installation

```
npm i crafty-tiled --save
# or
bower install crafty-tiled --save
```

## Usage

```
import 'craftyjs-tiled';

Crafty.tiled.render('/map.tmx').then(function() {
  // All done loading
}).catch(function(error) {
  // Something went wrong
});
```

Play online: http://holy-grail-game.io/

## Contributing

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/geppetto-apps/holy-grail/graphs/contributors

## License

Holy Grail is Copyright (c) 2016 Theodor Tonum
It is free software, and may be redistributed
under the terms specified in the [LICENSE] file.

  [LICENSE]: /LICENSE

## About

Holy Grail is maintained by Theodor Tonum.
