
export const OBJECTS = {
  /**
 * Sanitizes an object to reduce its depth and eliminate cycles.
 *
 * @param {object | any[]} obj - The object to sanitize.
 * @param {number} [depth=0] - The current depth level, used internally during recursion.
 * @param {number} [maxDepth=32] - The maximum depth to traverse.
 * @param {WeakMap} [cache=new WeakMap()] - Cache to keep track of visited objects and prevent cycles.
 *
 * @returns {object | any[] | null} - The sanitized object or array.
 */
  sanitizeObject: (obj, depth = 0, maxDepth = 32, cache = new WeakMap()) => {
    if (depth >= maxDepth) return null;
    if (cache.has(obj)) return null;

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
  },

  /**
   * Finds the value associated with a given key in an object.
   *
   * @param {object} obj - The object to search in.
   * @param {string} keyName - The key whose associated value needs to be returned.
   *
   * @returns {any | undefined} - The value associated with the key or undefined if not found.
   */
  findValueByKey: (obj, keyName) => {
    return obj.hasOwnProperty(keyName) ? obj[keyName] : undefined;
  },

  /**
   * Ensures a specific key appears first in an object.
   * If the key doesn't exist, the original object is returned.
   * 
   * @param {Object} obj - The object in which the key should be ensured first.
   * @param {string} key - The key that should be made first in the object.
   *
   * @returns {Object} - A new object where the specified key is the first property.
   */
  ensureKeyFirst: (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      return {
        [key]: obj[key],
        ...obj
      };
    }
    return obj;
  },
  SEARCH: {
    /**
 * Recursive function to search within an object or value.
 * @param {Object|any} obj - The value or object to search within.
 * @param {string} query - The search query.
 * @returns {boolean} - Whether the value or object contains the search query.
 */
    containsQuery: (obj, query) => {
      if (typeof obj !== 'object' || obj === null) {
        return String(obj).toLowerCase().includes(query.toLowerCase());
      }

      if (Array.isArray(obj)) {
        return obj.some(item => containsQuery(item, query));
      }

      for (let key in obj) {
        if (containsQuery(obj[key], query)) {
          return true;
        }
      }

      return false;
    },

    /**
    * Filters an object based on a search query, targeting every array within.
    * @param {Object} obj - The object to filter.
    * @param {string} query - The search query.
    * @returns {Object|Array} - The filtered object or array.
    */
    filterObjectByQuery: (obj, query) => {
      if (typeof obj !== 'object' || obj === null) {
        return obj;
      }

      if (Array.isArray(obj)) {
        return obj
          .filter(item => containsQuery(item, query))
          .map(item => filterObjectByQuery(item, query));
      }

      const filteredObj = {};

      for (let key in obj) {
        filteredObj[key] = filterObjectByQuery(obj[key], query);
      }

      return filteredObj;
    }
  }
}

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
