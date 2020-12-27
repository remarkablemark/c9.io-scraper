# c9.io scraper

[c9.io](https://c9.io/login) scraper built with [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) ([Selenium](https://www.seleniumhq.org/) for [Node.js](https://nodejs.org/)).

Initial code is from [`webdriverjs-recipes`](https://github.com/remarkablemark/webdriverjs-recipes).

## Prerequisites

- [Node.js 12+](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm)

## Install

Clone repository:

```sh
$ git clone https://github.com/remarkablegames/c9.io-scraper.git
$ cd c9.io-scraper
```

If you're using [nvm](https://github.com/nvm-sh/nvm), you can set your node version:

```sh
$ nvm use
```

Install dependencies:

```sh
$ npm install
```

## Scripts

In the project directory, you can run:

### `npm start`

The script logs into your [c9.io](https://c9.io/login) account, prepares all workspaces for download, and then downloads them.

**Note**: before running the script, make sure to fill out the `.env` file. See example:

```sh
USERNAME=example # required
PASSWORD=secret # required
DOWNLOADS_DIR=/Users/user/Downloads/ # optional
```

If `DOWNLOADS_DIR` is not set, then it falls back to `$HOME/Downloads/`.

Downloaded workspaces are recorded in `tmp/downloaded_workspaces.txt`.

## License

[MIT](LICENSE)
