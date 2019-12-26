const { By, until } = require('selenium-webdriver');
const { getDownloadedWorkspaces } = require('../util');

const WORKSPACES_URL = `https://c9.io/${process.env.USERNAME}`;
const MIGRATE_URL_REGEX = new RegExp(`/${process.env.USERNAME}/(.+)/migrate$`);

const PREPARE_TO_DOWNLOAD_BUTTON_LOCATOR = By.xpath(
  '//span[contains(text(), "Prepare to Download / Migrate")]',
);
const DOWNLOAD_LINK_LOCATOR = By.xpath('//a[text()="Download / Migrate"]');

const MODAL_LOCATOR = By.css('.modal');
const ARCHIVE_BUTTON_LOCATOR = By.xpath('//button[text()="Archive"]');

class WorkspacesPage {
  /**
   * @param {ThenableWebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  async goToWorkspaces() {
    await this.driver.get(WORKSPACES_URL);
  }

  async prepareToDownload() {
    const { driver } = this;

    const prepareToDownloadButtons = await driver.findElements(
      PREPARE_TO_DOWNLOAD_BUTTON_LOCATOR,
    );

    for (const prepareToDownloadButton of prepareToDownloadButtons) {
      await prepareToDownloadButton.click();
      await driver.wait(until.elementLocated(MODAL_LOCATOR));
      const archiveButton = await driver.wait(
        until.elementLocated(ARCHIVE_BUTTON_LOCATOR),
      );
      await archiveButton.click();
      await driver.wait(async () => {
        const elements = await driver.findElements(MODAL_LOCATOR);
        return elements.length === 0;
      });
    }
  }

  /**
   * @return {string}
   */
  async getWorkspaceToDownload() {
    const { driver } = this;

    const downloadLinks = await driver.findElements(DOWNLOAD_LINK_LOCATOR);

    for (let downloadLink of downloadLinks) {
      const href = await downloadLink.getAttribute('href');
      const match = href.match(MIGRATE_URL_REGEX);

      if (Array.isArray(match)) {
        const downloadedWorkspaces = await getDownloadedWorkspaces();
        const workspaceName = match[1];

        if (!downloadedWorkspaces.includes(workspaceName)) {
          return workspaceName;
        }
      }
    }
  }
}

module.exports = WorkspacesPage;
