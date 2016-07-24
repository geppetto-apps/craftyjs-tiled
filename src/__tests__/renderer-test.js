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

interface Component2D {
  x: number;
  y: number;
  w: number;
  h: number,
}

describe('Renderer', () => {
  let renderer;

  beforeEach((done) => {
    loadMap().then((map) => {
      renderer = new Renderer(map);
      done();
    });
  });

  it('should be able to render a map to the canvas', () => {
    renderer.render();
    expect(Crafty('Tile, Sprite').length).toBe(16);
    expect(Crafty('TileSprite_1').length).toBe(11);
    expect(Crafty('TileSprite_6').length).toBe(3);
    expect(Crafty('TileSprite_7').length).toBe(2);
  });

  it('should render the top right row correctly', () => {
    renderer.render();
    const tiles: Component2D[] = Crafty('2D').get();

    tiles.forEach((tile) => {
      expect(tile.w).toBe(256);
      expect(tile.h).toBe(128);
    });

    expect(tiles[0].x).toBe(512);
    expect(tiles[1].x).toBe(640);
    expect(tiles[2].x).toBe(768);
    expect(tiles[3].x).toBe(896);
    expect(tiles[0].y).toBe(64);
    expect(tiles[1].y).toBe(128);
    expect(tiles[2].y).toBe(192);
    expect(tiles[3].y).toBe(256);
  });

  it('should render the bottom left row correctly', () => {
    renderer.render();
    const tiles: Component2D[] = Crafty('2D').get();

    tiles.forEach((tile) => {
      expect(tile.w).toBe(256);
      expect(tile.h).toBe(128);
    });

    expect(tiles[12].x).toBe(128);
    expect(tiles[13].x).toBe(256);
    expect(tiles[14].x).toBe(384);
    expect(tiles[15].x).toBe(512);
    expect(tiles[12].y).toBe(256);
    expect(tiles[13].y).toBe(320);
    expect(tiles[14].y).toBe(384);
    expect(tiles[15].y).toBe(448);
  });
});
