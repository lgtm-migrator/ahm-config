const assert = require('assert');
const config = require('../lib');

describe('ahm-config: bad-schema', () => {
  const path = `${__dirname}/bad-schema`;

  it('should return schema errors when normalise disabled', (done) => {
    const onError = (err) => {
      assert.equal(err.message, 'Config error: /a Has wrong characters in it. Value \'/a\' should be string.');
      assert.deepEqual(err.meta, [{ field: '/a',
        message: 'Has wrong characters in it',
        value: '/a',
        type: 'string' },
      { field: '$x',
        message: 'Has wrong characters in it',
        value: '$x',
        type: 'string' }]);
      done();
    };
    config.make({ path, normalise: false, onError });
  });
});
