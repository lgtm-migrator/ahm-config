const assert = require('assert');

describe('ahm-config', () => {
  process.env.NODE_ENV = 'staging';
  process.env.NODE_CONFIG_DIR = `${__dirname}/data`;
  process.env.NODE_CONFIG_FILE = `${__dirname}/data/config.override.json`;
  process.env.e = 55555;

  it('should proper config', () => {
    const config = require('../').load();
    assert.equal(config.get('a'), 1, 'Value should be taken from default config');
    assert.equal(config.get('b'), 22, 'Value should be taken from staging config');
    assert.equal(config.get('c'), 333, 'Value should be taken from custom config');
    assert.equal(config.get('d'), 4444, 'Value should be taken from .env file');
    assert.equal(config.get('e'), 55555, 'Value should be taken from env variables');
  });

  it('should not require call to `load` once it is done', () => {
    const config = require('../');
    assert.equal(config.get('a'), 1);
  });
});
