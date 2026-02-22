const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('file:///' + process.cwd().replace(/\\/g, '/') + '/allure-report/index.html');
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for the page to load
  await page.screenshot({ path: 'allure-report/total-count.png', fullPage: true });
  await browser.close();
})();
