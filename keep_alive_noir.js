const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Visiting noir.great-site.net to reset inactivity timer...');
    
    // CHANGE: Use 'domcontentloaded' instead of 'networkidle'
    // This triggers as soon as the HTML is ready, which is safer for InfinityFree
    await page.goto('https://noir.great-site.net', { 
      waitUntil: 'domcontentloaded', 
      timeout: 90000 // Increased to 90 seconds
    });

    // We keep this to make sure the server registers the hit
    await page.waitForTimeout(5000); 
    
    console.log('✅ Visit confirmed. Page title:', await page.title());
  } catch (error) {
    console.error('❌ Visit failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
