import React, { useCallback, useEffect, useState } from 'react';
import styles from "./styles/WaitingStyle";
import { collection, getFirestore, onSnapshot, doc, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header'
import { SafeAreaView } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
import { findDoiThu } from './utils/findPlayer';
import { Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { formatTime } from './utils/formatTime';
import { RootStackParamList } from './utils/RootStack';
interface Page_Waiting {
    imgbg: string
    imgface1: string
    imgnote: string
    title: string
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Waiting'>;
const db = getFirestore(app)
const Page_Waiting: React.FC = () => {
    const [page_waiting, setPageWating] = useState<Page_Waiting | null>(null)
    const { user } = useAuth();
    const [userName, setUserName] = useState<string>('Anonymous')
    const [timeElapsed, setTimeElapsed] = useState(15);
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
    //Thong bao khi không tim thay doi thu
    useEffect(() => {
        if (timeElapsed === 0 && !opponentFound) {
            Alert.alert(
                "Thông báo",
                "Không tìm thấy đối thủ. Vui lòng thử lại sau!",
                [{ text: "OK", onPress: () => navigation.goBack() }]
            );
            setIsSearching(false);
        }
    }, [timeElapsed, opponentFound, navigation]);
    //tim kiem doi thu 
    useEffect(() => {
        if (!isSearching || opponentFound) return;
        const playersRef = collection(db, "players");
        const q = query(playersRef, where("isWaiting", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (!querySnapshot.empty) {
                findDoiThu(user?.uid, setOpponentFound, setIsSearching,"TimDuocDoiThu", navigation);
            }
        });
        return () => unsubscribe();
    }, [isSearching, opponentFound]);
    return (
        <ExpoImage style={styles.imgbg}
            source={{ uri: page_waiting?.imgbg }}
            contentFit="cover"
            cachePolicy="memory-disk"
        >
            <SafeAreaView style={styles.container}>
                <Header
                />
                {/* Title */}
                <Text style={styles.title}>{page_waiting?.title}</Text>
                {/* Load  */}
                <Text style={styles.txtLoad}>Đang tìm đối thủ</Text>
                {/* Avatar */}
                <ExpoImage style={styles.avt}
                    source={{ uri: page_waiting?.imgface1 }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                ></ExpoImage>
                {/* Ten user */}
                <View style={styles.containerUsername}>
                    <Text style={styles.txtUserName}>{userName}</Text>
                </View>
                {/* Thoi gian */}
                <View style={styles.containerTime}>

                    <Text style={styles.txtTime}>{formatTime(timeElapsed)}</Text>
                </View>
                {/* Note */}
                <ExpoImage
                    source={{ uri: page_waiting?.imgnote }}
                    style={styles.note}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                ></ExpoImage>
            </SafeAreaView>
        </ExpoImage>
    )
}

export default Page_Waiting