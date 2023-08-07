import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const WIDTH_CONFIG = 300;
const Page07_InputRange = () => {
  const widthX = useSharedValue(0);
  const isActive = useSharedValue(false);
  const [time, setTime] = useState(0);
  const handleIncreaseTime = () => {
    'worklet';
    if (isActive.value === false) {
      widthX.value = withTiming(widthX.value + WIDTH_CONFIG / 100);
    }
  };
  const styleAnimated = useAnimatedStyle(() => {
    return {
      width: widthX.value,
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (time <= 100) {
        handleIncreaseTime();
        // setTime(time => time + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <Animated.View style={style.row}>
        <Animated.View style={[style.start, styleAnimated]} />
        <Animated.View style={[style.end]} />
      </Animated.View>
      <Text> {time}% </Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    width: 300,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
  },
  start: {
    backgroundColor: '#0AAE43',
    borderColor: 'red',
    height: '100%',
  },
  end: {
    backgroundColor: '#B8BDC8',
    flex: 1,
    height: '100%',
  },
});
export default Page07_InputRange;
