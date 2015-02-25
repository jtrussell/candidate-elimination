
describe('Service: hypo.hypoHypothesis', function() {
  'use strict';

  var hypoHypothesis;

  beforeEach(module('hypo.hypothesis.service'));

  beforeEach(inject(function(_hypoHypothesis_) {
    hypoHypothesis = _hypoHypothesis_;
  }));

  var h;
  beforeEach(function() {
    h = hypoHypothesis(1,2,3,4);
  });

  it('should be a factory for Hypothesis intances', function() {
    expect(h.constructor.name).toBe('Hypothesis');
  });

  describe('Hypothesis', function() {
    var h1, h2, h3;

    beforeEach(function() {
      h1 = hypoHypothesis(1,1,4,4);
      h2 = hypoHypothesis(1,1,3,3);
      h3 = hypoHypothesis(3,3,5,5);
    });

    it('should have a lower left x value', function() {
      expect(h.lowerLeftX).toBe(1);
    });

    it('should have a lower left y value', function() {
      expect(h.lowerLeftY).toBe(2);
    });

    it('should have a top right x value', function() {
      expect(h.topRightX).toBe(3);
    });

    it('should have a top right y value', function() {
      expect(h.topRightY).toBe(4);
    });
    
    it('should know when it is more generic than another hypothesis', function() {
      expect(h1.isMoreGeneralThan(h2)).toBe(true);
    });

    it('should not claim to be more generic than a more specific hypothesis', function() {
      expect(h2.isMoreGeneralThan(h1)).toBe(false);
    });

    it('should not claim to be more generic than a non-comparable hypothesis', function() {
      expect(h1.isMoreGeneralThan(h3)).toBe(false);
    });

    it('should know when it is more specific than another hypothesis', function() {
      expect(h2.isMoreSpecificThan(h1)).toBe(true);
    });

    it('should not claim to be more specific than a more general hypothesis', function() {
      expect(h1.isMoreSpecificThan(h2)).toBe(false);
    });

    it('should not claim to be more specific than a non-comparable hypothesis', function() {
      expect(h3.isMoreSpecificThan(h1)).toBe(false);
    });

    it('should know when it is consistent with a positive example', function() {
      var ex = {x: 2, y: 2, isPositive: true};
      expect(h1.isConsistentWith(ex)).toBe(true);
    });

    it('should know when it is not consistent with a positive example', function() {
      var ex = {x: 5, y: 2, isPositive: true};
      expect(h1.isConsistentWith(ex)).toBe(false);
    });

    it('should know when it is consistent with a negative example', function() {
      var ex = {x: 5, y: 2, isPositive: false};
      expect(h1.isConsistentWith(ex)).toBe(true);
    });

    it('should know when it is not consistent with a negative exeample', function() {
      var ex = {x: 2, y: 2, isPositive: false};
      expect(h1.isConsistentWith(ex)).toBe(false);
    });

    it('should generalize to accomodate positive example', function() {
      var ex = {x: 5, y: 5, isPositive: true}
        , hypos = hypoHypothesis.generalizeFor(h1, ex);
      expect(hypos.length).toBe(1);
      expect(hypos[0].lowerLeftX).toBe(1);
      expect(hypos[0].lowerLeftY).toBe(1);
      expect(hypos[0].topRightX).toBe(5);
      expect(hypos[0].topRightY).toBe(5);
    });

    it('should do nothing to accomodate a consistent, positive example', function() {
      var ex = {x: 3, y: 3, isPositive: true}
        , hypos = hypoHypothesis.generalizeFor(h1, ex);
      expect(hypos.length).toBe(1);
      expect(hypos[0].lowerLeftX).toBe(1);
      expect(hypos[0].lowerLeftY).toBe(1);
      expect(hypos[0].topRightX).toBe(4);
      expect(hypos[0].topRightY).toBe(4);
    });

    it('should generalize an empty hypothesis to an example itself', function() {
      var hEmpty = hypoHypothesis(5,5,1,1);
      var ex = {x: 3, y: 3, isPositive: true}
        , hypos = hypoHypothesis.generalizeFor(hEmpty, ex);
      expect(hypos.length).toBe(1);
      expect(hypos[0].lowerLeftX).toBe(3);
      expect(hypos[0].lowerLeftY).toBe(3);
      expect(hypos[0].topRightX).toBe(3);
      expect(hypos[0].topRightY).toBe(3);
    });

    it('should specialize to accomodate an inconsistent, negative example', function() {
      var ex = {x: 3, y: 3, isPositive: false}
        , hypos = hypoHypothesis.specializeFor(h1, ex);
      expect(hypos.length).toBe(4);

      // We don't care about order... create a pool of expected results, i.e.:
      // [ llX, llY, trX, trY ]
      // Note that we allow for rectangles of width 0
      var expectedCoords = [
        '1,1,2,4',
        '1,1,4,2',
        '4,1,4,4',
        '1,4,4,4'
      ];

      var actualCoords = hypos.map(function(h) {
        return [
          h.lowerLeftX,
          h.lowerLeftY,
          h.topRightX,
          h.topRightY
        ].join(',')
      });

      actualCoords.forEach(function(c) {
        expect(expectedCoords.indexOf(c)).not.toBe(-1);
      });
    });

    it('should not specialize to accomodate a consistent, negative example', function() {
      var ex = {x: 5, y: 5, isPositive: false}
        , hypos = hypoHypothesis.specializeFor(h1, ex);
      expect(hypos.length).toBe(1);
      expect(hypos[0].lowerLeftX).toBe(1);
      expect(hypos[0].lowerLeftY).toBe(1);
      expect(hypos[0].topRightX).toBe(4);
      expect(hypos[0].topRightY).toBe(4);
    });
  });

});
