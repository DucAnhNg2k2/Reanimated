import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SIZE_SCREEN = Dimensions.get('window').width;
const SIZE_BOX = 250;
const ListBox = ['#32a852', '#a86232', '#5632a8', '#a83250'];

const ScrollViewPage = () => {
  const offSetX = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler(e => {
    offSetX.value = e.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      horizontal={true}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      {ListBox.map((item, index) => {
        return (
          <Component index={index} item={item} offSetX={offSetX} key={index} />
        );
      })}
    </Animated.ScrollView>
  );
};

interface ComponentProps {
  offSetX: Animated.SharedValue<number>;
  index: number;
  item: string;
}
const Component = ({offSetX, index, item}: ComponentProps) => {
  const styleAnimated = useAnimatedStyle(() => {
    const inputRange = [
      SIZE_SCREEN * (index - 1),
      SIZE_SCREEN * index,
      SIZE_SCREEN * (index + 1),
    ];
    const outputRange = [0, 1, 0];
    const scale = interpolate(
      offSetX.value,
      inputRange,
      outputRange,
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      offSetX.value,
      inputRange,
      [0, 250, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  return (
    <Animated.View key={index} style={[{backgroundColor: item}, style.screen]}>
      <Animated.View
        style={[style.box, {backgroundColor: item}, styleAnimated]}
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  screen: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    opacity: 0.1,
  },
  box: {
    width: SIZE_BOX,
    height: SIZE_BOX,
  },
});

export default ScrollViewPage;
