// @flow
/* eslint arrow-body-style: 0, new-cap: 0, global-require: 0 */
/* global Crafty */
import 'craftyjs/dist/crafty.js'; // TODO: Fix this ugliness
import Renderer from '../renderer';
import loadTileMap from '../__fixtures__/map-1.tmx.js';
import loadObjectMap from '../__fixtures__/object-example.tmx.js';

jest.unmock('tmx-parser');
jest.unmock('../renderer');
jest.unmock('../util/sprite-name-from-gid');
jest.unmock('../__fixtures__/map-1.tmx.js');
jest.unmock('../__fixtures__/object-example.tmx.js');

declare class Component2D extends Entity {
  x: number;
  y: number;
  w: number;
  h: number,
}

describe('Renderer', () => {
  let renderer;

  afterEach(() => {
    Crafty.stop();
    Crafty('*').each(function destroy() { this.destroy(); });
  });

  describe('basic tile rendering', () => {
    beforeEach((done) => {
      loadTileMap().then((map) => {
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

  describe('Rendering objects', () => {
    beforeEach((done) => {
      loadObjectMap().then((map) => {
        renderer = new Renderer(map);
        done();
      });
    });

    it('should detect and add the object as an entity', () => {
      renderer.render();
      expect(Crafty('Obj Tree').length).toBe(1);
    });

    it('should render the tree with the correct sprite', () => {
      renderer.render();
      expect(Crafty('Tree TileSprite_50').length).toBe(1);
    });

    it('should size and place the entity correctly', () => {
      renderer.render();
      const entity: Component2D = Crafty('Tree 2D').get(0);
      expect(entity.x).toBe(512); // 2 tile widths
      expect(entity.y).toBe(448); // 3 tile height + padding
      expect(entity.w).toBe(256);
      expect(entity.h).toBe(256);
    });

    it('should annotate for easier debugging', () => {
      renderer.render();
      const entity: Entity = Crafty('Tree').get(0);
      expect(entity._entityName).toBe('This is a tree'); // eslint-disable-line
    });

    it('should handle custom properties', () => {
      renderer.render();
      const tree: Entity = Crafty('Tree').get(0);
      expect(tree.attr('color')).toBe('green');
      expect(tree.attr('growing')).toBe(true);
      expect(tree.attr('height')).toBe(2);
      expect(tree.attr('pi')).toBe(3.14);
    });
  });
});
