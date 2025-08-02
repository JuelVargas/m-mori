import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


export default function Index() {

  const router = useRouter();

  useEffect(() => {
    const checkUserData = async () => {
      const storedData = await AsyncStorage.getItem('userData');

      if (storedData) {
        router.replace('/countdown');
        setTimeout(() => { // if data exists, navigate to questions after 5 seconds
          router.replace('/questions');//remember to delete this line after testing
        }, 5000);
      } else {
        router.replace('/questions');
      }
    };

    checkUserData();
  }, []);
  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#27F53C",
  },

});