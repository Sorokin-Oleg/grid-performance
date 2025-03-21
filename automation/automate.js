const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Absolute path to the results CSV file (inside the automation folder).
 */
const csvFilePath = path.join(__dirname, 'results.csv');
console.log(`CSV file path: ${csvFilePath}`);

/**
 * Initialize the CSV file with headers.
 */
try {
  const csvHeaders = 'testIndex,testName,testLink,cycleCount,initialRendering,elapsedTime,avgFps1,avgFps2,frames\n';
  fs.writeFileSync(csvFilePath, csvHeaders);
  console.log('CSV file successfully created with headers.');
} catch (error) {
  console.error('Error creating CSV file:', error);
}

/**
 * Main function to run the performance tests automation.
 */
(async () => {
  let browser;
  try {
    // Launch Puppeteer with a visible browser for debugging purposes.
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the main page containing test links.
    console.log('Navigating to http://127.0.0.1:5500...');
    await page.goto('http://127.0.0.1:5500', { waitUntil: 'networkidle2' });

    // Extract test links from the page (elements with class 'samples-link').
    console.log('Extracting test links...');
    const testLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a.samples-link')).map(link => ({
        href: link.href,
        name: link.textContent.trim(),
      }));
      console.log('Found links:', links);
      return links;
    });

    console.log('Found test links:', testLinks);

    if (testLinks.length === 0) {
      console.log('No test links found!');
      await browser.close();
      return;
    }

    // Iterate over each test link and run the performance test.
    for (let testIndex = 0; testIndex < testLinks.length; testIndex++) {
      const { href: testLink, name: testName } = testLinks[testIndex];
      console.log(`Running test ${testIndex + 1}: ${testName} (${testLink})`);

      const testPage = await browser.newPage();
      let testData = { testName, testLink };
      let cycleCount = 0;

      // Wait for the test to complete by listening for console messages.
      const waitForTestCompletion = Promise.race([
        new Promise((resolve) => {
          testPage.on('console', async (msg) => {
            const text = msg.text();
            console.log('Console message:', text);

            // Look for the message indicating test completion (e.g., "Average results for 3 measuring(s)").
            const match = text.match(/^Average results for (\d+) measuring\(s\)$/);
            if (match) {
              cycleCount = parseInt(match[1], 10);

              // The next console message should contain the metrics object.
              testPage.on('console', async (nextMsg) => {
                const nextText = nextMsg.text();
                console.log('Next console message:', nextText);

                if (nextText.includes('JSHandle@object')) {
                  const metrics = await extractMetricsFromObject(nextMsg);
                  if (metrics) {
                    console.log(`Metrics for test "${testName}" ${testLink} (averaged over ${cycleCount} cycles):`, metrics);
                    Object.assign(testData, metrics);
                    testData.cycleCount = cycleCount;
                  } else {
                    console.log('Failed to extract metrics from object.');
                  }
                  resolve();
                }
              });
            }
          });
        }),
        // Timeout after 120 seconds to prevent hanging.
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Test timeout (120 seconds)')), 120000);
        }),
      ]);

      // Navigate to the test page and wait for completion.
      console.log('Waiting for test to complete...');
      try {
        await testPage.goto(testLink, { waitUntil: 'networkidle2' });
        await waitForTestCompletion;
      } catch (error) {
        console.error(`Error waiting for test "${testName}":`, error);
      }

      console.log(`Test "${testName}" completed, closing page...`);
      await testPage.close();
      console.log(`Page for test "${testName}" closed.`);

      // Append test results to the CSV file.
      appendToCsv({ testIndex, ...testData });
    }

    await browser.close();
    console.log('Browser closed.');
  } catch (error) {
    console.error('An error occurred:', error);
    if (browser) await browser.close();
    process.exit(1);
  }
})();

/**
 * Extracts performance metrics from a console message object.
 * @param {Object} msg - The console message object containing metrics.
 * @returns {Object|null} - The extracted metrics or null if extraction fails.
 */
async function extractMetricsFromObject(msg) {
  const args = await Promise.all(msg.args().map(arg => arg.jsonValue()));
  console.log('Raw console object:', args);

  const metrics = {};
  for (const arg of args) {
    if (typeof arg === 'object' && arg !== null) {
      if ('Initial rendering (ms)' in arg) {
        metrics.initialRendering = parseFloat(arg['Initial rendering (ms)']);
      }
      if ('Elapsed time' in arg) {
        metrics.elapsedTime = parseFloat(arg['Elapsed time']);
      }
      if ('Average FPS 1' in arg) {
        metrics.avgFps1 = parseFloat(arg['Average FPS 1']);
      }
      if ('Average FPS 2' in arg) {
        metrics.avgFps2 = parseFloat(arg['Average FPS 2']);
      }
      if ('Frames' in arg) {
        metrics.frames = parseFloat(arg['Frames']);
      }
    }
  }

  return Object.keys(metrics).length > 0 ? metrics : null;
}

/**
 * Appends test results to the CSV file.
 * @param {Object} data - The test data to append.
 */
function appendToCsv(data) {
  try {
    // Round numerical values to 2 decimal places for readability.
    const round = (value) => (typeof value === 'number' ? Number(value.toFixed(2)) : value);
    const csvRow = `${data.testIndex},${data.testName || ''},${data.testLink || ''},${data.cycleCount || ''},${round(data.initialRendering) || ''},${round(data.elapsedTime) || ''},${round(data.avgFps1) || ''},${round(data.avgFps2) || ''},${round(data.frames) || ''}\n`;
    fs.appendFileSync(csvFilePath, csvRow);
    console.log(`Results for test "${data.testName}" appended to ${csvFilePath}`);
  } catch (error) {
    console.error(`Error appending results for test "${data.testName}" to CSV:`, error);
  }
}