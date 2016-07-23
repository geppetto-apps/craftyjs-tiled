/* @flow */
/* global Crafty */
import Loader from './loader';
import Renderer from './renderer';

Crafty.tiled = {
  fetch() {},
  render(url: string): Promise<void> {
    const loader = new Loader();
    loader.url = url;
    loader.fetch = this.fetch;
    return loader.load().then((map): Promise<*> => {
      const renderer = new Renderer(map);
      return renderer.render();
    });
  },
};
