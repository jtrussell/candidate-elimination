
angular.module('bnd.specific.service', ['uni', 'hypo'])
  .factory('bndSpecific', function(UNI_MIN, UNI_MAX, hypoHypothesis) {
    'use strict';
    var exports;

    /**
     * Constructor for Specific Boundaries
     */
    var SpecificBoundary = function SpecificBoundary() {
      // Seed with a bogus hypothesis
      this.hypotheses = [hypoHypothesis(Infinity,Infinity,-Infinity,-Infinity)];
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
          if(!ex.isPositive) {
            // Remove any hypothesis inconsistent with ex
            rejected.push({
              hypothesis: h,
              byExample: ex,
              messages: ['Not consistent with example']
            });
          } else {
            // Replace each hypothesis inconsistent with ex with it's minimal
            // generalization for which there are mogre general memebers of G.
            angular.forEach(hypoHypothesis.generalizeFor(h, ex), function(s) {
              if(gbnd.hasMoreGeneralThan(s)) {
                accepted.push(s);
              } else {
                rejected.push({
                  hypothesis: s,
                  byExample: ex,
                  messsages: ['Added as generalization but no more general member exists in the General Boundary']
                });
              }
            });
          }
        } else {
          // Hooray example is consistent, continue to accept this hypothesis
          accepted.push(h);
        }
      }

      if(!ex.isPositive) {
        var trashed, jx;
        for(ix = accepted.length; ix--;) {
          trashed = false;
          for(jx = accepted.length; jx--;) {
            if(!trashed && ix !== jx &&
               accpeted[jx].isMoreSpecificThan(accepted[ix])) {
              rejected.push({
                hypotheses: accepted.splice(ix, 1),
                byExample: ex,
                messages: ['Is less specific than another hypothesis in L']
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
      return this.examples.length ? false : true;
    };

    exports = function() {
      return new SpecificBoundary();
    };

    return exports;
  });
