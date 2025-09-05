// We need to import the reporter to use it
import { SpecReporter } from 'jasmine-spec-reporter';

export default {
  spec_dir: 'spec',
  spec_files: ['**/*[sS]pec.ts'],
  helpers: ['helpers/**/*.?(m)js'],
  jsLoader: 'ts-node/esm',
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
  },
  reporter: new SpecReporter({
    spec: {
      displayStacktrace: 'raw',
    },
  }),
};