import React, { useEffect, useRef, useState } from 'react';
import styles from "./styles/TimDuocDoiThuStyle";
import { collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header';
import ButtonComponent from '../components/ButtonCompont';
import { SafeAreaView } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './utils/RootStack';
import { formatTime } from './utils/formatTime';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TimDuocDoiThu'>;
type TimDuocDoiThuRouteProp = RouteProp<RootStackParamList, "TimDuocDoiThu">;

const db = getFirestore(app);

const Page_TimDuocDoiThu: React.FC = () => {
    const [pageData, setPageData] = useState<{ imgbg: string, imgface1: string, imgface2: string } | null>(null);
    const { user } = useAuth();
    const [userName, setUserName] = useState<string>("Anonymous");
    const route = useRoute<TimDuocDoiThuRouteProp>();
    const { opponentName } = route.params;
    const [timeElapsed, setTimeElapsed] = useState(15);
    const navigation = useNavigation<NavigationProp>();
    const [isReady, setIsReady] = useState(false);
    const [opponentReady, setOpponentReady] = useState(false);
    const alertShownRef = useRef(false);
    const [bothPlayersReady, setBothPlayersReady] = useState(false);

    const updatePlayerState = async (isReady: boolean, isCanceled = false) => {
        if (!user?.uid) return;
        const playerRef = doc(db, "players", user.uid);
        await setDoc(playerRef, { isReady, isCanceled }, { merge: true });
        setIsReady(isReady);
        if (isCanceled) navigation.navigate("ThanhLiXi");
    };

    const buttonHuy = () => {
        Alert.alert(
            "Thông báo",
            "Bạn sẽ hủy trận đấu!!!",
            [
                { text: "Chơi tiếp", style: "cancel" },
                { text: "Đồng ý", onPress: () => updatePlayerState(false, true) } 
            ]
        );
    };
    
    

    const buttonChoi = () => updatePlayerState(true);

    // Fetch trang tìm đối thủ
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_TimDuocDoiThu"), (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPageData(doc.data() as any);
            });
        }, (error) => console.log("Lỗi khi lấy dữ liệu trang:", error));

        return () => unsubscribe();
    }, []);

    // Lấy tên người dùng
    useEffect(() => {
        if (!user?.uid) return;
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            setUserName(docSnap.exists() ? docSnap.data().username : "Anonymous");
        }, (error) => console.log("Lỗi khi lấy dữ liệu người dùng:", error));

        return () => unsubscribe();
    }, [user]);

    // Đếm ngược thời gian và kiểm tra trạng thái đối thủ
    useEffect(() => {
        if (timeElapsed <= 0) return;

        const timer = setInterval(() => setTimeElapsed((prev) => prev - 1), 1000);

        return () => clearInterval(timer);
    }, [timeElapsed]);

    useEffect(() => {
        const playersRef = collection(db, "players");

        const unsubscribe = onSnapshot(playersRef, (snapshot) => {
            let readyCount = 0;
            let canceled = false;

            snapshot.forEach((doc) => {
                const data = doc.data();
                if (data.isReady) readyCount++;
                if (data.isCanceled) canceled = true;
            });

            //Nếu có nguời hủy trận thông báo và rời trận
            if (canceled && !alertShownRef.current) {
                alertShownRef.current = true;
                unsubscribe();
                Alert.alert("Thông báo", "Trận đấu đã bị hủy, quay lại tìm trận khác", [
                    { text: "OK", onPress: () => navigation.navigate("ThanhLiXi") }
                ]);
                return;
            }

            //Vào trận khi cả 2 sẵn sàng
            if (readyCount === 2 && !bothPlayersReady) {
                setBothPlayersReady(true);
                unsubscribe(); 
                navigation.navigate("CauDo");
            }

           //Hủy trận khi 1 trong 2 chưa sẵn sàng
            if (timeElapsed <= 0) {
                unsubscribe();
                if (readyCount < 2 && !alertShownRef.current) {
                    alertShownRef.current = true;
                    Alert.alert("Thông báo", "Trận đấu đã bị hủy, quay lại tìm trận khác", [
                        { text: "OK", onPress: () => navigation.navigate("ThanhLiXi") }
                    ]);
                }
            }
        });

        return () => unsubscribe();
    }, [navigation, timeElapsed, bothPlayersReady]);
    
    

    return (
        <ExpoImage source={{ uri: pageData?.imgbg }} style={styles.banner} contentFit="cover">
            <Header title='Thánh lì xì' color={{ color: '#FFE995' }} />
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Đáp nhanh tranh lì xì</Text>
                <Text style={styles.content}>Sẵn sàng chiến đấu!</Text>

                <View style={styles.avt1Container}>
                    <ExpoImage source={{ uri: pageData?.imgface1 }} style={styles.face} />
                    <Text style={styles.username}>{userName}</Text>
                </View>

                <View style={styles.avt2Container}>
                    <ExpoImage source={{ uri: pageData?.imgface2 }} style={styles.face} />
                    <Text style={styles.username2}>{opponentName}</Text>
                </View>

                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{formatTime(timeElapsed)}</Text>
                </View>

                {isReady && !opponentReady && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#FFF" />
                        <Text style={styles.loadingText}>Chờ đối thủ...</Text>
                    </View>
                )}

                <View style={styles.button}>
                    <ButtonComponent title='Chơi' onPress={buttonChoi} />
                    <ButtonComponent title='Hủy' buttonStyle={{ backgroundColor: '#faecb6' }} onPress={buttonHuy} />
                </View>
            </SafeAreaView>
        </ExpoImage>
    );
};

export default Page_TimDuocDoiThu;
