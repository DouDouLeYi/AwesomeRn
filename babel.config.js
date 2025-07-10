module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathSuffix: './src/',
            rootPathPrefix: '@/',
          },
          {
            rootPathSuffix: './src/components/',
            rootPathPrefix: '@components',
          },
          {
            rootPathSuffix: './src/pages/',
            rootPathPrefix: '@pages',
          },
          {
            rootPathSuffix: './src/utils/',
            rootPathPrefix: '@utils',
          },
          {
            rootPathSuffix: './src/base/',
            rootPathPrefix: '@base',
          },
          {
            rootPathSuffix: './src/theme/',
            rootPathPrefix: '@theme',
          },
          {
            rootPathSuffix: './src/assets/',
            rootPathPrefix: '@assets',
          },
          {
            rootPathSuffix: './src/mock/',
            rootPathPrefix: '@mock',
          },
          {
            rootPathSuffix: './src/server/',
            rootPathPrefix: '@server',
          },
          {
            rootPathSuffix: './src/config/',
            rootPathPrefix: '@config',
          },
          {
            rootPathSuffix: './app/',
            rootPathPrefix: '#/',
          },
          {
            rootPathSuffix: './app/mock/',
            rootPathPrefix: '#mock',
          },
          {
            rootPathSuffix: './app/component/',
            rootPathPrefix: '#component',
          },
        ],
      },
    ],
  ],
};
