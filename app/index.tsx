import QuestionsScreen from "@/screens/QuestionsScreen";
import { StyleSheet } from "react-native";


export default function Index() {
  return (
   <>
    <QuestionsScreen/>
   </>
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