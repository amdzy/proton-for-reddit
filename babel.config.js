module.exports = function babel(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['tsconfig-paths-module-resolver'],
      ['react-native-reanimated/plugin'],
    ],
  };
};
