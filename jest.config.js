module.exports = {
  roots: ['src'],
  transform: { '\\.ts$': ['ts-jest'] },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,js}'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
};
