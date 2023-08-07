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
    onEnd(event) {},
  });

  const styleAnimated = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: aPosX.value - offSetX.value},
        {translateY: aPosY.value},
      ],
    };
  }, []);

  return (
    <PanGestureHandler onGestureEvent={aGesture}>
      <Animated.View
        style={[
          {
            backgroundColor: item,
          },
          styles.box,
          styleAnimated,
        ]}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default BoxVirtual;
