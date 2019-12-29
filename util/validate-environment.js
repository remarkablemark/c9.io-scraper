const semver = require('semver');

/**
 * @throws {Error}
 */
const validateEnvironment = () => {
  const { engines } = require('../package');

  if (!semver.satisfies(process.version, engines.node)) {
    console.log(
      `Error: Current node version ${process.versions.node} does not satisfy ${engines.node}`,
    );
    process.exit();
  } else {
    console.log(`Node version: ${process.version}`);
  }
};

module.exports = validateEnvironment;
