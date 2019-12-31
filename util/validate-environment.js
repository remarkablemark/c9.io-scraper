const { accessSync } = require('fs');
const { homedir } = require('os');
const { resolve } = require('path');
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

  if (!process.env.USERNAME) {
    console.log('Error: Missing environment variable `USERNAME`');
    process.exit();
  } else {
    console.log(`USERNAME: ${process.env.USERNAME}`);
  }

  if (!process.env.PASSWORD) {
    console.error('Error: Missing environment variable `PASSWORD`');
    process.exit();
  } else {
    console.log(`PASSWORD: ${'*'.repeat(process.env.PASSWORD.length)}`);
  }

  if (!process.env.DOWNLOADS_DIR) {
    process.env.DOWNLOADS_DIR = resolve(homedir(), 'Downloads');
  }
  accessSync(process.env.DOWNLOADS_DIR);
  console.log(`DOWNLOADS_DIR: ${process.env.DOWNLOADS_DIR}`);
};

module.exports = validateEnvironment;
