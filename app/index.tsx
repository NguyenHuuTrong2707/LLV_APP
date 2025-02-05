import { Text, View } from "react-native";
import { app } from "../firebase/firebaseConfig";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from "react";
interface PageData {
     user_id :string
     user_name : string
}
const db = getFirestore(app);
export default function Index() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "users"), (querySnapshot) => {
          if (querySnapshot.empty) {
              console.log("No documents found in 'Page_2' collection.");
              return;
          }

          querySnapshot.forEach((doc) => {
              const data = doc.data();
              setPageData({
                 user_id : data.user_id,
                 user_name :data.user_name

              });
          });
      },
          (error) => {
              console.log("Error fetching document:", error);
          });
      return () => unsubscribe();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{pageData?.user_name}</Text>
    </View>
  );
}
