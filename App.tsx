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

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      {/* <TransformComponent /> */}
      {/* <HoldingComponent /> */}
      {/* <RotateComponent /> */}
      {/* <DoubleTabComponent /> */}
      <MoveComponent />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
