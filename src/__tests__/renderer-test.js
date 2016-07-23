// @flow
/* eslint arrow-body-style: 0, new-cap: 0, global-require: 0 */
/* global Crafty */
import 'craftyjs/dist/crafty.js'; // TODO: Fix this ugliness
import Renderer from '../renderer';
import loadMap from '../__fixtures__/map-1.tmx.js';

jest.unmock('tmx-parser');
jest.unmock('../renderer');
jest.unmock('../util/sprite-name-from-gid');
jest.unmock('../__fixtures__/map-1.tmx.js');

describe('Renderer', () => {
  let renderer;

  beforeEach((done) => {
    loadMap().then((map) => {
      renderer = new Renderer(map);
      done();
    });
  });

  it('should be able to render a map', () => {
    renderer.render();
    expect(Crafty('Tile, Sprite').length).toBe(16);
    expect(Crafty('TileSprite_1').length).toBe(11);
    expect(Crafty('TileSprite_6').length).toBe(3);
    expect(Crafty('TileSprite_7').length).toBe(2);
  });
});
