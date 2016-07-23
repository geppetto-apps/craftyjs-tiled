// @flow
import type { LayerType } from './layer';
import type { TilesetType } from './tileset';

export type MapType = {
  layers: Array<LayerType>;
  tileSets: Array<TilesetType>;
}
