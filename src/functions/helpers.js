



export const OBJECTS = {
  sanitizeObject: function(obj, depth = 0, maxDepth = 32, cache = new WeakMap()) {
    if (depth >= maxDepth) return null;
    if (cache.has(obj)) return null;

    if (Array.isArray(obj)) {
      cache.set(obj, true);
      return obj.map(item => this.sanitizeObject(item, depth + 1, maxDepth, cache));
    }

    if (obj !== null && typeof obj === 'object') {
      cache.set(obj, true);
      const sanitizedObj = {};
      for (const [key, value] of Object.entries(obj)) {
        sanitizedObj[key] = this.sanitizeObject(value, depth + 1, maxDepth, cache);
      }
      return sanitizedObj;
    }

    return obj;
  },
  findValueByKey: function(obj, keyName) {
    return obj.hasOwnProperty(keyName) ? obj[keyName] : undefined;
  },
  ensureKeyFirst: function(obj, key) {
    if (obj?.hasOwnProperty(key)) {
      return {
        [key]: obj[key],
        ...obj
      };
    }
    return obj;
  },
  SEARCH: {
    containsQuery: function(obj, query) {
      if (typeof obj !== 'object' || obj === null) {
        return String(obj).toLowerCase().includes(query.toLowerCase());
      }

      if (Array.isArray(obj)) {
        return obj.some(item => this.containsQuery(item, query));
      }

      for (let key in obj) {
        if (this.containsQuery(obj[key], query)) {
          return true;
        }
      }

      return false;
    },
    filterObjectByQuery: function(obj, query) {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj
          .filter(item => this.containsQuery(item, query))
          .map(item => this.filterObjectByQuery(item, query));
      }

      const filteredObj = {};

      for (let key in obj) {
        filteredObj[key] = this.filterObjectByQuery(obj[key], query);
      }

      return filteredObj;
    }
  }
};


export const TIME = {
  /**
   * Converts a timestamp to a localized readable date string.
   *
   * @param {number} timestamp - The timestamp to convert, in milliseconds.
   *
   * @returns {string} - The localized date string.
   */
  timestampToLocalString: (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
