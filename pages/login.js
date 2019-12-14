const { until } = require('selenium-webdriver');

class LoginPage {
  BASE_URL = 'https://c9.io/';
  LOGIN_URL = this.BASE_URL + 'login';

  USERNAME_INPUT_LOCATOR = { id: 'id-username' };
  PASSWORD_INPUT_LOCATOR = { id: 'id-password' };
  SUBMIT_BUTTON_LOCATOR = { css: 'button[type="submit"]' };

  /**
   * @param {ThenableWebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  async login() {
    await this.driver.get(this.LOGIN_URL);

    const currentUrl = await this.driver.getCurrentUrl();
    if (currentUrl !== this.LOGIN_URL) {
      return;
    }

    const username = await this.driver.findElement(this.USERNAME_INPUT_LOCATOR);
    await username.sendKeys(process.env.USERNAME);

    const password = await this.driver.findElement(this.PASSWORD_INPUT_LOCATOR);
    await password.sendKeys(process.env.PASSWORD);

    const submit = await this.driver.findElement(this.SUBMIT_BUTTON_LOCATOR);
    await submit.click();

    await this.driver.wait(until.titleIs(process.env.USERNAME));
  }
}

module.exports = LoginPage;
