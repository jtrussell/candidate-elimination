
angular.module('hypo.hypothesis.service', [])
  .factory('hypoHypothesis', function() {
    'use strict';
    var exports;

    var Hypothesis = function Hypothesis(llX, llY, trX, trY) {
      this.lowerLeftX = llX;
      this.lowerLeftY = llY;
      this.topRightX = trX;
      this.topRightY = trY;
    };

    /**
     * Check whether the hypothesis is consistent with a given example
     *
     * @param {Example} ex The example
     * @return {boolean} Whether or not this hypothesis is consistent with `ex`
     */
    Hypothesis.prototype.isConsistentWith = function(ex) {
      return contains(this, ex) === ex.isPositive;
    };

    /**
     * Check whether this hypothesis is more general than `hypo`
     *
     * Returns `true` if more general than `hypo`. Note that a `false` return
     * value doesn't imply we're less general, the two hypotheses might not be
     * comparable.
     *
     * @param {Hypothesis} hypo The hypothesis to compare
     * @return {boolean} True if we're more general than `hypo`
     */
    Hypothesis.prototype.isMoreGeneralThan = function(hypo) {
      return this.lowerLeftX <= hypo.lowerLeftX &&
        this.lowerLeftY <= hypo.lowerLeftY &&
        this.topRightX >= hypo.topRightX &&
        this.topRightY >= hypo.topRightY;
    };

    /**
     * Check whether this hypothesis is more specific than `hypo`
     *
     * Returns `true` if more general than `hypo`. Note that a `false` return
     * value doesn't imply we're less general, the two hypotheses might not be
     * comparable.
     *
     * @param {Hypothesis} hypo The hypothesis to compare
     * @return {boolean} True if we're more general than `hypo`
     */
    Hypothesis.prototype.isMoreSpecificThan = function(hypo) {
      return this.lowerLeftX >= hypo.lowerLeftX &&
        this.lowerLeftY >= hypo.lowerLeftY &&
        this.topRightX <= hypo.topRightX &&
        this.topRightY <= hypo.topRightY;
    };

    /**
     * Factory for hypotheses
     *
     * @param {integer} blX X-value of bottom left corner
     * @param {integer} blY Y-value of bottom left corner
     * @param {integer} trX X-value of top right corner
     * @param {integer} trY Y-value of top right corner
     */
    exports = function(llX, llY, trX, trY) {
      return new Hypothesis(llX, llY, trX, trY);
    };

    /**
     * Get the minimal specializations of `hypo` to accomodate `ex` if any
     *
     * Will only specialize for negative examples inconsistent with this
     * hypothesis.
     *
     * @param {Hypothesis} hypo The hypothesis
     * @param {Example} ex The example
     * @return {Array<Hypothesis>} The array of specialized hypotheses
     */
    exports.specializeFor = function(hypo, ex) {
      if(ex.isPositive || !contains(hypo, ex)) {
        return [clone(hypo)];
      }

      // Ex is negative and in a range that this hypothesis claims as positive.
      // We can make up to four new minimal specializations of this
      // hypothesis...
      var specializations = [];
      
      // Northern specialization...
      // When the example is not on the northern border of the hypothesis
      if(hypo.topRightY !== ex.y) {
        specializations.push(exports(
          hypo.lowerLeftX,
          ex.y + 1,
          hypo.topRightX,
          hypo.topRightY
        ));
      }

      // Eastern specialization...
      if(hypo.topRightX !== ex.x) {
        specializations.push(exports(
          ex.x + 1,
          hypo.lowerLeftY,
          hypo.topRightX,
          hypo.topRightY
        ));
      }

      // Southern specialization...
      if(hypo.lowerLeftY !== ex.y) {
        specializations.push(exports(
          hypo.lowerLeftX,
          hypo.lowerLeftY,
          hypo.topRightX,
          ex.y - 1
        ));
      }

      // Western specialization...
      if(hypo.lowerLeftY !== ex.y) {
        specializations.push(exports(
          hypo.lowerLeftX,
          hypo.lowerLeftY,
          ex.x - 1,
          hypo.topRightY
        ));
      }

      return specializations;
    };

    /**
     * Get the minimal generalizations of `hypo` to accomodate `ex` if any
     *
     * Will only generalize for positive examples.
     *
     * @param {Hypothesis} hypo The hypothesis
     * @param {Example} ex The example
     * @return {Array<Hypothesis>} The array of generalized hypotheses
     */
    exports.generalizeFor = function(hypo, ex) {
      return ex.isPositive ? [exports(
        Math.min(hypo.lowerLeftX, ex.x),
        Math.min(hypo.lowerLeftY, ex.y),
        Math.max(hypo.topRightX, ex.x),
        Math.max(hypo.topRightY, ex.y)
      )] : [clone(hypo)];
    };

    // Does the given hypothesis contain the example (does not check for
    // consistency).
    var contains = function(hypo, ex) {
      return hypo.lowerLeftX <= ex.x && ex.x <= hypo.topRightX &&
        hypo.lowerLeftY <= ex.y && ex.y <= hypo.topRightY;
    };

    // Clone a hypothesis
    var clone = function(hypo) {
      return exports(
        hypo.lowerLeftX,
        hypo.lowerLeftY,
        hypo.topRightX,
        hypo.topRightY
      );
    };

    return exports;
  });
