import React, { useCallback, useEffect, useState, useRef } from 'react';
import styles from "./styles/BanVitStyle";
import { collection, getFirestore, onSnapshot, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Alert, Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header';
import ButtonComponent from '../components/ButtonCompont';
import { SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { RootStackParamList } from './utils/RootStack';
import { useAuth } from '@/contexts/AuthContext';
import { getUserLocation } from './utils/getLocation';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Page_BanVit {
    title: string;
    content: string;
    imgbg: string;
    banner: string;
    imgGame: string;
    note: string;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BanVit'>;
type ThuTaiBanViRouteProp = RouteProp<RootStackParamList, "BanVit">;
const db = getFirestore(app);

const Page_BanVit: React.FC = () => {
    const [pageData, setPageData] = useState<any>(null);
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const route = useRoute<ThuTaiBanViRouteProp>();
    const [isSearching, setIsSearching] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(15);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const { gameMode } = route.params;
    useFocusEffect(
        useCallback(() => {
            return () => {
                if (user?.uid) {
                    updateDoc(doc(db, "players", user.uid), { isWaiting: false }).catch(console.error);
                }
            };
        }, [user?.uid])
    );
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `Page_${gameMode}`), (snapshot) => {
            if (!snapshot.empty) {
                setPageData(snapshot.docs[0].data());
            } else {
                console.log(`Không có dữ liệu trong collection Page_${gameMode}`);
            }
        });
    })

    const handleFindOpponent = async () => {
        if (!user?.uid || isSearching) return;

        setIsSearching(true);
        setTimeElapsed(15);

        const userDocRef = doc(db, "players", user.uid);
        await updateDoc(userDocRef, { isWaiting: true, gameMode });

        const location = await getUserLocation();
        if (!location) {
            Alert.alert("Lỗi", "Không thể lấy vị trí. Hãy kiểm tra cài đặt GPS.");
            setIsSearching(false);
            return;
        }

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const username = userSnap.exists() ? userSnap.data()?.username || "Người chơi" : user?.displayName || "Người chơi";

        await setDoc(userDocRef, {
            uid: user.uid,
            username,
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: new Date(),
            gameMode, // Ghi nhận gameMode của người chơi
        }, { merge: true });

        searchTimeout.current = setTimeout(() => {
            setIsSearching(false);
            console.log("Thông báo", "Không tìm thấy đối thủ. Vui lòng thử lại sau!");
        }, 15000);

        // Chỉ lấy người chơi đang chờ và cùng gameMode
        const q = query(collection(db, "players"), where("isWaiting", "==", true), where("gameMode", "==", gameMode));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const players = querySnapshot.docs.map(doc => doc.data());
            if (players.length >= 2) {
                clearTimeout(searchTimeout.current!);
                handleMatchOpponent(players[0], players[1]);
                unsubscribe();
            }
        });
    };


    const handleMatchOpponent = async (player1: any, player2: any) => {
        try {
            clearTimeout(searchTimeout.current!);
            await Promise.all([
                updateDoc(doc(db, "players", player1.uid), { isWaiting: false, isReady: true, opponentId: player2.uid }),
                updateDoc(doc(db, "players", player2.uid), { isWaiting: false, isReady: true, opponentId: player1.uid })
            ])

            Alert.alert("Đã tìm thấy đối thủ!", "Trận đấu sẽ bắt đầu sau 5 giây...");
            setTimeout(() => {
                navigation.navigate("ThuTaiBanVit", { opponentName: player1.uid === user?.uid ? player2.username : player1.username, gameMode });
            }, 5000);

        } catch (error) {
            console.error("Lỗi khi ghép đối thủ:", error);
        }
    };

    useEffect(() => {
        if (timeElapsed > 0 && isSearching) {
            const timer = setInterval(() => setTimeElapsed(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeElapsed, isSearching]);

    return (
        <ExpoImage source={{ uri: pageData?.imgbg }} style={styles.banner} contentFit="cover" cachePolicy="memory-disk">
            <SafeAreaView style={styles.container}>
                <Header title='Tết tranh tài' color={{ color: '#FFF9D1' }} />
                <ExpoImage source={{ uri: pageData?.banner }} style={styles.contentContainer} contentFit="cover" cachePolicy="memory-disk">
                    <View style={styles.textWrapper}>
                        <Text style={styles.title}>{pageData?.title}</Text>
                        <Text style={styles.txtNhiemVu}>{pageData?.content}</Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        <ExpoImage source={{ uri: pageData?.imgGame }} style={styles.minibanner} contentFit="cover" cachePolicy="memory-disk" />
                    </View>
                    <ButtonComponent title={isSearching ? `Đang tìm đối thủ... (${timeElapsed}s)` : "Tìm đối thủ"} onPress={handleFindOpponent} disabled={isSearching} />
                    <View style={styles.noteContainer}>
                        <Text style={styles.txtNote}>Lưu ý: Khung giờ mỗi ngày cho phép thi đấu</Text>
                        <Text style={styles.txtNote}>{pageData?.note}</Text>
                    </View>
                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>
    );
};

export default Page_BanVit;