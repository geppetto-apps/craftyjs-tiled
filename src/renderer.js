/* @flow */
/* global Crafty */
/* eslint no-use-before-define: 0 */
import spriteNameFromGid from './util/sprite-name-from-gid';
import type { MapType } from './types/map';
import type { LayerType } from './types/layer';

function isCanvasSupported(): boolean {
  const elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

type Vector2dType = {
  x: number;
  y: number;
}

type Vector2dMutableType = Vector2dType | {
  multiply(vec: Vector2dType): Vector2dMutableType;
  scale(scalar: number): Vector2dMutableType;
  add(vec: Vector2dType): Vector2dMutableType;
}

export default class Renderer {
  map: MapType;
  tileSize: Vector2dType;
  origo: Vector2dType;

  constructor(map: MapType) {
    const { height, tileWidth, tileHeight } = map;

    this.map = map;

    this.tileSize = new Crafty.math.Vector2D(
      tileWidth,
      tileHeight
    );

    this.origo = new Crafty.math.Vector2D(
      (height) * (tileWidth / 2),
      (tileHeight / 2)
    );
  }

  render(): Promise<void> {
    return new Promise((resolve) => {
      this.map.layers.forEach(this.renderLayer.bind(this));
      resolve();
    });
  }

  renderLayer(layer: LayerType) {
    const { width } = this.map;

    if (layer.type === 'tile') {
      layer.tiles.forEach((tile, index) => {
        const x = (index % width);
        const y = Math.floor(index / width);

        this.renderTile(tile.gid, x, y);
      });
    }
  }

  renderTile(gid: number, x: number, y: number) {
    const deltaX = x - y;
    const deltaY = x + y;

    const position = new Crafty.math.Vector2D(deltaX, deltaY)
                                    .multiply(this.tileSize)
                                    .scale(1 / 2)
                                    .add(this.origo);

    const componentList = [
      '2D',
      'Tile',
      spriteNameFromGid(gid),
    ];

    // TODO: Add some kind of test for this
    if (isCanvasSupported()) componentList.push('Canvas');

    Crafty.e(...componentList).attr({
      x: position.x,
      y: position.y,
      w: this.tileSize.x,
      h: this.tileSize.y,
    });
  }
}
