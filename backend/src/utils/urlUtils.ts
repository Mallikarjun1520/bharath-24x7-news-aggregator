export const normalizeUrl = (url: string): string => {
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
  } catch {
    return url;
  }
};