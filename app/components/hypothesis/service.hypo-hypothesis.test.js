
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

    it('should know when it is consistent with a given example', function() {
      // ...
    });

    it('should knwo when it is not consistent with a given example', function() {
      // ...
    });

    it('should generalize to accomodate an inconsistent, positive example', function() {
      // ...
    });

    it('should not generalize to accomodate a consistent, positive example', function() {
      // ...
    });

    it('should specialize to accomodate an inconsistent, negative example', function() {
      // ...
    });

    it('should not specialize to accomodate a consistent, negative example', function() {
      // ...
    });
  });

});
