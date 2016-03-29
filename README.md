# ahm-config

Config management module. It uses [nconf](https://github.com/indexzero/nconf) under the bonnet to manage config files, environment variables and command line arguments as a single system. It is fully compatible with [dotenv](https://github.com/motdotla/dotenv). It aims to simplify system configuration and config management.


#### Load order

Configuration is loaded in the following order: 

1. Environment variables from `process.env`, with `__` as the hierarchical separator.
2. Values from `.env` file
3. Command line arguments, `process.argv`
4. Custom config, if path provided
5. Environment specific config file `config.<env>.json`
6. Default values from `config.default.json` config file


#### Configuration

 - `NODE_ENV` current environment name, e.g. `development` or `production`
 - `NODE_CONFIG_DIR` directory where to look for config files, project's base directory by default
 - `NODE_CONFIG_FILE` custom config file with overrides


#### Considerations

 - Use hierarchical configs where possible
 - Use json types where it makes sense, avoid type casting later on in your consumer code
 - Keep devops specific config values (like elasticache hostname) in ansible config
 - Keep sensitive values in ansible or consider config encryption - [nconf can do it](https://github.com/indexzero/nconf#encrypting-file-contents)


#### TODO
 - Consider to deprecate dotenv
 - Configure lib to retrieve all configs files from `config/` directory
