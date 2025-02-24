import React, { useEffect, useState } from 'react';
import styles from "./styles/WinnerStyle";
import { Text, View } from 'react-native';
import { Image, ImageBackground as ExpoImage } from "expo-image";
import ButtonComponent from '../components/ButtonCompont';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { collection, onSnapshot, getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { app } from '@/firebase/firebaseConfig';
import { RootStackParamList } from './utils/RootStack';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Page_Winner {
    bannerWinner: string
    logo: string
    content: string

}
const db = getFirestore(app);
type WinnerRouteProp = RouteProp<RootStackParamList, "Winner">;
const Page_Winner: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute<WinnerRouteProp>();
    const { correctAnswers } = route.params;
    const [page_winner, setPage_Winner] = useState<Page_Winner | null>(null);
    // nhận lộc
    const nhanLoc = async () => {
        if (!user.uid) return
        try {
            const playerRef = doc(db, 'users', user.uid)
            const playerSnap = await getDoc(playerRef)
            if (playerSnap.exists()) {
                const playerData = playerSnap.data()
                const currentLiXi = playerData.totalLixi ?? 0
                await updateDoc(playerRef, { totalLixi: currentLiXi + 1 })
                alert("Nhận lộc thành công!!");
            }
            else {
                console.log("Nguoi choi khong ton tai")
            }
        }
        catch (error) {
            console.log('Loi ', error)
        }
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "Page_Winner"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No documents found in 'Page_Winner' collection.");
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPage_Winner({
                        bannerWinner: data.bannerWinner,
                        logo: data.logo,
                        content: data.content
                    });
                });
            },
            (error) => {
                console.log("Error fetching document:", error);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <LinearGradient style={{ flex: 1 }} colors={['#DC1920', '#A60006']}>
            <Header title='Thánh lì xì' color={{ color: '#FFE995' }} />
            <SafeAreaView style={styles.container}>
                {/* Logo */}
                <View style={{ paddingVertical: 30 }}>
                    <ExpoImage
                        source={{ uri: page_winner?.logo }}
                        style={styles.logo}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    >
                    </ExpoImage>
                </View>
                {/* Banner */}
                <ExpoImage
                    source={{ uri: page_winner?.bannerWinner }}
                    style={styles.banner}
                >
                    {/* Title & Content */}
                    <View
                        style={styles.txtContainer}
                    >
                        <Text
                            style={styles.title}
                        >
                            Bạn đạt {correctAnswers}/5 câu đúng
                        </Text>
                        <Text
                            style={styles.content}
                        >
                            {page_winner?.content}
                        </Text>
                    </View>

                    {/* Button */}
                    <View style={{ marginBottom: 20 }}>
                        <ButtonComponent
                            title='Chia sẻ'
                            onPress={() => { }}
                        />
                        <ButtonComponent
                            title='Nhận lộc'
                            onPress={nhanLoc}
                        />
                    </View>
                </ExpoImage>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Page_Winner;
