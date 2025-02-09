import React, { useState, useEffect } from "react";
import { Text, View, Alert, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles/LacLocVang";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonCompont";
import { handleShakeDetected, startListening, subscribeAccelerometer } from "./utils/shakeUtils";

interface Page_LacLocVang {
  imgBackGround: string;
}

const db = getFirestore(app);
const Page_LacLocVang: React.FC = () => {
  // Load firebase
  const [page_LacLocVang, setPage_LacLocVang] = useState<Page_LacLocVang | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Page_LacLocVang"),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No documents found in 'Page_LacLocVang' collection.");
          return;
        }
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setPage_LacLocVang({ imgBackGround: data.imgBackGround });
        });
      },
      (error) => {
        console.log("Error fetching document:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const [totalShakes, setTotalShakes] = useState<number>(10);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isShaken, setIsShaken] = useState<boolean>(false);

  useEffect(() => {
    const subscription = subscribeAccelerometer(isListening, isShaken, () =>
      handleShakeDetected(totalShakes, setTotalShakes, setIsShaken, setIsListening)
    );
    return () => {
      if (subscription) subscription.remove();
    };
  }, [isListening, isShaken]);

  return (
    <ImageBackground source={{ uri: page_LacLocVang?.imgBackGround }} style={styles.imgBackGround} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.count}>
              Bạn có <Text style={styles.totalShakes}>{totalShakes}</Text> lượt lắc
            </Text>

            {totalShakes > 0 ? (
              <ButtonComponent
                onPress={() => startListening(totalShakes, isShaken, setIsListening, setIsShaken)}
                title="Lắc ngay 1 lượt"
              />
            ) : (
              <Text style={styles.noShakes}>Bạn đã hết lượt lắc!</Text>
            )}

            {totalShakes > 0 ? (
              <ButtonComponent
                onPress={() => startListening(totalShakes, isShaken, setIsListening, setIsShaken)}
                title="Lắc ngay 10 lượt"
              />
            ) : (
              <Text style={styles.noShakes}>Bạn đã hết lượt lắc!</Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Page_LacLocVang;
