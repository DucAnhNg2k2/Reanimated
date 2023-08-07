import React from 'react';
import {StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const SIZE = 50;
type ContextType = {
  x: number;
  y: number;
};

interface BoxProps {
  index: number;
  item: string;
  offSetX: Animated.SharedValue<number>;
}

const BoxVirtual = ({index, item, offSetX}: BoxProps) => {
  const aPosX = useSharedValue(0);
  const aPosY = useSharedValue(0);
  const isActive = useSharedValue(false);

  const aGesture = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart(event, context) {
      context.x = aPosX.value;
      context.y = aPosY.value;
    },
    onActive(event, context) {
      aPosX.value = event.translationX + context.x;
      aPosY.value = event.translationY + context.y;
    },
    onEnd(event) {
      isActive.value = true;
    },
  });

  const styleAnimated = useAnimatedStyle(() => {
    // const is = isActive.value;
    // if (is) {
    //   return {
    //     position: 'absolute',
    //     top: -100,
    //     left: index * (SIZE + 15),
    //     transform: [{translateX: 0}, {translateY: 0}],
    //   };
    // } else {
    //   return {
    //     transform: [
    //       {
    //         translateX: aPosX.value - offSetX.value,
    //       },
    //       {translateY: aPosY.value},
    //     ],
    //   };
    // }
    return {
      transform: [
        {
          translateX: aPosX.value - offSetX.value,
        },
        {translateY: aPosY.value},
      ],
    };
  }, []);

  // [0, 50 + 15, 100 + 30, 150 + 45, ....] = (index) * (length + 15)
  const styles = StyleSheet.create({
    box: {
      width: SIZE,
      height: SIZE,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'red',
      backgroundColor: item,
      position: 'absolute',
      top: 0,
      left: index * (SIZE + 15),
    },
  });

  return (
    <PanGestureHandler onGestureEvent={aGesture}>
      <Animated.View style={[styles.box, styleAnimated]} />
    </PanGestureHandler>
  );
};

export default BoxVirtual;
