import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';

const Test = () => <App />;

AppRegistry.registerComponent(appName, () => Test);
