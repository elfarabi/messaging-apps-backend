module.exports = {
  verbose: true,
  testMatch: [
    "**/test/**/*.[jt]s?(x)",
    "**/src/**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  reporters: ["default", "jest-junit"],
  coverageReporters: ["json", "lcov", "text", "clover", "text", "cobertura"],
  collectCoverageFrom: ["src/**/*.js", "src/*.js"]
};
