module.exports = {
  name: 'ConnectSphere',
  slug: 'connect-sphere',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  assetBundlePatterns: [
    '**/*'
  ],
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#ffffff'
    }
  },
  plugins: [
    'expo-router'
  ],
  scheme: 'connect-sphere',
  sdkVersion: '52.0.0',
  experiments: {
    tsconfigPaths: true
  }
}; 