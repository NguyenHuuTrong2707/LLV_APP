import { collection, query, where, getDocs, updateDoc, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getDistance } from "./location";
import { getUserLocation } from "./getLocation";
import { app } from "@/firebase/firebaseConfig";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootStackParamList } from "./RootStack";

export type Player = {
  uid: string;
  username: string;
  latitude: number;
  longitude: number;
  correctAnswers: number;
  totalTime: number;
  isFinished: boolean
};
const db = getFirestore(app);
export const findDoiThu = async (
  userId: string | undefined,
  setOpponentFound: (value: boolean) => void,
  setIsSearching: (value: boolean) => void,
  nextScreen: keyof RootStackParamList,
  navigation: NativeStackNavigationProp<RootStackParamList, any>
) => {
  if (!userId) return;


  const userRef = doc(db, "players", userId);
  const location = await getUserLocation();

  if (!location) {
    console.log("Không lấy được vị trí.");
    return;
  }

  const playersRef = collection(db, "players");
  const q = query(playersRef, where("isWaiting", "==", true));
  const querySnapshot = await getDocs(q);

  const filteredPlayers = querySnapshot.docs
    .map(doc => doc.data() as Player)
    .filter(player => player.uid !== userId);

  let closestPlayer: Player | null = null;
  let minDistance = Infinity;

  filteredPlayers.forEach(player => {
    const distance = getDistance(
      location.latitude, location.longitude,
      player.latitude, player.longitude
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestPlayer = player;
    }
  });

  if (closestPlayer) {
    setOpponentFound(true);
    setIsSearching(false);

    await updateDoc(userRef, { isWaiting: false });
    const opponentRef = doc(db, "players", (closestPlayer as Player).uid);
    await updateDoc(opponentRef, { isWaiting: false });
 if(nextScreen === 'TimDuocDoiThu'){
    navigation.navigate(nextScreen, { opponentName: (closestPlayer as Player).username });
  }
  else{
    navigation.navigate(nextScreen as any);
  }
 } else {
    console.log("Không tìm thấy đối thủ.");
  }
};

