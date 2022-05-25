type Listener = (value: unknown) => void;

export class Cache {
  private cache: { [key: string]: unknown };
  private listeners: { [key: string]: Listener[] } = {};

  constructor() {
    this.cache = {};
  }

  public get(key: string): unknown {
    return this.cache[key];
  }

  public set(key: string, data: unknown): void {
    this.cache[key] = data;
    this.notifyListeners(key, data);
  }

  public delete(key: string): void {
    delete this.cache[key];
    this.notifyListeners(key);
  }

  public subscribeToKey(key: string, listener: Listener) {
    const subscriptions = this.listeners[key] || [];

    this.listeners[key] = [...subscriptions, listener];

    return () => {
      this.listeners[key] = this.listeners[key].filter((l) => l !== listener);
    };
  }

  public notifyListeners(key: string, value?: unknown) {
    const subscriptions = this.listeners[key];

    if (subscriptions) {
      subscriptions.forEach((subscription) => subscription(value));
    }
  }
}
