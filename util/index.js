const { resolve } = require('path');
const { readFile, writeFile } = require('fs').promises;

const TMP_DIRECTORY = 'tmp';
const DOWNLOADED_WORKSPACES_PATH = resolve(
  __dirname,
  '..',
  TMP_DIRECTORY,
  'downloaded_workspaces.txt',
);

/**
 * @return {string[]}
 */
const getDownloadedWorkspaces = async () => {
  const data = await readFile(DOWNLOADED_WORKSPACES_PATH, 'utf8');
  return data.trim().split('\n');
};

/**
 * @param {string} workspace
 */
const saveDownloadedWorkspace = async workspace => {
  const workspaces = await getDownloadedWorkspaces();
  if (!workspaces.includes(workspace)) {
    workspaces.push(workspace);
    const data = workspaces.join('\n');
    await writeFile(DOWNLOADED_WORKSPACES_PATH, data);
  }
};

module.exports = {
  getDownloadedWorkspaces,
  saveDownloadedWorkspace,
};
