const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const artifactDir = '/Users/manish/.gemini/antigravity/brain/4f31b1ec-bd4a-43cf-aefe-efa434c4e18b';

async function capture() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2
  });

  const routes = [
    { url: 'http://127.0.0.1:3005/', file: 'home_preview.png' },
    { url: 'http://127.0.0.1:3005/framework/36-guna', file: 'guna_browser_preview.png' },
    { url: 'http://127.0.0.1:3005/sign-in', file: 'signin_preview.png' },
    { url: 'http://127.0.0.1:3005/sign-up', file: 'signup_preview.png' },
  ];

  for (const route of routes) {
    const page = await context.newPage();
    console.log(`Navigating to ${route.url}...`);
    await page.goto(route.url, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2000);
    const savePath = path.join(artifactDir, route.file);
    await page.screenshot({ path: savePath, fullPage: true });
    const size = fs.statSync(savePath).size;
    console.log(`Saved ${route.file}: ${(size / 1024).toFixed(1)} KB`);
    await page.close();
  }

  await browser.close();
  console.log('Screenshots successfully generated!');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
