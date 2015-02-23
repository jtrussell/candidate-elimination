
describe('Service: bnd.general.service', function() {
  'use strict';
  
  var bndGeneral;

  beforeEach(module('bnd.general.service'));

  beforeEach(inject(function(_bndGeneral_) {
    bndGeneral = _bndGeneral_;
  }));

  it('should be a factory for General Boundary instances', function() {
    // ...
  });

  describe('General Boundary', function() {
    var g;

    beforeEach(function() {
      g = bndGeneral();
    });

    it('should have a set of hypotheses', function() {
      // ...
    });

    it('should have a list of observed examples', function() {
      // ...
    });

    it('should update when given a new positve hypothesis', function() {

    });

    it('should ignore a new negative hypothesis', function() {
      // ...
    });
  });
});

