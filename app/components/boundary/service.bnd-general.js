
angular.module('bnd.general.service', ['uni', 'hypo'])
  .factory('bndGeneral', function(UNI_MIN, UNI_MAX, hypoHypothesis) {
    'use strict';
    var exports;

    /**
     * Constructor for a General Boundary
     */
    var GeneralBoundary = function GeneralBoundary() {
      // Seed with the most general hypothesis
      this.hypotheses = [hypoHypothesis(UNI_MIN, UNI_MIN, UNI_MAX, UNI_MAX)];
      this.rejections = [];
      this.examples = [];
    };

    /**
     * Observe a new example and update the boundary
     *
     * @param {Example} ex The example to obvserve
     * @param {SpecificBoundary} sbnd The example to obvserve
     */
    GeneralBoundary.prototype.observe = function(ex, sbnd) {
      var ix
        , h
        , specifications
        , accepted = []
        , rejected = [];

      // A list of rejections for this example
      this.rejections.push(rejected);
      this.examples.push(ex);

      for(ix = this.hypotheses.length; ix--;) {
        h = this.hypotheses[ix];
        if(!h.isConsistentWith(ex)) {
          this.hypotheses.splice(ix, 1);
          if(ex.isPositive) {
            // Remove any hypothesis inconsistent with ex
            rejected.push({
              hypothesis: h,
              byExample: ex,
              message: 'Not consistent with example'
            });
          } else {
            // Replace each hypothesis inconsistent with ex with it's minimal
            // specifications for which there are less general memebers of L.
            angular.forEach(hypoHypothesis.specializeFor(h, ex), function(s) {
              if(sbnd.hasMoreSpecificThan(s)) {
                accepted.push(s);
              } else {
                rejected.push({
                  hypothesis: s,
                  byExample: ex,
                  messsage: 'Added as specification by no less general member exists in the Specific Boundary'
                });
              }
            });
          }
        } else {
          // Hooray example is consistent, continue to accept this hypothesis
          accepted.push(h);
        }
      }

      // Replace our old list of hypotheses with those that are still valid
      // after observing this new example
      this.hypotheses.length = 0;
      Array.prototype.push.apply(this.hypotheses, accepted);
    };

    /**
     * Determine whether we have a more general member than the given hypothesis
     *
     * @param {Hypothesis} hypo The hypothesis to consider
     * @return {boolean} Whether or not we have a more general member
     */
    GeneralBoundary.prototype.hasMoreGeneralThan = function(hypo) {
      return true;
    };

    exports = function() {
      return new GeneralBoundary();
    };

    return exports;
  });
