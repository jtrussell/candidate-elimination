
angular.module('ce.main.controller', ['ex'])
  .controller('CEMainCtrl', function($location, generalBoundary, specificBoundary, seedExamples, exExample) {
    'use strict';
    var self = this;

    /**
     * @todo Make an "example-edit" directive, move a bunch of this there, don't
     * inejct exExample here.
     */

    var examples = [];

    var ex = {
      x: null,
      y: null,
      isPositive: false
    };

    var exIsValid = function() {
      return /^\d+$/.test(ex.x) && /^\d+$/.test(ex.y);
    };

    var observe = function(example) {
      examples.push(example);
      if(ex.isPositive) {
        generalBoundary.observe(example, specificBoundary);
        specificBoundary.observe(example, generalBoundary);
      } else {
        specificBoundary.observe(example, generalBoundary);
        generalBoundary.observe(example, specificBoundary);
      }

      // var search = [];
      // angular.forEach(examples, function(e) {
      //   search.push(e.x + ',' + e.y + ',' + (e.isPositive ? 'p' : 'n'));
      // });
      // $location.search(search.join(';'));
    };

    var observeAndReset = function() {
      if(!exIsValid()) { return; }

      observe(exExample(
        parseInt(ex.x, 10),
        parseInt(ex.y, 10),
        ex.isPositive
      ));

      // Clean the working example
      ex.x = null;
      ex.y = null;
      ex.isPositive = false;
    };

    var getGeneralHypotheses = function() {
      return generalBoundary.hypotheses;
    };

    var getSpecificHypotheses = function() {
      return specificBoundary.hypotheses;
    };

    angular.forEach(seedExamples, observe);

    angular.extend(self, {
      example: ex,
      observedExamples: examples,
      exampleIsValid: exIsValid,
      observeAndReset: observeAndReset,
      getGeneralHypotheses: getGeneralHypotheses,
      getSpecificHypotheses: getSpecificHypotheses
    });
  });
