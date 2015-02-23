
describe('Service: ex.exExample.service', function() {
  'use strict';
  
  var exExample;

  beforeEach(module('ex.example.service'));

  beforeEach(inject(function(_exExample_) {
    exExample = _exExample_;
  }));

  it('should be a factory for Example instances', function() {
    var ex = exExample(1,2,3,4,false);
    expect(ex.constructor.name).toBe('Example');
  });

});
