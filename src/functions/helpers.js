export function sanitizeObject(obj, depth = 0, maxDepth = 32, cache = new WeakMap()) {
    if (depth >= maxDepth) return null;  // Exceeded maximum depth
    if (cache.has(obj)) return null;  // Cyclic reference
    
    if (Array.isArray(obj)) {
      cache.set(obj, true);
      return obj.map(item => sanitizeObject(item, depth + 1, maxDepth, cache));
    }
    
    if (obj !== null && typeof obj === 'object') {
      cache.set(obj, true);
      const sanitizedObj = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitizedObj[key] = sanitizeObject(value, depth + 1, maxDepth, cache);
      }
      return sanitizedObj;
    }
    
    return obj;
  }

  export function findValueByKey(obj, keyName) {
    return obj.hasOwnProperty(keyName) ? obj[keyName] : undefined;
  }

  export function timestampToLocalString(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }