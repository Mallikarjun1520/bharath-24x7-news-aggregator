"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class CacheService {
    constructor() {
        this.cache = new node_cache_1.default({
            stdTTL: 300, // 5 minutes
            checkperiod: 120, // auto cleanup
            useClones: false
        });
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        this.cache.set(key, value);
    }
    del(key) {
        this.cache.del(key);
    }
    flush() {
        this.cache.flushAll();
    }
}
exports.cacheService = new CacheService();
