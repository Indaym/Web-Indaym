describe('1st test',  function() {
  it('should be true', function() {
    expect(true).toBe(true);
  });
});

describe('2st test',  () => {
  it('should be false', () => {
    expect(true).not.toBe(false);
  });
});
