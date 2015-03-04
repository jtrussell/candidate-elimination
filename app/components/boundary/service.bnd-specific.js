
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

    /**
     * Determine whether we have a more general memeber than the given
     * hypothesis
     *
     * @param {Hypothesis} hypo The hypothesis to consider
     * @return {boolean} Whether or not we have a more specific member
     */
    SpecificBoundary.prototype.hasMoreSpecificThan = function(hypo) {
      var ix;
      for(ix = this.hypotheses.length; ix--;) {
        if(this.hypotheses[ix].isMoreSpecificThan(hypo)) {
          return true;
        }
      }
      return false;
    };

    exports = function() {
      return new SpecificBoundary();
    };

    return exports;
  });
