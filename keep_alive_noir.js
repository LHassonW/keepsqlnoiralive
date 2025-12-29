const { chromium } = require('playwright');

(async () => {
  // We use a real-looking browser identity to bypass basic bot filters
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Visiting noir.great-site.net to reset inactivity timer...');
    
    // Goes to the site and waits until the network is quiet
    await page.goto('https://noir.great-site.net', { 
      waitUntil: 'networkidle',
      timeout: 60000 
    });

    // This helps ensure the visit is registered by InfinityFree's analytics
    await page.waitForTimeout(5000); 
    
    console.log('✅ Visit confirmed. Page title:', await page.title());
  } catch (error) {
    console.error('❌ Visit failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
