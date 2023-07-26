import React, {useCallback, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  createAnimatedPropAdapter,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 150;

const ImageReanimated = Animated.createAnimatedComponent(Image);
type typeDisplay = 'none' | 'flex';
const DoubleTabComponent = () => {
  const angle = useSharedValue(0);
  const scale = useSharedValue(1);
  const pos = useSharedValue(0);
  const opacity = useSharedValue(1);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      bottom: pos.value,
      opacity: opacity.value,
    };
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.5, {duration: 1000}), Infinity, true);
  }, []);

  const handleOnActiveDoubleTap = useCallback(() => {
    pos.value = withSequence(
      withTiming(0),
      withTiming(Dimensions.get('window').height / 2 - 25, {
        duration: 2000,
      }),
    );
    opacity.value = withSequence(
      withTiming(1),
      withDelay(2000, withTiming(0, {duration: 2000})),
    );
  }, []);
  return (
    <View style={styles.container}>
      <TapGestureHandler numberOfTaps={2} onActivated={handleOnActiveDoubleTap}>
        <Animated.View style={[styles.view]} />
      </TapGestureHandler>
      <ImageReanimated
        source={require('./Assets/heart.webp')}
        style={[styles.icon, reanimatedStyle]}
        resizeMode={'contain'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
    borderRadius: 20,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
  },
});

export default DoubleTabComponent;
