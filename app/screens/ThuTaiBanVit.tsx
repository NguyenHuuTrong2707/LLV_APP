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
    const [pageData, setPageData] = useState<any>(null);
    const navigation = useNavigation<NavigationProp>();
    const { user } = useAuth();
    const route = useRoute<ThuTaiBanViRouteProp>();
    const { opponentName, gameMode } = route.params;
    const [userName, setUserName] = useState<string>("Anonymous");
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [timeLeft, setTimeLeft] = useState(6000);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    //hiển thị hình ảnh khi nhấn vào máy khoan
    const banVitImages = [
        {
            id: 1,
            uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740747058/dinhvit_ceg78b.png",
            position: { top: -80, left: 80 },
            width: 81,
            height: 78
        },
        {
            id: 2,
            uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740747058/dinhvit1_lwio12.png",
            position: { top: -30, left: 50 },
            width: 63,
            height: 62
        },
        {
            id: 3,
            uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740747058/dinhvit2_jtzmsb.png",
            position: { top: -30, left: 200 },
            width: 66,
            height: 58
        },
    ];
    const anhKimImages = [
        { id: 1, uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740762328/anhkim_nfvjpc.png", position: { top: 150, left: 50 }, width: 84, height: 60 },
        { id: 2, uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740762328/anhkim1_jwebxs.png", position: { top: 250, left: 120 }, width: 69, height: 46 },
        { id: 3, uri: "https://res.cloudinary.com/dusseahzm/image/upload/v1740762327/anhkim2_hqchx8.png", position: { top: 150, left: 180 }, width: 70, height: 46 },
    ];
    const [images, setImages] = useState(banVitImages);
    //set trạng thai ảnh
    useEffect(() => {
        if (gameMode === 'AnhKim') {
            setImages(anhKimImages);
        } else {
            setImages(banVitImages);
        }
    }, [gameMode]);
    // Trạng thái kiểm soát hình nào đang hiển thị
    const [visibleImageId, setVisibleImageId] = useState<number | null>(null);
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
                { text: "OK", onPress: () => navigation.navigate("BanVit", { gameMode: 'ThuTaiBanVit | AnhKim' }) }
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

    const handleTapScreen = async () => {
        if (!user?.uid) return;
        const userDocRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userDocRef, { score: userScore + 1 });
            const randomIndex = Math.floor(Math.random() * images.length);
            setVisibleImageId(images[randomIndex].id);
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
        const unsubscribe = onSnapshot(collection(db, `Game${gameMode}`), (snapshot) => {
            if (!snapshot.empty) {
                setPageData(snapshot.docs[0].data());
            } else {
                console.log(`Không có dữ liệu trong collection Game${gameMode}`);
            }
        });
    })
    return (
        <ExpoImage
            source={{ uri: pageData?.imgbg }}
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
                            source={{ uri: pageData?.imgPlayer1 }}
                            style={styles.player}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        >
                            <ExpoImage
                                source={{ uri: pageData?.face1 }}
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
                        source={{ uri: pageData?.imgVs }}
                        style={styles.imgVs}
                    >
                    </ExpoImage>
                    <View style={styles.user1Container}>
                        <ExpoImage
                            source={{ uri: pageData?.imgPlayer2 }}
                            style={styles.player}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                        >
                            <ExpoImage
                                source={{ uri: pageData?.face2 }}
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
                    source={{ uri: pageData?.imgbanner }}
                    style={styles.bannerGame}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    onTouchEnd={handleTapScreen}
                >
                    {/* Khung time */}
                    <ExpoImage
                        source={{ uri: pageData?.khungTime }}
                        style={styles.khungTime}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    >
                        <Text style={styles.time}>{`00:${timeLeft < 10 ? "0" : ""}${timeLeft}`}</Text>
                    </ExpoImage>
                    {/* Khoan */}
                    <ExpoImage
                        source={{ uri: pageData?.imgKhoan }}
                        style={styles.imgKhoan}
                        contentFit="cover"
                        cachePolicy="memory-disk"

                    >
                        {images.map((image) =>
                            visibleImageId === image.id ? (
                                <ExpoImage
                                    key={image.id}
                                    source={{ uri: image.uri }}
                                    style={[
                                        styles.fixedImage,
                                        image.position,
                                        { width: image.width, height: image.height }
                                    ]}
                                    contentFit="cover"
                                    cachePolicy="memory-disk"
                                />
                            ) : null
                        )}
                    </ExpoImage>
                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>
    );
};

export default Page_ThuTaiBanVit;
