'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-native-drag-grid.cjs.production.min.jsx');
} else {
  module.exports = require('./react-native-drag-grid.cjs.development.jsx');
}
