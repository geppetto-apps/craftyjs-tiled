// @flow

type TileType = {
  id: number;
  terrain: Array<*>;
  probability: ?number;
  properties: Object;
  animations: Array<*>;
  objectGroups: Array<*>;
  image: ?any;
  gid: number;
}

type BaseLayerType = {
  type: '';
  name: string;
  opacity: number;
  visible: boolean;
  properties: Object;
}

type TileLayerType = BaseLayerType & {
  type: 'tile';
  tiles: Array<TileType>;
  horizontalFlips: Object;
  verticalFlips: Object;
  diagonalFlips: Object;
}

type ObjectLayerType = BaseLayerType & {
  type: 'object';
  objects: Array<Object>;
}

export type LayerType = TileLayerType | ObjectLayerType;
