/**
 * VeriLens Playwright End-to-End Test Suite
 * Tests extension loading, DOM scanning, hovercard triggers, and in-page sidebar.
 */

const { test, expect, chromium } = require('@playwright/test');
const path = require('path');

const pathToExtension = path.resolve(__dirname, '..');
const mockArticleUrl = `file://${path.resolve(__dirname, '../demo/mock_article.html')}`;
const scamGalleryUrl = `file://${path.resolve(__dirname, '../demo/scam_gallery.html')}`;

let browserContext;

test.beforeEach(async () => {
  // Launch Chromium with VeriLens extension loaded
  browserContext = await chromium.launchPersistentContext('', {
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
});

test.afterEach(async () => {
  if (browserContext) {
    await browserContext.close();
  }
});

test('E2E: Highlights sensational phrases on mock article and reveals hovercard', async () => {
  const page = await browserContext.newPage();
  await page.goto(mockArticleUrl);

  // Wait for initial idle scan
  await page.waitForTimeout(500);

  // 1. Verify highlight spans exist in DOM
  const highlights = page.locator('.verilens-flagged-text');
  const count = await highlights.count();
  expect(count).toBeGreaterThanOrEqual(3);

  // 2. Hover over the first highlighted phrase
  const firstHighlight = highlights.first();
  await firstHighlight.hover();

  // 3. Verify cognitive hovercard appears
  const hovercard = page.locator('#verilens-hovercard-portal');
  await expect(hovercard).toBeVisible();

  // 4. Verify hovercard contains pedagogical reflection
  const reflection = page.locator('#vl-card-prompt');
  await expect(reflection).not.toBeEmpty();
});

test('E2E: Opens in-page sidebar, displays DOM stats, and lists fallacies', async () => {
  const page = await browserContext.newPage();
  await page.goto(scamGalleryUrl);
  await page.waitForTimeout(500);

  // 1. Check that floating sidebar toggle button exists
  const toggleBtn = page.locator('#verilens-sidebar-toggle');
  await expect(toggleBtn).toBeVisible();

  // 2. Click the floating toggle button
  await toggleBtn.click();

  // 3. Verify sidebar panel slides open
  const sidebar = page.locator('#verilens-sidebar-panel');
  await expect(sidebar).toHaveClass(/vl-open/);

  // 4. Verify DOM Inspector metrics are rendered
  const wordStat = page.locator('#vl-sb-words');
  await expect(wordStat).toContainText('words');

  const flagStat = page.locator('#vl-sb-flags');
  await expect(flagStat).toContainText('flags');

  // 5. Verify flagged items list is populated
  const fallacyItems = page.locator('.vl-fallacy-item');
  const itemsCount = await fallacyItems.count();
  expect(itemsCount).toBeGreaterThanOrEqual(4);
});
