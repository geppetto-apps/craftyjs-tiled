// @flow

type TileDefinitionType = {
  id: number;
  gid: number;
}

export type TilesetType = {
  firstGid: number;
  image: Object;
  margin: ?number;
  name: ?string;
  properties: Object;
  spacing: ?number;
  source: ?string;
  terrainTypes: Array<*>;
  tileHeight: number;
  tileOffset: Object;
  tiles: Array<TileDefinitionType>;
  tileWidth: number;
}
