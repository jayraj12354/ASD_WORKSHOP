const cacheEntries = new Map();
const cacheTimeToLive = 60 * 1000;

function getCacheEntry(cacheKey) {
  const cacheEntry = cacheEntries.get(cacheKey);

  if (!cacheEntry) {
    return null;
  }

  if (Date.now() - cacheEntry.createdAt >= cacheTimeToLive) {
    cacheEntries.delete(cacheKey);
    return null;
  }



  return cacheEntry.value;
}

function storeCacheEntry(cacheKey, value) {
  cacheEntries.set(cacheKey, {
    value,
    createdAt: Date.now(),
  });
}

function clearCache() {
  cacheEntries.clear();
}

module.exports = {
  getCacheEntry,
  storeCacheEntry,
  clearCache,
};