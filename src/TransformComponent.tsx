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

type ContextType = {
  width: number;
  height: number;
};
const WIDTH_ITEM_RIGHT = 15;

const TransformComponent = () => {
  const width1 = useSharedValue(100);
  const width2 = useSharedValue(100);
  const styleAnimatedItem1 = useAnimatedStyle(() => {
    return {
      width: width1.value,
      height: 50,
    };
  }, []);
  const styleAnimatedItem2 = useAnimatedStyle(() => {
    return {
      width: width2.value,
      height: 50,
    };
  }, []);

  const gesTureHandler1 = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onActive(event, context) {
      if (event.x + width1.value > 0) {
        width1.value = event.x + width1.value;
      }
    },
  });

  const gesTureHandler2 = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onActive(event, context) {
      if (event.x + width2.value > 0) {
        width2.value = event.x + width2.value;
      }
    },
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.item1, styleAnimatedItem1]}>
        <PanGestureHandler onGestureEvent={gesTureHandler1}>
          <Animated.View style={[styles.itemTransformRight1]} />
        </PanGestureHandler>
      </Animated.View>
      <Animated.View style={[styles.item2, styleAnimatedItem2]}>
        <PanGestureHandler onGestureEvent={gesTureHandler2}>
          <Animated.View style={[styles.itemTransformRight2]} />
        </PanGestureHandler>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
  },
  item1: {
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  itemTransformRight1: {
    position: 'absolute',
    right: -2,
    width: WIDTH_ITEM_RIGHT,
    height: '100%',
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
  item2: {
    backgroundColor: 'red',
    borderRadius: 10,
  },
  itemTransformRight2: {
    position: 'absolute',
    right: -2,
    width: WIDTH_ITEM_RIGHT,
    height: '100%',
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default TransformComponent;
