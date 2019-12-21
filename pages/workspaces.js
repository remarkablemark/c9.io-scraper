const { By, until } = require('selenium-webdriver');

const PREPARE_TO_DOWNLOAD_BUTTON_LOCATOR = By.xpath(
  '//span[contains(text(), "Prepare to Download / Migrate")]',
);
const ARCHIVE_BUTTON_LOCATOR = By.xpath('//button[text()="Archive"]');
const MODAL_LOCATOR = By.css('.modal');

class WorkspacesPage {
  /**
   * @param {ThenableWebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  async prepareToDownload() {
    const { driver } = this;

    const prepareToDownloadButtons = await driver.findElements(
      PREPARE_TO_DOWNLOAD_BUTTON_LOCATOR,
    );

    for (let prepareToDownloadButton of prepareToDownloadButtons) {
      await prepareToDownloadButton.click();
      const modal = await driver.wait(until.elementLocated(MODAL_LOCATOR));
      const archiveButton = await driver.wait(
        until.elementLocated(ARCHIVE_BUTTON_LOCATOR),
      );
      await archiveButton.click();
      await driver.wait(until.stalenessOf(modal));
    }
  }
}

module.exports = WorkspacesPage;
