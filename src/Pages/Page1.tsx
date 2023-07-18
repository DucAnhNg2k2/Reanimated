import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 100;
const Page1 = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * SIZE) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5), Infinity, true);
    scale.value = withRepeat(withTiming(1.5), Infinity, true);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.view, reanimatedStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
  },
});

export default Page1;
