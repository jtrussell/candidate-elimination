
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
      return true;
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
      return true;
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
      return true;
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
     * @param {Hypothesis} hypo The hypothesis
     * @param {Example} ex The example
     * @return {Array<Hypothesis>} The array of specialized hypotheses
     */
    exports.specializeFor = function(hypo, ex) {
      return [];
    };

    /**
     * Get the minimal generalizations of `hypo` to accomodate `ex` if any
     *
     * @param {Hypothesis} hypo The hypothesis
     * @param {Example} ex The example
     * @return {Array<Hypothesis>} The array of generalized hypotheses
     */
    exports.generalizeFor = function(hypo, ex) {
      return [];
    };

    return exports;
  });
