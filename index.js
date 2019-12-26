require('dotenv').config();
require('chromedriver');

const { Builder } = require('selenium-webdriver');

const LoginPage = require('./pages/login');
const WorkspacesPage = require('./pages/workspaces');
const DownloadPage = require('./pages/download');

(async function() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();

    const login = new LoginPage(driver);
    await login.login();

    const workspaces = new WorkspacesPage(driver);
    await workspaces.prepareToDownload();

    const download = new DownloadPage(driver);
    let workspaceName;

    do {
      await workspaces.goToWorkspaces();
      driver.sleep(1000);
      workspaceName = await workspaces.getWorkspaceToDownload();

      if (workspaceName) {
        await download.download(workspaceName);
      }
    } while (workspaceName);
  } catch (err) {
    throw err;
  } finally {
    await driver.quit();
  }
})();
