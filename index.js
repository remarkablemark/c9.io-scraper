require('dotenv').config();
require('chromedriver');

const { Builder } = require('selenium-webdriver');

const LoginPage = require('./pages/login');
const WorkspacesPage = require('./pages/workspaces');

(async function() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    const login = new LoginPage(driver);
    await login.login();

    const workspaces = new WorkspacesPage(driver);
    await workspaces.prepareToDownload();
  } catch (err) {
    console.error(err);
  } finally {
    await driver.quit();
  }
})();
