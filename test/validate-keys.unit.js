const assert = require('assert');
const { validateKeys } = require('../lib/schema');

describe('ahm-config: validate-keys', () => {
  it('should return errors when keys have special characters', () => {
    const data = { a: { '/test': true } };
    assert.deepEqual(validateKeys(data), [{
      field: 'a./test',
      message: 'Has special characters in it (/^[a-z0-9_-]+$/i are allowed)',
      value: 'a./test',
      type: 'string',
    }]);
  });
});
