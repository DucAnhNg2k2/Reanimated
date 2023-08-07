/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TransformComponent from './src/TransformComponent';
import HoldingComponent from './src/HoldingComponent';
import RotateComponent from './src/RotateComponent';
import DoubleTabComponent from './src/DoubleTabComponent';
import MoveComponent from './src/MoveComponent';
import ScrollViewPage from './src/ScrollView';
import Page07_InputRange from './src/Page07_Slider';
import Feature1_HoldingComponentInScrollView from './src/Feature/Feature1_HoldingComponentInScrollView/Feature1_HoldingComponentInScrollView';

const App = () => {
  const option = 1;
  return (
    <GestureHandlerRootView style={styles.container}>
      {chooseComponent(option)}
    </GestureHandlerRootView>
  );
};

const chooseComponent = (option: number) => {
  if (option === 1) {
    return <Feature1_HoldingComponentInScrollView />;
  }
  if (option === 2) {
    return <HoldingComponent />;
  }
  if (option === 3) {
    return <RotateComponent />;
  }
  if (option === 4) {
    return <DoubleTabComponent />;
  }
  if (option === 5) {
    return <MoveComponent />;
  }
  if (option === 6) {
    return <ScrollViewPage />;
  }
  if (option === 7) {
    return <Page07_InputRange />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
