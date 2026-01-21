const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Visiting noir.great-site.net...');
    
    // 'commit' triggers the second the server responds.
    // We bump the timeout to 120 seconds to survive server "hiccups."
    await page.goto('https://noir.great-site.net', { 
      waitUntil: 'commit', 
      timeout: 120000 
    });

    // Wait 5 seconds to ensure the hit is registered in the server logs
    await page.waitForTimeout(5000); 
    
    console.log('✅ Visit attempt finished. Current URL:', page.url());
  } catch (error) {
    console.error('❌ Visit failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
