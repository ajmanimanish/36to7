const { chromium } = require('playwright');

async function debug() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  console.log('--- Debugging /framework/36-guna ---');
  await page.goto('http://127.0.0.1:3005/framework/36-guna', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1000);
  
  const text = await page.textContent('body');
  console.log('36 Guna Body text length:', text.length);
  console.log('36 Guna Body text snippet:', text.substring(0, 400));

  const kootaHeaders = await page.$$eval('h2', els => els.map(e => e.textContent));
  console.log('Found Koota H2 headers:', kootaHeaders);

  await browser.close();
}

debug().catch(console.error);
