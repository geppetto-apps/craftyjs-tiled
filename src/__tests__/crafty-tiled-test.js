/* @flow */
/* eslint arrow-body-style: 0, new-cap: 0 */
/* global Crafty */
import fs from 'fs';
import path from 'path';

import 'craftyjs/dist/crafty.js'; // TODO: Fix this ugliness
import '../craftyjs-tiled';

jest.disableAutomock();
jest.useRealTimers();

Crafty.support.webgl = false;
Crafty.support.canvas = false;

function getCanvas(): HTMLCanvasElement {
  const canvas: ?HTMLCanvasElement = (document.querySelector('canvas'): any);
  if (!canvas) throw new Error('Unable to find canvas in DOM.');
  return canvas;
}

describe('Crafty.tiled', () => {
  beforeEach(() => {
    Crafty.tiled.fetch = (url): Promise<any> => {
      const filename = url.split('/').pop();
      const file = path.join(__dirname, '..', '__fixtures__', filename);
      return Promise.resolve(
        fs.readFileSync(file)
      );
    };

    document.body.innerHTML = '<canvas />';
    Crafty.init(640, 480, getCanvas());
  });

  afterEach(() => {
    Crafty.stop();
    Crafty('*').each(function destroy() { this.destroy(); });
  });

  it('should be able to render a simple 4x4 grid', (done) => {
    Crafty.tiled.render('/maps/4x4-example.tmx').then(() => {
      expect(Crafty('Tile').length).toBe(16);
      done();
    }).catch((err) => {
      throw err;
    });
  });

  it('should be able to render a 4x8 grid', (done) => {
    Crafty.tiled.render('/maps/4x8-example.tmx').then(() => {
      expect(Crafty('Tile').length).toBe(32);
      done();
    }).catch((err) => {
      throw err;
    });
  });
});
