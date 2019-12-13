const { Key, until } = require('selenium-webdriver');

class LoginPage {
  BASE_URL = 'https://c9.io/';
  LOGIN_URL = this.BASE_URL + 'login';
  WORKSPACES_URL = this.BASE_URL + process.env.USERNAME;

  USERNAME_INPUT_LOCATOR = { id: 'id-username' };
  PASSWORD_INPUT_LOCATOR = { id: 'id-password' };

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
    await password.sendKeys(process.env.PASSWORD, Key.ENTER);

    await this.driver.wait(until.urlIs(this.WORKSPACES_URL));
  }
}

module.exports = LoginPage;
