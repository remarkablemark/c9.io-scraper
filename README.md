# c9.io scraper

Web scraper for archived [c9.io](https://c9.io/login) projects. Built with [WebDriverJS](https://github.com/SeleniumHQ/selenium/wiki/WebDriverJs) ([Selenium](https://www.selenium.dev/) for [Node.js](https://nodejs.org/)). Bootstrapped from [`webdriverjs-recipes`](https://github.com/remarkablemark/webdriverjs-recipes).

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

> Before running the script, fill out `.env`. See example:
>
> ```sh
> USERNAME=user123 # required
> PASSWORD=pass456 # required
> DOWNLOADS_DIR=/Users/user/Downloads/ # optional
> ```

If `DOWNLOADS_DIR` is not set, then it falls back to `$HOME/Downloads/`.

Downloaded workspaces are recorded in `tmp/downloaded_workspaces.txt`.

## License

[MIT](LICENSE)
