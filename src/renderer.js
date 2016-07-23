/* @flow */
/* global Crafty */
/* eslint no-use-before-define: 0 */
import spriteNameFromGid from './util/sprite-name-from-gid';
import type { MapType } from './types/map';

export default class Renderer {
  map: MapType;

  constructor(map: MapType) {
    this.map = map;
  }

  render(): Promise<void> {
    return new Promise((resolve) => {
      this.map.layers.forEach((layer) => {
        if (layer.type === 'tile') {
          layer.tiles.forEach((tile) => {
            Crafty.e(`Tile, ${spriteNameFromGid(tile.gid)}`);
          });
        }
      });

      resolve();
    });
  }
}
