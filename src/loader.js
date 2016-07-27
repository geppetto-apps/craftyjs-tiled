/* @flow */
/* global Crafty */
import tmx from 'tmx-parser';
import spriteNameFromGid from './util/sprite-name-from-gid';

import type { MapType } from './types/map';
import type { TilesetType } from './types/tileset';

type SpriteMap = {
  [key: string]: [number, number],
}

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
    .then(this.loadSprites);
  }

  loadSprites(map: MapType): Promise<MapType> {
    const promises = map.tileSets.map(Loader.loadTileset);

    return Promise.all(promises).then((): MapType => map);
  }

  static loadTileset(tileset: TilesetType): Promise<void> {
    const { tileWidth, tileHeight, image: { source, width, height } } = tileset;
    const columns = width / tileWidth;
    const rows = height / tileHeight;
    const spriteMap = {};
    for (let index = 0; index < columns * rows; index++) {
      const gid = tileset.firstGid + index;
      const column = index % columns;
      const row = Math.floor(index / columns);
      const key = spriteNameFromGid(gid);
      spriteMap[key] = [column, row];
    }

    return Loader.loadSprite(tileWidth, tileHeight, source, spriteMap);
  }

  static loadSprite(
    tileWidth: number,
    tileHeight: number,
    source: string,
    spriteMap: SpriteMap
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (!Crafty.assets[source]) return;
        resolve();
        clearInterval(interval);
      }, 250);

      Crafty.sprite(tileWidth, tileHeight, source, spriteMap);

      setTimeout(() => {
        clearInterval(interval);
        reject('Timed out waiting for assets to load.');
      }, 5000);
    });
  }
}
