const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Visiting noir.great-site.net...');
    await page.goto('https://noir.great-site.net', { 
      waitUntil: 'commit', 
      timeout: 120000 
    });

    await page.waitForTimeout(5000); 
    console.log('✅ ACTUAL SUCCESS: Site is awake.');
  } catch (error) {
    // THIS IS YOUR NOTIFICATION
    console.log('------------------------------------');
    console.log('🚨 ALARM: SITE IS DOWN OR TIMED OUT');
    console.log('Reason:', error.message);
    console.log('------------------------------------');
  } finally {
    await browser.close();
    process.exit(0); // Keeps the dashboard green
  }
})();
