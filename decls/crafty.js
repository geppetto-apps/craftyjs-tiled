// @flow
/* eslint no-unused-vars: 0, import/no-unresolved: 0 */
type UnbindableType = number;
type EntityIdType = number;

declare class Entity mixins EventListener {
  // Chainable methods
  addComponent(componentName: string): this;
  addComponent(...componentNames: string[]): this;
  attr(property: string, value: any, silent?: boolean, recursive?: boolean): this;
  attr(attrs: { [key: string]: any }, silent?: boolean, recursive?: boolean): this;
  attr(property: string): any;
  clone(): this; // TODO: It returns this type.. Maybe not an issue?
  defineField<T>(property: string, getter: () => T, setter: (value: T) => void): this;
  removeComponent(componentName: string, soft?: boolean): this;
  requires(componentList: string): this;
  setName(name: string): this;
  setter(property: string, callback: Function): this; // TODO: Deprecated
  timeout(callback: Function, delay: number): this;
  toggleComponent(...componentNames: string[]): this;
  trigger(eventName: string, data: Object): this;

  destroy(): this;

  getId(): number;
  has(componentName: string): boolean;
  __c: { [componentName: string]: boolean };
  _entityName: ?string;

  // TODO: Figure out how to move this to EntityListType
  each(method: (index: number) => void): this;
}

declare class EntityInList extends Entity {
  (cb: (index: number) => void): void;
}

declare class EntityListType {
  length: number;

  get(id: EntityIdType): Entity & any;
  get(...rest: Array<void>): Array<Entity & any>;
  each: EntityInList;
  toArray(): EntityIdType[];
}

interface EntityEnumerableType {
  this: Entity;
  exports(fn: (index: number) => void): void;
}

declare class EventListener {
  bind(eventName: string, callback: () => void): this;
  unbind(eventName: string, callback?: UnbindableType): this;
  one(eventName: string, callback: Function): UnbindableType;
  uniqueBind(eventName: string, callback: Function): UnbindableType;
}

declare class CraftyViewport {
  clampToEntities: boolean;

  mouselook(enable: boolean): void;
}

type ComponentDefinitionType = {
  [key: string]: () => any;
};

declare class CraftyClass mixins EventListener {
  viewport: CraftyViewport;

  static math: {
    Vector2D: typeof Vector2D;
  };

  static sprite: {

  };

  static init(): void;
  static e(componentList: string): Entity;
  static e(...componentList: string[]): Entity;
  static c(componentName: string, componentDef: ComponentDefinitionType): void;
}

type CraftyFind = (entityID: EntityIdType) => ?Entity;
type CraftySelect = (selector: string) => EntityListType;

declare var Crafty: CraftyClass & CraftyFind & CraftySelect;

declare class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number): Vector2D;
  scale(scalar: number): this;
  multiply(vec: Vector2D): this;
  add(vec: Vector2D): this;
}
