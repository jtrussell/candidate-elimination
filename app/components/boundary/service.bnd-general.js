
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
     * Steps to observe new examples:
     *
     * If the example is positive...
     *
     * - Remove any hypotheses inconsistent with the new example
     *
     * If the example is negative...
     *
     * - Replace each inconsistent hypothesis with its minimal specializations
     *   such that some member of of the specific boundary is more specific than
     *   that specification.
     * - Remove each hypothesis for which there exists a more general member in
     *   the general boundary
     *
     * @param {Example} ex The example to obverve
     * @param {SpecificBoundary} sbnd The corresponding specific boundary
     */
    GeneralBoundary.prototype.observe = function(ex, sbnd) {
      var ix
        , h
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
              messages: ['Not consistent with example']
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
                  messsages: ['Added as specification but no less general member exists in the Specific Boundary']
                });
              }
            });
          }
        } else {
          // Hooray example is consistent, continue to accept this hypothesis
          accepted.push(h);
        }
      }

      if(ex.isPositive) {
        var trashed, jx;
        for(ix = accepted.length; ix--;) {
          trashed = false;
          for(jx = accepted.length; jx--;) {
            if(!trashed && ix !== jx &&
               accpeted[jx].isMoreGeneralThan(accepted[ix])) {
              rejected.push({
                hypotheses: accepted.splice(ix, 1),
                byExample: ex,
                messages: ['Is less general than another hypothesis in G']
              });
              trashed = true;
            }
          }
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
      var ix;
      for(ix = this.hypotheses.length; ix--;) {
        if(this.hypotheses[ix].isMoreGeneralThan(hypo)) {
          return true;
        }
      }
      return false;
    };

    exports = function() {
      return new GeneralBoundary();
    };

    return exports;
  });
