import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { calculateLifeExpectancy } from '../utils/lifeExpectancyCalculator';

export default function CountdownScreen() {
  const params = useLocalSearchParams();
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const birthDate = new Date(params.birthDate as string);
    const country = params.country as string;
    const smoker = params.smoker === 'true';
    const exercise = params.exercise === 'true';

    const seconds = calculateLifeExpectancy(birthDate, country, {
      smoker,
      exercise,
    });

    setSecondsLeft(seconds);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      <Text>Estimated time left (in seconds):</Text>
      <Text style={{ fontSize: 32 }}>{secondsLeft}</Text>
    </View>
  );
}
