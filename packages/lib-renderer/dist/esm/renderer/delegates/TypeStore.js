let _Symbol$iterator;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_Symbol$iterator = Symbol.iterator;

/**
 * A symbol-mapping data retriever
 */
export class GenericTypeStore {
  constructor() {
    _defineProperty(this, "_items", new Map());

    _defineProperty(this, "_handlers", []);

    _defineProperty(this, "destroyed", false);
  }

  register(type, store) {
    this._items.set(type, store);

    for (const handler of this._handlers) {
      handler(type, store);
    }
  }

  types() {
    return this._items.keys();
  }

  retrieve(type) {
    return this._items.get(type);
  }

  onRegister(handler) {
    this._handlers.push(handler);

    return () => {
      this._handlers.splice(this._handlers.indexOf(handler), 1);
    };
  }
  /**
   * @inheritdoc
   * @see {@link TypeStore.destroy}
   */


  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;

      this._items.forEach(item => {
        if (typeof item.destroy === 'function') {
          item.destroy();
        }
      });

      this._items.clear();
    }
  }
  /**
   * @inheritdoc
   */


  [_Symbol$iterator]() {
    return this._items.values();
  }

}