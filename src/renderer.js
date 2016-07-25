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

type Vector2D = Crafty.math.Vector2D;

type TmxObjectType = {
  name: string;
  type: ?string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  properties: Object;
  gid: number;
  visible: boolean;
  ellipse: boolean;
  polygon: ?boolean;
  polyline: ?boolean;
}

export default class Renderer {
  map: MapType;
  tileSize: Vector2D;
  origo: Vector2D;

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
    } else if (layer.type === 'object') {
      layer.objects.forEach(this.renderObject.bind(this));
    }
  }

  renderTile(gid: number, x: number, y: number) {
    const position = this.translateCoordinates({ x, y });

    this.renderSprite({
      components: ['Tile'],
      x: position.x,
      y: position.y,
      width: this.tileSize.x,
      height: this.tileSize.y,
      gid,
    });
  }

  renderObject(object: TmxObjectType) {
    const position = this.translateCoordinates(
      this.normalizeCoordinates(object)
    );

    this.renderSprite({
      components: ['Obj', object.type],
      x: position.x,
      y: position.y,
      width: object.width,
      height: object.height,
      gid: object.gid,
    }).setName(object.name).attr(object.properties);
  }

  renderSprite(data: {
    components: Array<?string>,
    x: number,
    y: number,
    width: number,
    height: number,
    gid: number
  }): any {
    const componentList = [
      '2D',
      spriteNameFromGid(data.gid),
    ];

    data.components.forEach((component) => {
      if (component) componentList.push(component);
    });

    // TODO: Add some kind of test for this
    if (isCanvasSupported()) componentList.push('Canvas');

    return Crafty.e(...componentList).attr({
      x: data.x,
      y: data.y,
      w: data.width,
      h: data.height,
    });
  }

  // Converts a vector of small coordinates to screen coordinates
  translateCoordinates(vector: { x: number, y: number }): Vector2D {
    const { x, y } = vector;
    const deltaX = x - y;
    const deltaY = x + y;

    return new Crafty.math.Vector2D(deltaX, deltaY)
                  .multiply(this.tileSize)
                  .scale(1 / 2)
                  .add(this.origo);
  }

  // Takes a vector of large coordinates (like [256, 128]) and
  // converts them to small coordinates (like [2, 1])
  normalizeCoordinates(vector: { x: number, y: number }): Vector2D {
    const { x, y } = vector;
    return new Crafty.math.Vector2D(x, y).scale(1 / this.tileSize.y);
  }
}
