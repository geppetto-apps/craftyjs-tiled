/* @flow */
/* eslint arrow-body-style: 0, new-cap: 0, global-require: 0 */
/* global Crafty */
import 'craftyjs/dist/crafty.js'; // TODO: Fix this ugliness
import Loader from '../loader';
import fs from 'fs';
import path from 'path';

jest.unmock('fs');
jest.unmock('path');
jest.unmock('../loader');
jest.unmock('../util/sprite-name-from-gid');
jest.unmock('../__fixtures__/map-1.tmx.js');
jest.unmock('tmx-parser');

describe('Loader', () => {
  let loader;

  function invertPromise<T>(promise: Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      promise.then(reject).catch(resolve);
    });
  }

  function allFailed(array: Array<Promise<*>>): Promise<*> {
    return Promise.all(
      array.map(invertPromise)
    );
  }

  beforeEach(() => {
    loader = new Loader();
    loader.fetch = (url: ?string): Promise<XmlType> => {
      if (!url) return Promise.reject();
      if (url !== '/map.json') return Promise.reject();
      const file = path.join(__dirname, '..', '__fixtures__', 'map-1.tmx');
      return Promise.resolve(
        ((fs.readFileSync(file): any): XmlType)
      );
    };
  });

  function load(url: ?string): Promise<any> {
    loader.url = url;
    return loader.load();
  }

  it('accepts a url in the constructor', () => {
    loader = new Loader('/map.json');
    expect(loader.url).toBe('/map.json');
  });

  it('fails when passed bogus values', (done) => {
    allFailed([
      load(undefined),
      load(null),
      load(''),
    ]).then((errors) => {
      expect(errors[0].message).toBe('Invalid argument');
      expect(errors[1].message).toBe('Invalid argument');
      done();
    }).catch(() => {
      expect(false).toBe(true);
      done();
    });
  });

  describe('fetching from unreachable URL', () => {
    it('fails with a proper error message', (done) => {
      load('/somewhere.json').catch((error) => {
        expect(error.message).toBe('Unreachable URL');
        done();
      });
    });
  });

  describe('fetching from a proper URL', () => {
    it('resolves', (done) => {
      load('/map.json').then(done);
    });

    it('should define crafty TileSprite components', (done) => {
      load('/map.json').then(() => {
        const entity = Crafty.e('TileSprite_1');
        expect(entity.has('Sprite')).toBe(true);
        done();
      });
    });
  });
});
