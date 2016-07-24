/* @flow */
/* global Crafty */
import tmx from 'tmx-parser';
import spriteNameFromGid from './util/sprite-name-from-gid';

import type { MapType } from './types/map';

function parseXML(xml: XmlType): Promise<MapType> {
  return new Promise((resolve, reject) => {
    tmx.parse(xml, null, (err, map: MapType) => {
      if (err) {
        reject(err);
      } else {
        resolve(map);
      }
    });
  });
}

export default class Loader {
  url: ?string;
  map: any;
  fetch: (url: ?string) => Promise<XmlType>;

  constructor(url: ?string) {
    this.url = url;
  }

  load(): Promise<MapType> {
    if (!this.url) return Promise.reject(new Error('Invalid argument'));

    return Promise.resolve()
    .then((): Promise<XmlType> =>
      this.fetch(this.url).catch(() => {
        throw new Error('Unreachable URL');
      })
    )
    .then(parseXML)
    .then((map): MapType => {
      this.loadSprites(map);
      return map;
    });
  }

  loadSprites(map: MapType) {
    map.tileSets.forEach((tileset) => {
      const { tiles, tileWidth, tileHeight, image: { source, width } } = tileset;
      const columns = width / tileWidth;
      const spriteMap = {};
      tiles.forEach((tile, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const key = spriteNameFromGid(tile.gid);
        spriteMap[key] = [column, row];
      });
      Crafty.sprite(tileWidth, tileHeight, source, spriteMap);
    });
  }
}
