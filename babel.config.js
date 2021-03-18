module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          app: './src/app',
          features: './src/features',
          services: './src/services',
          components: './src/components',
          hooks: './src/hooks',
          utils: './src/utils',
        },
        cwd: 'babelrc',
      },
    ],
  ],
};
