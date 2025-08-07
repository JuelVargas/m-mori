import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useOrientation from '../hooks/useOrientation';
import { calculateLifeExpectancy } from '../utils/lifeExpectancyCalculator';

export default function CountdownScreen() {
  const [params, setParams] = useState<any>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const orientation = useOrientation();

  useEffect(() => {
    const fetchData = async () => {
      const dataFromLocalStorage = await AsyncStorage.getItem('userData');
      setParams(dataFromLocalStorage ? JSON.parse(dataFromLocalStorage) : {});
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!params) return;

    const birthDate = new Date(params.birthDate as string);
    const country = params.country as string;
    const smoker = params.smoker === 'true';
    const alcohol = params.alcohol === 'true';
    const exercise = params.exercise === 'true';
    const diet = params.diet === 'true';
    const sleep = params.sleep === 'true';

    const seconds = calculateLifeExpectancy(birthDate, country, {
      smoker,
      alcohol,
      exercise,
      diet,
      sleep
    });

    setSecondsLeft(seconds);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [params]);

  return (
    <View style={orientation === 'LANDSCAPE' ? styles.landscape : styles.portrait}>
      <Text>Estimated time left (in seconds):</Text>
      <Text style={{ fontSize: 32 }}>{secondsLeft}</Text>
    </View>
  );



}; 
const styles = StyleSheet.create({
  portrait: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  landscape: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  }
});
