module.exports = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  testMatch: [
    "**/test/**/*.[jt]s?(x)",
    "**/src/**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  reporters: ["default", "jest-junit"],
  coverageReporters: ["json", "lcov", "text", "clover", "text", "cobertura"],
  collectCoverageFrom: ["src/**/*.js", "src/*.js"]
};
