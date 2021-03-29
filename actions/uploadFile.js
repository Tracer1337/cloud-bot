const config = require("../config.json")

const DRIVE_URL = "https://cloud2go.tk/drive"

const UPLOAD_BUTTON_SELECTOR = "sidebar-action-buttons button"
const FILE_SELECTOR = "files-grid-item"

async function uploadFile(browser, filepath) {
    const page = await browser.newPage()
    await page.goto(DRIVE_URL)
    // Without the timeout the upload-button isn't clickable ¯\_(ツ)_/¯
    await page.waitForTimeout(config.uploadTimeout)

    const button = await page.$(UPLOAD_BUTTON_SELECTOR)

    const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        button.evaluate(e => e.click())
    ])

    await fileChooser.accept([filepath])
    await page.waitForSelector(FILE_SELECTOR)
}

module.exports = uploadFile
