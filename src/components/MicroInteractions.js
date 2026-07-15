import React, { useEffect, useRef } from 'react';
import { Animated, Easing, TouchableOpacity, View } from 'react-native';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const easeOut = Easing.out(Easing.cubic);

function clampPercent(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, number));
}

export function PressableScale({ activeOpacity = 0.92, children, onPressIn, onPressOut, style, ...props }) {
  const scale = useRef(new Animated.Value(1)).current;

  function animate(toValue, duration) {
    Animated.timing(scale, {
      toValue,
      duration,
      easing: easeOut,
      useNativeDriver: true,
    }).start();
  }

  return (
    <AnimatedTouchableOpacity
      {...props}
      activeOpacity={activeOpacity}
      onPressIn={(event) => {
        animate(0.95, 150);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        animate(1, 180);
        onPressOut?.(event);
      }}
      style={[style, { transform: [{ scale }] }]}
    >
      {children}
    </AnimatedTouchableOpacity>
  );
}

export function FadeInView({ animationKey, children, delay = 0, style }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(4)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(4);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        delay,
        easing: easeOut,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 180,
        delay,
        easing: easeOut,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animationKey, delay, opacity, translateY]);

  return (
    <Animated.View style={[style, { opacity, transform: [{ translateY }] }]}>
      {children}
    </Animated.View>
  );
}

export function AnimatedBar({ fillStyle, percent, style }) {
  const animatedPercent = useRef(new Animated.Value(clampPercent(percent))).current;

  useEffect(() => {
    Animated.timing(animatedPercent, {
      toValue: clampPercent(percent),
      duration: 180,
      easing: easeOut,
      useNativeDriver: false,
    }).start();
  }, [animatedPercent, percent]);

  const width = animatedPercent.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={style}>
      <Animated.View style={[fillStyle, { width }]} />
    </View>
  );
}
