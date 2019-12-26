const { By, until } = require('selenium-webdriver');
const { readdir } = require('fs').promises;
const { homedir } = require('os');
const { resolve } = require('path');

const { saveDownloadedWorkspace } = require('../util');

const DOWNLOAD_TO_MY_COMPUTER_LOCATOR = By.xpath(
  '//strong[text()="Download to my computer"]',
);
const NEXT_LOCATOR = By.xpath('//span[contains(text(), "Next")]');

const WORKSPACE_IMAGE_LOCATOR = By.xpath('//strong[text()="Workspace image"]');
const DOWNLOAD_LOCATOR = By.xpath('//button[text()="Download"]');

const DOWNLOADS_DIR = resolve(homedir(), 'Downloads');

class DownloadPage {
  /**
   * @param {ThenableWebDriver} driver
   */
  constructor(driver) {
    this.driver = driver;
  }

  /**
   * @param {string} workspaceName
   */
  async download(workspaceName) {
    const { driver } = this;
    await driver.get(
      `https://c9.io/${process.env.USERNAME}/${workspaceName}/migrate`,
    );

    let input;
    let button;

    await driver.sleep(1000);
    input = await driver.wait(
      until.elementLocated(DOWNLOAD_TO_MY_COMPUTER_LOCATOR),
    );
    await input.click();

    await driver.sleep(1000);
    button = await driver.wait(until.elementLocated(NEXT_LOCATOR));
    await button.click();

    await driver.sleep(1000);
    input = await driver.wait(until.elementLocated(WORKSPACE_IMAGE_LOCATOR));
    await input.click();

    await driver.sleep(1000);
    button = await driver.wait(until.elementLocated(DOWNLOAD_LOCATOR));
    await button.click();

    while (true) {
      const filenames = await readdir(DOWNLOADS_DIR);

      const hasDownloaded = filenames.find(file => {
        return new RegExp(
          `^${workspaceName}-\\d+\\.[0-9A-Z]+\\.full\\.tar$`,
        ).test(file);
      });

      if (hasDownloaded) {
        await saveDownloadedWorkspace(workspaceName);
        return;
      }

      await driver.sleep(50);
    }
  }
}

module.exports = DownloadPage;
