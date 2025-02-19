import React, { useCallback, useEffect, useState } from 'react';
import styles from "./styles/WaitingStyle";
import { collection, getFirestore, onSnapshot, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import { SafeAreaView } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
import { getDistance } from './utils/location';
import { getUserLocation } from './utils/getLocation';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
interface Page_Waiting {
    imgbg: string
    imgface1: string
    imgnote: string
    title: string
}
type Player = {
    uid: string,
    username: string,
    latitude: number,
    longitude: number
}
export type RootStackParamList = {
    Waiting : undefined;
    TimDuocDoiThu: { opponentName: string };
  };
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Waiting'>;
const db = getFirestore(app)
const Page_Waiting: React.FC = () => {
    const [page_waiting, setPageWating] = useState<Page_Waiting | null>(null)
    const { user } = useAuth();
    const [userName, setUserName] = useState<string>('Anonymous')
    const [timeElapsed, setTimeElapsed] = useState(30);
    const [isSearching, setIsSearching] = useState(true);
    const userRef = user?.uid ? doc(db, "players", user.uid) : null;
    const [opponentFound, setOpponentFound] = useState(false);
    const navigation = useNavigation<NavigationProp>()
    // kiểm tra người chơi có đang ở màn hình đợi không
    useFocusEffect(
        useCallback(() => {
            if (userRef) {
                updateDoc(userRef, { isWaiting: true });
            }
            return () => {
                if (userRef) {
                    updateDoc(userRef, { isWaiting: false });
                }
            };
        }, [userRef])
    );
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_Waiting"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_Waiting' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageWating({
                    imgbg: data.imgbg,
                    imgface1: data.imgface1,
                    imgnote: data.imgnote,
                    title: data.title
                });
            });
        },
            (error) => {
                console.log("Error fetching document:", error);
            });
        return () => unsubscribe();
    }, []);
    //lay ten nguoi dung
    useEffect(() => {
        if (user?.uid) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserName(docSnap.data().username || "Anonymous");
                } else {
                    console.log("No user document found!");
                    setUserName("Anonymous");
                }
            }, (error) => {
                console.log("Error fetching user data:", error);
                setUserName("Anonymous");
            });

            return () => unsubscribe();
        }
    }, [user]);
    //dem thoi gian
    useEffect(() => {
        if (timeElapsed > 0 && isSearching) {
            const timer = setInterval(() => {
                setTimeElapsed(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeElapsed, isSearching]);
    useEffect(() => {
        if (!isSearching || opponentFound) return;
        const playersRef = collection(db, "players");
        const q = query(playersRef, where("isWaiting", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                findDoiThu();
            }
        });
        return () => unsubscribe();
    }, [isSearching, opponentFound]);
    //tim doi thu
    const findDoiThu = async () => {
        if (!isSearching || opponentFound) return;
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
            .filter(player => player.uid !== user?.uid);
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
            // Alert.alert("Tìm thấy đối thủ:", (closestPlayer as Player).username);
            setOpponentFound(true);
            setIsSearching(false);

            // Cập nhật trạng thái của cả hai người chơi để không bị ghép lại lần nữa
            if (userRef) {
                await updateDoc(userRef, { isWaiting: false });
            }
            const opponentRef = doc(db, "players", (closestPlayer as Player).uid);
            await updateDoc(opponentRef, { isWaiting: false });
            navigation.navigate('TimDuocDoiThu', { opponentName: (closestPlayer as Player).username });
        } else {
            console.log("Không tìm thấy đối thủ.");
        }
    }
    //dinh dạng thời gian
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    return (
        <ImageBackground style={styles.imgbg}
            source={{ uri: page_waiting?.imgbg }}
            resizeMode='cover'
        >
            <SafeAreaView style={styles.container}>
                <Header
                />
                {/* Title */}
                <Text style={styles.title}>{page_waiting?.title}</Text>
                {/* Load  */}
                <Text style={styles.txtLoad}>Đang tìm đối thủ</Text>
                {/* Avatar */}
                <Image style={styles.avt}
                    source={{ uri: page_waiting?.imgface1 }}
                    resizeMode='cover'
                ></Image>
                {/* Ten user */}
                <Text style={styles.txtUserName}>{userName}</Text>
                {/* Thoi gian */}
                <Text style={styles.txtTime}>{formatTime(timeElapsed)}</Text>
                {/* Note */}
                <Image
                    source={{ uri: page_waiting?.imgnote }}
                    style={styles.note}
                    resizeMode='cover'
                ></Image>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Page_Waiting