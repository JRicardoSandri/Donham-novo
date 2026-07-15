import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, SafeAreaView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, spacing } from '../theme';

const APP_ICON = require('../../assets/icon.png');

export default function AppSplashScreen({ onFinish }) {
  const { width, height } = useWindowDimensions();
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const lineOpacity = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const iconSize = Math.min(Math.max(width * 0.34, 122), height * 0.22, 184);
  const glowSize = iconSize * 1.46;

  useEffect(() => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onFinish?.();
    };

    const fallback = setTimeout(finish, 3200);
    const animation = Animated.parallel([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: 1100,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(900),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(1350),
        Animated.timing(lineOpacity, {
          toValue: 1,
          duration: 440,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(1700),
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 520,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(2800),
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 380,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(({ finished: animationFinished }) => {
      clearTimeout(fallback);
      if (animationFinished) finish();
    });

    return () => {
      clearTimeout(fallback);
      animation.stop();
    };
  }, [footerOpacity, iconOpacity, lineOpacity, onFinish, screenOpacity, titleOpacity]);

  return (
    <Animated.View pointerEvents="auto" style={[styles.overlay, { opacity: screenOpacity }]}>
      <SafeAreaView style={styles.safe}>
        <View style={styles.content}>
          <View style={styles.center}>
            <Animated.View style={[styles.iconWrap, { opacity: iconOpacity, width: glowSize, height: glowSize }]}>
              <View style={[styles.glowOuter, { width: glowSize, height: glowSize, borderRadius: glowSize / 2 }]} />
              <View style={[styles.glowInner, { width: iconSize * 1.12, height: iconSize * 1.12, borderRadius: iconSize * 0.56 }]} />
              <Image source={APP_ICON} resizeMode="contain" style={{ width: iconSize, height: iconSize }} />
            </Animated.View>

            <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
              RPG Combat Tracker
            </Animated.Text>

            <Animated.View style={[styles.goldLine, { opacity: lineOpacity }]} />
          </View>

          <Animated.Text style={[styles.footer, { opacity: footerOpacity }]}>
            Sandri Studios
          </Animated.Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    zIndex: 100,
    elevation: 100,
  },
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xl,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowOuter: {
    position: 'absolute',
    backgroundColor: colors.primary,
    opacity: 0.055,
  },
  glowInner: {
    position: 'absolute',
    backgroundColor: colors.primarySoft,
    opacity: 0.52,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 0.3,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  goldLine: {
    width: 104,
    height: 1,
    backgroundColor: colors.primary,
    marginTop: spacing.md,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xl,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
    textAlign: 'center',
  },
});
