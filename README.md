# c9.io scraper

Web scraper for archived [c9.io](https://c9.io/login) projects. Built with [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) ([Selenium](https://www.selenium.dev/) for [Node.js](https://nodejs.org/)). Bootstrapped from [webdriverjs-recipes](https://github.com/remarkablemark/webdriverjs-recipes).

## Prerequisites

[Node.js](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm):

```sh
brew install node
```

[Chrome](https://www.google.com/chrome/) and [ChromeDriver](https://chromedriver.chromium.org/downloads):

```sh
brew cask install google-chrome
brew install chromedriver
```

## Install

Clone repository:

```sh
git clone https://github.com/remarkablemark/c9.io-scraper.git
cd c9.io-scraper
```

If you're using [nvm](https://github.com/nvm-sh/nvm), you can set the node version:

```sh
nvm use
```

Install dependencies:

```sh
npm install
```

## Environment Variables

Fill out `.env` before running the scraper:

```sh
USERNAME=user # required
PASSWORD=pass # required
DOWNLOADS_DIR=~/Downloads/ # optional
```

If `DOWNLOADS_DIR` isn't set, it defaults to `~/Downloads/`.

## Scripts

In the project directory, you can run:

### `npm start`

The script logs into your [c9.io](https://c9.io/login) account, prepares all workspaces for download, and then downloads them.

Downloaded workspaces are recorded in `tmp/downloaded_workspaces.txt`.

## License

[MIT](LICENSE)
