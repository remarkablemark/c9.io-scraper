const { By, until } = require('selenium-webdriver');

const BASE_URL = 'https://c9.io/';
const LOGIN_URL = BASE_URL + 'login';

const USERNAME_INPUT_LOCATOR = By.id('id-username');
const PASSWORD_INPUT_LOCATOR = By.id('id-password');
const SUBMIT_BUTTON_LOCATOR = By.css('button[type="submit"]');

class LoginPage {
  /**
   * @param {ThenableWebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  async login() {
    const { driver } = this;
    await driver.get(LOGIN_URL);

    const currentUrl = await driver.getCurrentUrl();
    if (currentUrl !== LOGIN_URL) {
      return;
    }

    const username = await driver.findElement(USERNAME_INPUT_LOCATOR);
    await username.sendKeys(process.env.USERNAME);

    const password = await driver.findElement(PASSWORD_INPUT_LOCATOR);
    await password.sendKeys(process.env.PASSWORD);

    const submit = await driver.findElement(SUBMIT_BUTTON_LOCATOR);
    await submit.click();

    await driver.wait(until.titleIs(process.env.USERNAME));
  }
}

module.exports = LoginPage;
