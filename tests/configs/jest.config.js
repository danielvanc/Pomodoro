module.exports = {
  rootDir: '../../',
  testMatch: ['**/tests/unit/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/tests/configs/file-mock.js`,
  },
  testPathIgnorePatterns: [
    `node_modules`,
    `\\.cache`,
    `.cache`,
    `<rootDir>.*/public`,
    `tests/e2e/integrations`,
  ],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/tests/configs/loadershim.js`],
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/pages/**/*.{js,jsx}',
    '<rootDir>/src/components/**/*.{js,jsx}',
  ],
};
