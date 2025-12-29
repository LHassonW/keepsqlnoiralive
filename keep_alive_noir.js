const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    console.log('🌐 Waking up noir.great-site.net...');
    // We land on the page to register a "hit" in InfinityFree's analytics
    await page.goto('https://noir.great-site.net', { waitUntil: 'networkidle' }); 
    
    // Optional: Take a screenshot so you can see it worked in GitHub Actions
    await page.screenshot({ path: 'noir_screenshot.png' });

    console.log('✅ Visit successful. InfinityFree inactivity timer reset.');
  } catch (error) {
    console.error('❌ Failed to reach noir:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
