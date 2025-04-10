const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const dataGenerator = require('../util/dataGenerator');

/**
 * Generate Data for the table.
 */
const generatedData = (rows) => {
  rows.forEach(item => {
    const data = dataGenerator.generateData(item);
    const filePath = path.join(__dirname, '../util', `${item}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
};
generatedData([10000, 100000, 500000, 1000000]);

/**
 * Absolute path to the results CSV file (inside the automation folder).
 */
const csvFilePath = path.join(__dirname, 'results.csv');
console.log(`CSV file path: ${csvFilePath}`);

/**
 * Initialize the CSV file with headers, including all useful metrics.
 */
try {
  // Delete the old file if it exists
  if (fs.existsSync(csvFilePath)) {
    fs.unlinkSync(csvFilePath);
    console.log('Old CSV file deleted.');
  }
  const csvHeaders = 'testIndex,testName,testLink,cycleCount,initialRendering,elapsedTime,avgFps1,avgFps2,frames,memoryUsage,jsHeapUsedSize,jsHeapTotalSize,domNodes,layoutCount,layoutDuration,recalcStyleCount,recalcStyleDuration,scriptDuration,taskDuration\n';
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
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Navigating to http://127.0.0.1:5500...');
    await page.goto('http://127.0.0.1:5500', { waitUntil: 'networkidle2' });

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

    for (let testIndex = 0; testIndex < testLinks.length; testIndex++) {
      const { href: testLink, name: testName } = testLinks[testIndex];
      console.log(`Running test ${testIndex + 1}: ${testName} (${testLink})`);

      const testPage = await browser.newPage();
      let testData = { testName, testLink };
      let cycleCount = 0;

      // Measure metrics before the test starts
      const metricsBefore = await testPage.metrics();
      console.log('Metrics before test:', metricsBefore);

      // Wait for the test to complete
      const waitForTestCompletion = Promise.race([
        new Promise((resolve) => {
          testPage.on('console', async (msg) => {
            const text = msg.text();
            console.log('Console message:', text);

            const match = text.match(/^Average results for (\d+) measuring\(s\)$/);
            if (match) {
              cycleCount = parseInt(match[1], 10);

              testPage.on('console', async (nextMsg) => {
                const nextText = nextMsg.text();
                console.log('Next console message:', nextText);

                if (nextText.includes('JSHandle@object')) {
                  const metrics = await extractMetricsFromObject(nextMsg);
                  if (metrics) {
                    console.log(`Metrics from FPS for test "${testName}" (averaged over ${cycleCount} cycles):`, metrics);
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
        new Promise((_, reject) => setTimeout(() => reject(new Error('Test timeout (120 seconds)')), 120000)),
      ]);

      console.log('Waiting for test to complete...');
      try {
        await testPage.goto(testLink, { waitUntil: 'networkidle2' });
        await waitForTestCompletion;
      } catch (error) {
        console.error(`Error waiting for test "${testName}":`, error);
      }

      // Measure metrics after the test
      const metricsAfter = await testPage.metrics();
      console.log('Metrics after test:', metricsAfter);

      // Calculate the difference for all relevant metrics
      testData.jsHeapUsedSize = (metricsAfter.JSHeapUsedSize - metricsBefore.JSHeapUsedSize) / 1024 / 1024; // MB
      testData.jsHeapTotalSize = (metricsAfter.JSHeapTotalSize - metricsBefore.JSHeapTotalSize) / 1024 / 1024; // MB
      testData.domNodes = metricsAfter.Nodes; // Absolute value after the test
      testData.layoutCount = metricsAfter.LayoutCount - metricsBefore.LayoutCount;
      testData.layoutDuration = metricsAfter.LayoutDuration - metricsBefore.LayoutDuration; // Seconds
      testData.recalcStyleCount = metricsAfter.RecalcStyleCount - metricsBefore.RecalcStyleCount;
      testData.recalcStyleDuration = metricsAfter.RecalcStyleDuration - metricsBefore.RecalcStyleDuration; // Seconds
      testData.scriptDuration = metricsAfter.ScriptDuration - metricsBefore.ScriptDuration; // Seconds
      testData.taskDuration = metricsAfter.TaskDuration - metricsBefore.TaskDuration; // Seconds

      console.log('Final test data before CSV:', testData);

      console.log(`Test "${testName}" completed, closing page...`);
      await testPage.close();
      console.log(`Page for test "${testName}" closed.`);

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
      if ('Elapsed time (ms)' in arg) {
        metrics.elapsedTime = parseFloat(arg['Elapsed time (ms)']);
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
      if ('Memory Usage (MB)' in arg) {
        metrics.memoryUsage = arg['Memory Usage (MB)'] === 'N/A' ? 'N/A' : parseFloat(arg['Memory Usage (MB)']);
      }
    }
  }

  return Object.keys(metrics).length > 0 ? metrics : null;
}

/**
 * Appends test results to the CSV file, including all metrics.
 * @param {Object} data - The test data to append.
 */
function appendToCsv(data) {
  try {
    const round = (value) => (typeof value === 'number' ? Number(value.toFixed(2)) : value || '');
    const csvRow = `${data.testIndex},${data.testName || ''},${data.testLink || ''},${data.cycleCount || ''},${round(data.initialRendering)},${round(data.elapsedTime)},${round(data.avgFps1)},${round(data.avgFps2)},${round(data.frames)},${round(data.memoryUsage)},${round(data.jsHeapUsedSize)},${round(data.jsHeapTotalSize)},${round(data.domNodes)},${round(data.layoutCount)},${round(data.layoutDuration)},${round(data.recalcStyleCount)},${round(data.recalcStyleDuration)},${round(data.scriptDuration)},${round(data.taskDuration)}\n`;
    fs.appendFileSync(csvFilePath, csvRow);
    console.log(`Results for test "${data.testName}" appended to ${csvFilePath}`);
  } catch (error) {
    console.error(`Error appending results for test "${data.testName}" to CSV:`, error);
  }
}