
describe('Constant: uni.UNI_MAX', function() {
  'use strict';

  var max;

  beforeEach(module('uni.max.constant'));

  beforeEach(inject(function(UNI_MAX) {
    max = UNI_MAX;
  }));

  it('should be a number', function() {
    expect(max).toEqual(jasmine.any(Number));
  });
});
