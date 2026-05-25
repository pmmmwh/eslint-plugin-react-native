/* eslint-disable global-require */

'use strict';

const { globals } = require('eslint-plugin-react-native-globals').environments.all;
const pkg = require('./package.json');

const allRules = {
  'no-unused-styles': require('./lib/rules/no-unused-styles'),
  'no-inline-styles': require('./lib/rules/no-inline-styles'),
  'no-color-literals': require('./lib/rules/no-color-literals'),
  'sort-styles': require('./lib/rules/sort-styles'),
  'split-platform-components': require('./lib/rules/split-platform-components'),
  'no-raw-text': require('./lib/rules/no-raw-text'),
  'no-single-element-style-arrays': require('./lib/rules/no-single-element-style-arrays'),
};

function configureAsError(rules) {
  const result = {};
  Object.keys(rules).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(rules, key)) {
      return;
    }
    result['react-native/' + key] = 2;
  });
  return result;
}

const meta = {
  name: pkg.name,
  version: pkg.version,
};

const plugin = { meta, rules: allRules };

const allRulesConfig = configureAsError(allRules);

module.exports = {
  ...plugin,
  deprecatedRules: {},
  rulesConfig: {
    'no-unused-styles': 0,
    'no-inline-styles': 0,
    'no-color-literals': 0,
    'sort-styles': 0,
    'split-platform-components': 0,
    'no-raw-text': 0,
    'no-single-element-style-arrays': 0
  },
  environments: {
    // Kept for ESLint 8/9 legacy (.eslintrc) users; ignored by ESLint v10
    'react-native': {
      globals: globals,
    },
  },
  configs: {
    // Legacy format (ESLint 8/9 with .eslintrc)
    all: {
      plugins: [
        'react-native',
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: allRulesConfig,
    },
    // Flat config format (ESLint 9+ / 10+ with eslint.config.js)
    'flat/all': {
      plugins: {
        'react-native': plugin
      },
      languageOptions: {
        globals: globals,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: allRulesConfig,
    },
  },
};
