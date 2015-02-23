
angular.module('ex.example.service', [])
  .factory('exExample', function() {
    'use strict';
    var exports;

    var Example = function(llX, llY, trX, trY, isPositive) {
      this.lowerLeftX = llX;
      this.lowerLeftY = llY;
      this.topRightX = trX;
      this.topRightY = trY;
      this.isPositive = isPositive;
    };

    /**
     * Factory for examples
     *
     * @param {integer} blX X-value of bottom left corner
     * @param {integer} blY Y-value of bottom left corner
     * @param {integer} trX X-value of top right corner
     * @param {integer} trY Y-value of top right corner
     * @param {boolean} isPositive Whether or not 
     */
    exports = function(llX, llY, trX, trY, isPositive) {
      return new Example(llX, llY, trX, trY, isPositive);
    };

    return exports;
  });
