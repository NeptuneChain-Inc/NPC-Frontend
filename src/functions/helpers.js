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

  export function timestampToLocalString(timestamp) {
    // Create a new Date object using the provided timestamp.
    const date = new Date(timestamp);
  
    // Use toLocaleString to convert the date object to a local date-time string.
    const localString = date.toLocaleString();
  
    return localString;
  }