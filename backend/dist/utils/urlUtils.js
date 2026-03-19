"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeUrl = void 0;
const normalizeUrl = (url) => {
    try {
        const parsed = new URL(url);
        // Remove tracking query params (like ?utm=, ?at_medium=RSS)
        parsed.search = "";
        // Remove trailing slash
        let clean = parsed.toString();
        if (clean.endsWith("/")) {
            clean = clean.slice(0, -1);
        }
        return clean;
    }
    catch {
        return url;
    }
};
exports.normalizeUrl = normalizeUrl;
