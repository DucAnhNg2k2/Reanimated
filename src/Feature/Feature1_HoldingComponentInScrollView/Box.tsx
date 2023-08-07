import React from 'react';
import {StyleSheet, View} from 'react-native';
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
}

const Box = ({index, item}: BoxProps) => {
  return (
    <Animated.View
      style={[
        {
          backgroundColor: item,
        },
        styles.box,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    width: SIZE,
    height: SIZE,
    marginRight: 20,
    marginBottom: 10,
    borderRadius: 15,
  },
});

export default Box;

/*

  const aPos = useSharedValue<ContextType[]>(
    (function () {
      const a: ContextType[] = [];
      for (let i = 0; i < length; i++) {
        a.push({x: 0, y: 0});
      }
      return a;
    })(),
  );

  const aGesture: any = (function () {
    const a = [];
    for (let i = 0; i < length; i++) {
      const item: any = useAnimatedGestureHandler<
        PanGestureHandlerGestureEvent,
        ContextType
      >({
        onStart(event, context) {
          console.log('index: ', i, aPos.value[i]);
          const pos = aPos.value[i];
          context.x = pos.x;
          context.y = pos.y;
        },
        onActive(event, context) {
          aPos.value[i].x = event.translationX + context.x;
          aPos.value[i].y = event.translationY + context.y;
        },
        onEnd(event) {},
      });
      a.push(item);
    }
    return a;
  })();

  const aStyleAnimated = useMemo(
    () =>
      (function (): any {
        const a = [];
        for (let i = 0; i < length; i++) {
          const item = useAnimatedStyle(() => {
            return {
              transform: [
                {translateX: aPos.value[i].x},
                {translateY: aPos.value[i].y},
              ],
            };
          }, []);
          a.push(item);
        }
        return a;
      })(),
    [],
  );

  */
