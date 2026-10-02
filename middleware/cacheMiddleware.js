const cacheService = require('../services/cacheService');

function cacheResponse(req, res, next) {
  const cacheKey = req.originalUrl;
  const cachedValue = cacheService.getCacheEntry(cacheKey);

  if (cachedValue !== null) {



    res.set('X-Cache', 'HIT');

    return res.json(cachedValue);
  }

  res.set('X-Cache', 'MISS');
  const originalJson = res.json.bind(res);

  res.json = (responseBody) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {



      cacheService.storeCacheEntry(cacheKey, responseBody);
    }

    return originalJson(responseBody);
  };



  return next();
}

function invalidateCache(req, res, next) {




  res.on('finish', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {




      cacheService.clearCache();
    }
  });

  next();
}

module.exports = {
  cacheResponse,

  
  invalidateCache,
};