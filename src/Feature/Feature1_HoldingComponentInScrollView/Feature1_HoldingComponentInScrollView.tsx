import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Box from './Box';
import BoxVirtual from './BoxVirtual';

const aColors = [
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'brown',
  'gray',
  'black',
];

const Feature1_HoldingComponentInScrollView = () => {
  const offSetX = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler(e => {
    offSetX.value = e.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={handleScroll}
          horizontal={true}
          style={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          {aColors.map((item: string, index: number) => {
            return (
              <View key={index}>
                <Box index={index} item={item} />
              </View>
            );
          })}
        </Animated.ScrollView>
      </View>
      <View style={styles.virtual}>
        {aColors.map((item: string, index: number) => {
          return (
            <View key={index}>
              <BoxVirtual index={index} item={item} offSetX={offSetX} />
            </View>
          );
        })}
      </View>
      <Text style={styles.title}> Holding Component In ScrollView </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    borderColor: 'black',
    borderWidth: 1,
    marginTop: 200,
  },
  virtual: {
    position: 'absolute',
    top: 200,
    left: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    position: 'absolute',
    alignItems: 'center',
    top: 15,
    fontSize: 18,
    fontWeight: '600',
  },
});
export default Feature1_HoldingComponentInScrollView;
