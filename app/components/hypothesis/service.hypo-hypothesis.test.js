
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
    
    it('should know when another hypothesis is less generic', function() {
      // ...
    });

    it('should know when another hypothesis is more generic', function() {
      // ...
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
