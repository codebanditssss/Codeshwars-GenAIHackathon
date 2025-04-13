// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Add more file extensions to be processed
config.resolver.sourceExts = [
  ...config.resolver.sourceExts, 
  'mjs', 
  'cjs'
];

// Add an extra watch folder for the App directory
config.watchFolders = [
  path.resolve(__dirname, '../')
];

// Ensure the project root includes parent directory
config.projectRoot = path.resolve(__dirname, '../');

module.exports = config; 