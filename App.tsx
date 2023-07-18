/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import Page1 from './src/Pages/Page1';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Page1 />
    </SafeAreaView>
  );
}

export default App;
