// @flow
import type { LayerType } from './layer';
import type { TilesetType } from './tileset';

export type MapType = {
  layers: Array<LayerType>;
  tileSets: Array<TilesetType>;
}


// TODO: https://github.com/andrewrk/node-tmx-parser/blob/master/index.js#L811
