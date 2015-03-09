
/**
 * Injectible for d3 global
 *
 * @package d3
 */

angular.module('d3', []).factory('d3', function($window) {
  'use strict';
  return $window.d3;
}); 


