import React, { useState, useEffect } from "react";
import { Text, View, Alert, ImageBackground, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles  from "./styles/LacLocVangStyle";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import Header from "../components/Header";
import ButtonComponent from "../components/ButtonCompont";
import { handleShakeDetected, startListening, subscribeAccelerometer } from "./utils/shakeUtils";
import { addGiftToKhoLoc } from "./utils/addGift";
import { useAuth } from "@/contexts/AuthContext";
import { updateDoc } from "firebase/firestore";
import PopUpNhanQua from "../components/PopupNhanQua";
import Popup10Qua from '../components/Popup10Qua'
interface Page_LacLocVang {
  imgBackGround: string;
}

const db = getFirestore(app);
const Page_LacLocVang: React.FC = () => {
  const [page_LacLocVang, setPage_LacLocVang] = useState<Page_LacLocVang | null>(null);
  const { user } = useAuth();
  const [totalShakes, setTotalShakes] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isShaken, setIsShaken] = useState<boolean>(false);
  const [isTotalShakesLoaded, setIsTotalShakesLoaded] = useState(false);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopupMultiVisible, setPopupMultiVisible] = useState(false);
  const [shakeCount, setShakeCount] = useState<number>(1);
  const [gift, setGift] = useState<{ id: string, name: string; image: string; code: string } | null>(null);
  const [gifts, setGifts] = useState<{ id: string; name: string; image: string; code: string }[]>([]);

  // theo dõi thay đổi của shake
  useEffect(() => {
    if (!user || totalShakes < 0 || !isTotalShakesLoaded) return;
    const userRef = doc(db, "users", user.uid);
    updateDoc(userRef, { totalShakes })
      .then(() => console.log("totalShakes updated successfully"))
      .catch((error) => console.error("Error updating totalShakes:", error));
  }, [totalShakes, user, isTotalShakesLoaded]);
  // load dữ liệu từ firebase
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

  // thực hiện cảm biến lắc
  useEffect(() => {
    const subscription = subscribeAccelerometer(
      isListening,
      isShaken,
      (shakeCount) =>
        handleShakeDetected(
          totalShakes,
          setTotalShakes,
          setIsShaken,
          setIsListening,
          setPopupVisible,
          setPopupMultiVisible,
          setGift,
          setGifts,
          shakeCount
        ),
      shakeCount // Truyền số lượt lắc
    );

    return () => {
      if (subscription) subscription.remove();
    };
  }, [isListening, isShaken, shakeCount]);

  // đọc số lượt lắc của user
  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setTotalShakes(data.totalShakes || 0);
        setIsTotalShakesLoaded(true);
      }
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <ImageBackground source={{ uri: page_LacLocVang?.imgBackGround }} style={styles.imgBackGround} resizeMode="cover">
      <SafeAreaView style={styles.container}>
        <Header />

        <View style={styles.contentContainer}>
          <Text style={styles.count}>
            Bạn có <Text style={styles.totalShakes}>{totalShakes}</Text> lượt lắc
          </Text>

          {totalShakes > 0 ? (
            <>
              <ButtonComponent
                onPress={() => startListening(totalShakes, isShaken, setIsListening, setIsShaken, setShakeCount, 1)}
                title="Lắc 1 lượt"
              />

              {totalShakes >= 10 && (
                <ButtonComponent
                  onPress={() => {
                    startListening(totalShakes, isShaken, setIsListening, setIsShaken, setShakeCount, 10);

                  }}
                  title="Lắc 10 lượt"
                />
              )}
            </>
          ) : (
            <Text style={styles.noShakes}>Bạn đã hết lượt lắc!</Text>
          )}
        </View>

        {isPopupVisible && <PopUpNhanQua
          title1={gift?.name ?? ''}
          imgQua1={gift?.image ?? ''}
          giftcode={gift?.code ?? ''}
          content="WOW, THÁNH LẮC VÀNG ĐÂY RỒI,GIÀU TO RỒI ANH EM ƠI!"
          onClose={async () => {
            if (gift && user?.uid) {
              await addGiftToKhoLoc(user.uid, {...gift, status :'Chưa nhận'});
            }
            setPopupVisible(false);
          }}
          onConfirm={async () => {
            if (gift && user?.uid) {
              await addGiftToKhoLoc(user.uid, {...gift, status :'Đã nhận'});
            }
            setPopupVisible(false);
          }}
        />}
        {isPopupMultiVisible && (
          <Popup10Qua
            gifts={gifts.map((gift) => ({
              name: gift.name,
              imgUrl: gift.image,
              giftcode: gift.code,
            }))}
            onConfirm={async () => {
              if (gifts.length > 0 && user?.uid) {
                await Promise.all(gifts.map((gift) => addGiftToKhoLoc(user.uid, {...gift , status :'Đã nhận'})));
              }
              setPopupMultiVisible(false);
            }}
            onClose={async () => {
              if (gifts.length > 0 && user?.uid) {
                await Promise.all(
                  gifts.map((gift) => addGiftToKhoLoc(user.uid, { ...gift, status: "Chưa nhận" }))
                );
              }
              setPopupMultiVisible(false);
            }}
            
          />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Page_LacLocVang;
