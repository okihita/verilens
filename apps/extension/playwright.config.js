// @ts-check
const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/e2e.spec.js',
  timeout: 30000,
  use: {
    headless: false, // Extensions must run in headed mode in Chromium
    viewport: { width: 1280, height: 800 }
  }
});
