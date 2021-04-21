module.exports = {
  displayName: 'frontend',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'vue', 'js', 'json'],
  coverageDirectory: '../../coverage/apps/frontend',
  snapshotSerializers: ['jest-serializer-vue'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
      babelConfig: '<rootDir>/babel.config.js',
    },
    'vue-jest': {
      tsConfig: `${__dirname}/tsconfig.spec.json`,
      babelConfig: `${__dirname}/babel.config.js`,
    },
  },
};
