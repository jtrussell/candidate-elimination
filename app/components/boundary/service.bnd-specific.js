
angular.module('bnd.specific.service', [])
  .factory('bndSpecific', function() {
    'use strict';
    var exports;

    /**
     * Constructor for Specific Boundaries
     */
    var SpecificBoundary = function SpecificBoundary() {
      this.hypotheses = [];
      this.rejections = [];
      this.examples = [];
    };

    /**
     * Observe a new hypothesis
     *
     * @param {Example} ex The example to observe
     * @param {GeneralBoundary} gbnd The corresponding general boundary
     */
    SpecificBoundary.prototype.observe = function(ex, gbnd) {
      /*code*/
    };

    exports = function() {
      return new SpecificBoundary();
    };

    return exports;
  });
