[![Codeship](https://img.shields.io/codeship/aff896a0-33c7-0134-d156-02ce05b9fb1b.svg?maxAge=2592000)](https://codeship.com/projects/aff896a0-33c7-0134-d156-02ce05b9fb1b/status?branch=master)

# Crafty Tiled

Crafty Tiled is an addon for the Crafty.js game engine.

The project goal is to support as many features from Tiled as possible.

## Installation

```sh
npm i crafty-tiled --save
# or
bower install crafty-tiled --save
```

## Usage

```javascript
import 'craftyjs-tiled';

Crafty.tiled.render('/map.tmx').then(function() {
  // All done loading
}).catch(function(error) {
  // Something went wrong
});
```

## Contributing

See the [CONTRIBUTING] document.
Thank you, [contributors]!

  [CONTRIBUTING]: CONTRIBUTING.md
  [contributors]: https://github.com/geppetto-apps/craftyjs-tiled/graphs/contributors

## License

Crafty Tiled is Copyright (c) 2016 Theodor Tonum
It is free software, and may be redistributed
under the terms specified in the [LICENSE] file.

  [LICENSE]: /LICENSE

## About

Crafty Tiled is maintained by Theodor Tonum.
