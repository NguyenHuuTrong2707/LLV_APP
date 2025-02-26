import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from "./styles/ThuTaiBanVitStyle";
import { collection, getFirestore, onSnapshot, doc, setDoc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Alert, Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header';
import ButtonComponent from '../components/ButtonCompont';
import { SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useFocusEffect, useNavigation } from 'expo-router';
import { RootStackParamList } from './utils/RootStack';
import { useAuth } from '@/contexts/AuthContext';
import { findDoiThu } from './utils/findPlayer';
import { getUserLocation } from './utils/getLocation';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Page_ThuTaiBanVit {
    face1: string
    face2: string
    imgKhoan: string
    imgPlayer1: string
    imgPlayer2: string
    imgVs: string
    imgbanner: string,
    imgbg: string,
    khungTime: string
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BanVit'>;
type ThuTaiBanViRouteProp = RouteProp<RootStackParamList, "ThuTaiBanVit">;
const db = getFirestore(app);

const Page_ThuTaiBanVit: React.FC = () => {
    const [page_thutaibanvit, setPageThuTaiBanVit] = useState<Page_ThuTaiBanVit | null>(null);
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const route = useRoute<ThuTaiBanViRouteProp>();
    const { opponentName } = route.params;
    const [userName, setUserName] = useState<string>("Anonymous");
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    //xac dinh nguoi thang
    useEffect(() => {
        if (timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearTimeout(timerRef.current!);
            let winnerMessage = "Trận đấu hòa!";
            if (userScore > opponentScore) {
                winnerMessage = `🏆 Người chiến thắng: ${userName}`;
            } else if (userScore < opponentScore) {
                winnerMessage = `🏆 Người chiến thắng: ${opponentName}`;
            }
            
            Alert.alert("Kết thúc!", winnerMessage, [
                { text: "OK", onPress: () => navigation.navigate("BanVit") }
            ]);
        }
        return () => clearTimeout(timerRef.current!);
    }, [timeLeft]);
    
    useEffect(() => {
        if (!user?.uid) return;
        const userRef = doc(db, "users", user.uid);

        const unsubscribeUser = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                setUserName(docSnap.data().username || "Anonymous");
                setUserScore(docSnap.data().score || 0);
            }
        });
        return () => unsubscribeUser();
    }, [user]);

    useEffect(() => {
        if (!opponentName) return;
        const opponentQuery = query(collection(db, "users"), where("username", "==", opponentName));

        const unsubscribeOpponent = onSnapshot(opponentQuery, (querySnapshot) => {
            querySnapshot.forEach((docSnap) => {
                setOpponentScore(docSnap.data().score || 0);
            });
        });
        return () => unsubscribeOpponent();
    }, [opponentName]);

    const resetScores = async () => {
        if (user?.uid) await updateDoc(doc(db, "users", user.uid), { score: 0 });
        if (opponentName) {
            const opponentQuery = query(collection(db, "users"), where("username", "==", opponentName));
            const opponentSnapshot = await getDocs(opponentQuery);
            opponentSnapshot.forEach(async (docSnap) => {
                await updateDoc(doc(db, "users", docSnap.id), { score: 0 });
            });
        }
    };

    useEffect(() => { resetScores(); }, [user, opponentName]);

    const handleTapKhoan = async () => {
        if (!user?.uid) return;
        const userDocRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userDocRef, { score: userScore + 1 });
        } catch (error) {
            console.error("Lỗi khi cập nhật điểm số:", error);
        }
    };

    //lay ten nguoi choi
    useEffect(() => {
        if (!user?.uid) return;
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            setUserName(docSnap.exists() ? docSnap.data().username : "Anonymous");
        }, (error) => console.log("Lỗi khi lấy dữ liệu người dùng:", error));

        return () => unsubscribe();
    }, [user]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "GameBanVit"), (querySnapshot) => {
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPageThuTaiBanVit({
                        face1: data.face1,
                        face2: data.face2,
                        imgKhoan: data.imgKhoan,
                        imgPlayer1: data.imgPlayer1,
                        imgPlayer2: data.imgPlayer2,
                        imgVs: data.imgVs,
                        imgbanner: data.imgbanner,
                        imgbg: data.imgbg,
                        khungTime: data.khungTime
                    })
                });
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <ExpoImage
            source={{ uri: page_thutaibanvit?.imgbg }}
            style={styles.banner}
            contentFit="cover"
            cachePolicy="memory-disk"
        >
            <SafeAreaView style={styles.container}>
                <Header />
                {/* User */}
                <View
                    style={styles.containerThachDau}
                >
                    <View style={styles.user1Container}>
                        <ExpoImage
                            source={{ uri: page_thutaibanvit?.imgPlayer1 }}
                            style={styles.player}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        >
                            <ExpoImage
                                source={{ uri: page_thutaibanvit?.face1 }}
                                style={styles.face1}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                            >
                            </ExpoImage>
                            <View>
                                <Text
                                    style={styles.correctUser1}
                                >{userScore}</Text>
                            </View>
                        </ExpoImage>
                        {/* name */}
                        <Text style={styles.name}>{userName}</Text>
                    </View>

                    {/* vs */}
                    <ExpoImage
                        source={{ uri: page_thutaibanvit?.imgVs }}
                        style={styles.imgVs}
                    >
                    </ExpoImage>
                    <View style={styles.user1Container}>
                        <ExpoImage
                            source={{ uri: page_thutaibanvit?.imgPlayer2 }}
                            style={styles.player}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        >
                            <ExpoImage
                                source={{ uri: page_thutaibanvit?.face2 }}
                                style={styles.face2}
                                contentFit="cover"
                                cachePolicy="memory-disk"
                            >
                            </ExpoImage>
                            <View>
                                <Text
                                    style={styles.correctUser2}
                                >{opponentScore}</Text>
                            </View>
                        </ExpoImage>
                        <Text style={styles.name}>{opponentName}</Text>
                    </View>
                </View>
                {/* Title */}
                <Text style={styles.title}>THỬ TÀI BẮN VÍT</Text>
                {/* Banner Game */}
                <ExpoImage
                    source={{ uri: page_thutaibanvit?.imgbanner }}
                    style={styles.bannerGame}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                >
                    {/* Khung time */}
                    <ExpoImage
                        source={{ uri: page_thutaibanvit?.khungTime }}
                        style={styles.khungTime}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    >
                        <Text style={styles.time}>{`00:${timeLeft < 10 ? "0" : ""}${timeLeft}`}</Text>
                    </ExpoImage>
                    {/* Khoan */}
                    <ExpoImage
                        source={{ uri: page_thutaibanvit?.imgKhoan }}
                        style={styles.imgKhoan}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        onTouchEnd={handleTapKhoan}
                    >
                        <Text style={styles.time}>00:00</Text>
                    </ExpoImage>
                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>
    );
};

export default Page_ThuTaiBanVit;
