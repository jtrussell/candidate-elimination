
angular.module('ex.example.service', [])
  .factory('exExample', function() {
    'use strict';
    var exports;

    var Example = function Example(x, y, isPositive) {
      this.x = x;
      this.y = y;
      this.isPositive = isPositive;
    };

    /**
     * Factory for examples
     *
     * @param {integer} x X-value of the example
     * @param {integer} y Y-value of the example
     * @param {boolean} isPositive Whether or not this is a positive example
     */
    exports = function(x, y, isPositive) {
      return new Example(x, y, isPositive);
    };

    return exports;
  });
