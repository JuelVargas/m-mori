import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Switch, Text, TextInput, View } from "react-native";

export default function QuestionsScreen() {
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [exercise, setExercise] = useState(false);
  const [diet, setDiet] = useState(false);
  const [sleep, setSleep] = useState(false);

  const router = useRouter();

  return (
    <View>
      <Text>Birth Date (YYYY-MM-DD):</Text>
      <TextInput value={birthDate} onChangeText={setBirthDate} />

      <Text>Country:</Text>
      <TextInput value={country} onChangeText={setCountry} />

      <Text>Do you smoke?</Text>
      <Switch value={smoker} onValueChange={setSmoker} />

      <Text>Do you drink alcohol?</Text>
      <Switch value={alcohol} onValueChange={setAlcohol} />

      <Text>Do you exercise regularly?</Text>
      <Switch value={exercise} onValueChange={setExercise} />

      <Text>Do you follow a healthy diet?</Text>
      <Switch value={diet} onValueChange={setDiet} />

      <Text>Do you sleep well?</Text>
      <Switch value={sleep} onValueChange={setSleep} />

      <Button
        title="Calculate"
        onPress={async () => {
          const userData = {
            birthDate,
            country,
            smoker,
            alcohol,
            exercise,
            diet,
            sleep,
          };

          await AsyncStorage.setItem("userData", JSON.stringify(userData));

          router.replace("/countdown");
        }}
      />
    </View>
  );
}
