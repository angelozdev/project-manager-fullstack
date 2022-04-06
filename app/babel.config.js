module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@screens": "./src/screens",
            "@features": "./src/features",
            "@constants": "./src/constants",
          },
        },
      ],
    ],
  };
};
