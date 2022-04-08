module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@apollo-client": "./src/apollo-client",
            "@constants": "./src/constants",
            "@features": "./src/features",
            "@features": "./src/features",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
