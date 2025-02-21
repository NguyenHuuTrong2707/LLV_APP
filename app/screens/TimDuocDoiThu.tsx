import React, { useEffect, useState } from 'react';
import styles from "./styles/TimDuocDoiThuStyle";
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Text, View } from 'react-native';
import { Image, ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './utils/RootStack';
import { formatTime } from './utils/formatTime';
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
interface Page_TimDuocDoiThu {
    imgbg: string
    imgface1: string
    imgface2: string
}
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TimDuocDoiThu'>;
type TimDuocDoiThuRouteProp = RouteProp<RootStackParamList, "TimDuocDoiThu">;
const db = getFirestore(app)
const Page_TimDuocDoiThu: React.FC = () => {
    const [page_timduocdoithu, setPageTimDuocDoiThu] = useState<Page_TimDuocDoiThu | null>(null)
    const { user } = useAuth();
    const [userName, setUserName] = useState<string>()
    const route = useRoute<TimDuocDoiThuRouteProp>();
    const { opponentName } = route.params;
    const [timeElapsed, setTimeElapsed] = useState(15);
    const navigation = useNavigation<NavigationProp>()
    const buttonHuy = () => {
        navigation.navigate('ThanhLiXi')
    }
    const buttonChoi = () => {
        navigation.navigate('CauDo')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_TimDuocDoiThu"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_TimDuocDoiThu' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageTimDuocDoiThu({
                    imgbg: data.imgbg,
                    imgface1: data.imgface1,
                    imgface2: data.imgface2

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
    //thoi gian vao tran
    useEffect(() => {
        if (timeElapsed > 0) {
            const timer = setInterval(() => {
                setTimeElapsed(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            navigation.navigate('CauDo')
        }
    }, [timeElapsed]);
    return (

        <ExpoImage
            source={{ uri: page_timduocdoithu?.imgbg }}
            style={styles.banner}
            contentFit="cover"
            cachePolicy="memory-disk"
        >
            <Header
                title='Thánh lì xì'
                color={{ color: '#FFE995' }}
            />
            {/* Content */}
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Đáp nhanh tranh lì xì</Text>
                <Text style={styles.content}>Sẵn sàng chiến đấu!</Text>
                {/* Avt */}
                {/* Avt 1 */}
                <View
                    style={styles.avt1Container}
                >
                    <ExpoImage source={{ uri: page_timduocdoithu?.imgface1 }}
                        style={styles.face}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    />
                    <Text
                        style={styles.username}
                    >{userName}</Text>
                </View>
                {/* Avt2 */}
                <View
                    style={styles.avt2Container}
                >
                    <ExpoImage source={{ uri: page_timduocdoithu?.imgface2 }}
                        style={styles.face}
                        contentFit="cover"
                        cachePolicy="memory-disk"
                    />
                    <Text
                        style={styles.username2}
                    >{opponentName}</Text>
                </View>
                {/* Time */}
                <View style={styles.timeContainer}>
                    <Text style={styles.time}>{formatTime(timeElapsed)}</Text>
                </View>
                {/* Button */}
                <View style={styles.button}>
                    <ButtonComponent
                        title='Chơi'
                        onPress={buttonChoi}
                    />
                    <ButtonComponent
                        title='Hủy'
                        buttonStyle={{ backgroundColor: '#faecb6' }}
                        onPress={buttonHuy}
                    />
                </View>
            </SafeAreaView>
        </ExpoImage>
    )
}

export default Page_TimDuocDoiThu
