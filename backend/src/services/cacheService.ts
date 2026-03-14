import NodeCache from "node-cache";

class CacheService {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache({
      stdTTL: 300,      // 5 minutes
      checkperiod: 120, // auto cleanup
      useClones: false
    });
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  del(key: string) {
    this.cache.del(key);
  }

  flush() {
    this.cache.flushAll();
  }
}

export const cacheService = new CacheService();