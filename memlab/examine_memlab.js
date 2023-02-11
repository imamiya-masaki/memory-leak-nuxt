const path = require('path')
function url() {
    return "http://localhost:3000/"
}

async function sleep(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

async function action(page) {
  const rootPath = path.join(__dirname, '..')
  const lightPath = path.join(rootPath, 'assets/medium.xlsx')
  await page.click('#open-modal') // モーダルを開く
  try {
    const inputFile = await page.$('#input-file')
    //@ts-ignore
    await inputFile?.uploadFile(lightPath)
  } catch (e) {
    console.log('e', e)
  }
  await page.click('#close')
}

async function back(page) {
  await page.click('#clear')
}

function leakFilter(node, _snapshot, _leakedNodeIds) {
  return node.retainedSize > 1000 * 1000;
}

module.exports = {url, action, back, leakFilter}