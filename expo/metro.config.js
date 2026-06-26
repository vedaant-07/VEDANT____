const { getDefaultConfig } = require("expo/metro-config");

let config = getDefaultConfig(__dirname);

try {
  const { withRorkMetro } = require("@rork-ai/toolkit-sdk/metro");
  config = withRorkMetro(config);
} catch {
  // Local/Codemagic builds can run with the standard Expo Metro config.
}

module.exports = config;
