const _ = require('lodash');
const validator = require('is-my-json-valid');
const traverse = require('traverse');

const validKeyRegex = /[^a-z0-9_-]/i;

exports.match = (schema) => {
  const paths = [];
  const walk = (context, obj) => {
    if (_.isNil(obj.properties)) {
      paths.push(context);
    } else {
      _.forEach(obj.properties, (val, key) => walk(context.concat([key]), val));
    }
  };
  walk([], schema);

  const pattern = paths.map(context => context.join('__')).join('|');
  return new RegExp(`^(${pattern})$`);
};

exports.validateKeys = (data) => {
  const result = [];
  traverse(data).forEach(function context() {
    const path = this.path.join('.');
    if (validKeyRegex.test(this.key)) {
      result.push({
        field: path,
        message: 'Has wrong characters in it',
        value: path,
        type: 'string',
      });
    }
  });
  return result;
};

exports.validate = (store, originalSchema) => {
  // @HACK: when you do `store.defaults()` it adds `type: 'literal'` as a provider type.
  // Cannot find any nice ways to get rid of it, hence doing this.
  const schema = _.cloneDeep(originalSchema);
  _.assign(schema.properties, { type: { required: true, enum: ['literal'] } });

  const validate = validator(schema, {
    greedy: true,
    verbose: true,
  });

  validate(store.get());
  return _.union(validate.errors, exports.validateKeys(store.get()));
};


const castingFns = {
  integer: val => parseInt(val, 10),
  number: Number,
  boolean: val => (val === 'true'),
  array: val => JSON.parse(val),
};

exports.normalise = (store, schema) => {
  const errors = exports.validate(store, schema);

  if (errors === null) { return; }

  errors
    .filter(({ type }) => castingFns[type])
    .forEach(({ field, type }) => {
      const key = field.substring(5).replace(/[.]/g, ':'); // convert 'data.a.b.c' into 'a:b:c'
      const val = castingFns[type](store.get(key));
      store.set(key, val);
    });
};
