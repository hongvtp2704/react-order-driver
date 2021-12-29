module.exports = {
    plugins: [
      [
        [
          "module-resolver",
          {
            root: ["./src"],
            extensions: [
              ".ts",
              ".tsx",
              ".jsx",
              ".js",
              ".json",
            ],
            alias: {
              api: "./src/api",
              assets: "./src/assets/",
              components: "./src/components/",
              config: "./src/config/",
              contexts: "./src/contexts/",
              hooks: "./src/hooks/",
              middlewares: "./src/middlewares",
              models: "./src/models/",
              navigation: "./src/navigation/",
              res: "./src/res/",
              schemas: "./src/schemas",
              screens: "./src/screens/",
              store: "./src/store/",
              translations: "./src/translations/",
              utils: "./src/utils/",
            },
          },
        ],
      ],
    ],
  };