// @flow

import fs from 'fs';
import path from 'path';
import tmx from 'tmx-parser';
import type { MapType } from '../types/map';

export default function factory(): Promise<MapType> {
  return new Promise((resolve, reject) => {
    const file = path.join(__dirname, 'map-1.tmx');
    tmx.parse(fs.readFileSync(file), null, (err, map) => {
      if (err) {
        reject(err);
      } else {
        resolve(map);
      }
    });
  });
}
