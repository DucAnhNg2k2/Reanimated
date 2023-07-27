import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Point = {
  x: number;
  y: number;
};

const SIZE = 50;

const Component = (point: Point) => {
  const translateX = useSharedValue(point.x);
  const translateY = useSharedValue(point.y);
  const gesTureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Point
  >({
    onStart(event, context) {
      context.x = translateX.value;
      context.y = translateY.value;
    },
    onActive(event, context) {
      translateX.value = event.translationX + context.x;
      translateY.value = event.translationY + context.y;
    },
    onEnd(event) {},
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, []);

  return (
    <PanGestureHandler onGestureEvent={gesTureHandler}>
      <Animated.View style={[styles.view, reanimatedStyle]} />
    </PanGestureHandler>
  );
};

const MoveComponent = () => {
  const value = (function () {
    let array: Point[] = [];
    for (let i = 0; i <= 5; i++) {
      array.push({
        x: i * SIZE,
        y: 50,
      });
    }
    return array;
  })();

  return (
    <View style={styles.container}>
      {value.map((item, index) => {
        return <Component key={index} x={value[index].x} y={value[index].y} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 45,
  },
  view: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
    display: 'flex',
    borderRadius: 10,
  },
});

export default MoveComponent;
