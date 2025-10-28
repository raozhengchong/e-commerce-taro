/**
 * next.config.js
 * Persistent rewrite to map /catalog/category/:id -> /catalog/category/[id]
 */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/catalog/category/:id',
        destination: '/catalog/category/[id]'
      }
    ];
  }
};

