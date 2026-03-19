declare class CacheService {
    private cache;
    constructor();
    get(key: string): unknown;
    set(key: string, value: any): void;
    del(key: string): void;
    flush(): void;
}
export declare const cacheService: CacheService;
export {};
