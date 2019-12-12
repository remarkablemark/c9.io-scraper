require('dotenv').config();

const { Builder } = require('selenium-webdriver');

const LoginPage = require('./pages/login');

(async function() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    // login
    const login = new LoginPage(driver);
    await login.login();
  } catch (err) {
    console.error(err);
  } finally {
    await driver.quit();
  }
})();
