import React from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const SIZE = 50;
interface BoxProps {
  index: number;
  item: string;
}

const Box = ({index, item}: BoxProps) => {
  const styles = StyleSheet.create({
    box: {
      width: SIZE,
      height: SIZE,
      marginRight: 15,
      marginBottom: 10,
      borderRadius: 15,
      backgroundColor: item,
    },
  });

  return <Animated.View style={styles.box} />;
};

export default Box;
