
describe('Service: hypo.hypoHypothesis', function() {

  var hypoHypothesis;

  beforeEach(module('hypo.hypothesis.service'));

  beforeEach(inject(function(_hypoHypothesis_) {
    hypoHypothesis = _hypoHypothesis_;
  });

  it('should be a factory for Hypothesis intances', function() {
    // ...
  });

  describe('Hypothesis', function() {
    
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
