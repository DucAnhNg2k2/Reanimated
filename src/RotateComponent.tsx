import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Dimensions, LogBox, StyleSheet, View, ViewProps} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {getAngleFromThreePoint} from './Utils/CalculateAngleFromThreePoint';

type Point = {
  x: number;
  y: number;
};
const SIZE = 150;

const RotateComponent = () => {
  const [pointRef, setPointRef] = useState<Point>({x: 0, y: 0});
  const angle = useSharedValue(0);

  useEffect(() => {
    // const p1 = {x: 0, y: 0};
    // const p2 = {x: 90, y: 0};
    // const p3 = {x: 0, y: 90};
    // console.log((getAngleFromThreePoint(p1, p2, p3) * 180) / Math.PI);
    // angle.value = withTiming(720, {duration: 2000});
  }, []);

  const gesTureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Point
  >({
    onStart(event, context) {
      context.x = event.absoluteX;
      context.y = event.absoluteY;
    },
    onActive(event, context) {
      const pointActive = {x: event.absoluteX, y: event.absoluteY};
      const pointOld = {x: context.x, y: context.y};
      let num =
        (getAngleFromThreePoint(pointRef, pointOld, pointActive) * 180) /
        Math.PI;
      if (Number.isNaN(num)) {
        num = 0;
      } else {
        // if (pointActive.x < pointRef.x && pointActive.y < pointOld.y) {
        //   num = -num;
        // }
        // if (pointActive.x > pointRef.x && pointActive.y > pointOld.y) {
        //   num = -num;
        // }
        if ((pointActive.x - pointRef.x) * (pointActive.y - pointOld.y) > 0) {
          num = -num;
        }
      }
      if (num + angle.value >= 0) {
        angle.value = num + angle.value;
      }

      context.x = pointActive.x;
      context.y = pointActive.y;
    },
  });

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `-${angle.value}deg`}],
    };
  }, []);

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={gesTureHandler}>
        <Animated.View
          style={[styles.view, reanimatedStyle]}
          onLayout={event => {
            const layout = event.nativeEvent.layout;
            setPointRef({x: layout.x + SIZE / 2, y: layout.y + SIZE / 2});
          }}
        />
      </PanGestureHandler>
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
});

export default RotateComponent;
