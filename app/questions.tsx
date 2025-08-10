import useOrientation from "@/hooks/useOrientation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from "react-native";

export default function QuestionsScreen() {
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("");
  const [smoker, setSmoker] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [exercise, setExercise] = useState(false);
  const [diet, setDiet] = useState(false);
  const [sleep, setSleep] = useState(false);

  const orientation = useOrientation();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={orientation === "PORTRAIT" ? styles.container : styles.containerY}>
      <Text style={styles.title}>Health & Lifestyle Questionnaire</Text>

      <Text style={styles.label}>Birth Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="e.g. 1990-01-01"
        keyboardType="numbers-and-punctuation"
        placeholderTextColor={"#efebeb80"}
      />

      <Text style={styles.label}>Country:</Text>
      <TextInput
        style={styles.input}
        value={country}
        onChangeText={setCountry}
        placeholder="Your country"
        placeholderTextColor={"#efebeb80"}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Do you smoke?</Text>
        <Switch
          value={smoker}
          onValueChange={setSmoker}
          trackColor={trackColor}
          thumbColor={thumb(smoker)}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Do you drink alcohol?</Text>
        <Switch
          value={alcohol}
          onValueChange={setAlcohol}
          trackColor={trackColor}
          thumbColor={thumb(alcohol)}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Do you exercise regularly?</Text>
        <Switch
          value={exercise}
          onValueChange={setExercise}
          trackColor={trackColor}
          thumbColor={thumb(exercise)}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Do you follow a healthy diet?</Text>
        <Switch
          value={diet}
          onValueChange={setDiet}
          trackColor={trackColor}
          thumbColor={thumb(diet)}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Do you sleep well?</Text>
        <Switch
          value={sleep}
          onValueChange={setSleep}
          trackColor={trackColor}
          thumbColor={thumb(sleep)}
        />
      </View>

      <View style={styles.buttonContainer}>
        
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? "#893323" : "#e24e33" },
          ]}
          onPress={ async () => {
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
          }
          }
        >
          <Text style={styles.buttonText}>Calculate</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#100a09",
    flexGrow: 1,
    justifyContent: "center",
  },
  containerY: {
    padding: 24,
    paddingHorizontal: 120,
    backgroundColor: "#100a09",
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#efebeb",
  },
  label: {
    fontSize: 16,
    color: "#efebeb",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "rgba(137, 51, 35, 0.2)",
    borderWidth: 1,
    borderColor: "#d49e94",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    fontSize: 16,
    color: "#efebeb",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
    backgroundColor: "#e24e33",
    borderRadius: 8,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#e24e33", // --accent
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#efebeb", // --text
    fontSize: 16,
    fontWeight: "bold",
  },
});

const trackColor = {
  false: "#d49e94",
  true: "#893323",
};

const thumb = (isEnabled: any) => {
  return isEnabled ? "#e24e33" : "#efebeb";
};
