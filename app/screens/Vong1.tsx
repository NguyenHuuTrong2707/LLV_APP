import React, { useEffect, useState } from 'react';
import styles from "./styles/Vong1Style";
import { collection, doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
interface Page_Vong1 {
    imgbg: string
}
type RootStackParamList = {
    Vong1: undefined;
    ThanhLiXi: undefined;
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vong1'>;
const db = getFirestore(app)
const Page_Vong1: React.FC = () => {
    const [page_vong1, setPageVong1] = useState<Page_Vong1 | null>(null)
    const navigation = useNavigation<NavigationProp>()
    const [totalLixi , setTotalLiXi] = useState<number>(0)
    const {user} = useAuth()
    const goToThanhLiXi = () => {
        navigation.navigate('ThanhLiXi')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_Vong1"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_Vong1' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageVong1({
                    imgbg: data.imgbg,

                });
            });
        },
            (error) => {
                console.log("Error fetching document:", error);
            });
        return () => unsubscribe();
    }, []);
    //lay total li xi
    useEffect(() => {
        // Lấy totalLixi từ Firestore
        const fetchTotalLixi = async () => {
            if (!user?.uid) return;
            try {
                const playerRef = doc(db, "users", user.uid);
                const playerSnap = await getDoc(playerRef);

                if (playerSnap.exists()) {
                    const data = playerSnap.data();
                    setTotalLiXi(data.totalLixi ?? 0);
                } else {
                    console.log("Người chơi không tồn tại");
                    setTotalLiXi(0);
                }
            } catch (error) {
                console.error("Lỗi khi lấy totalLixi:", error);
            }
        };

        fetchTotalLixi();
    }, [user]);
    return (

        <ExpoImage
            source={{ uri: page_vong1?.imgbg }}
            style={styles.banner}
            contentFit="cover"
            cachePolicy="memory-disk"
        >
            {/* Thành phần bên trong */}
            <SafeAreaView style={styles.container}>
                <Header
                />
                {/* Content */}
                <View
                    style={styles.contentContainer}
                >
                    <Text
                        style={styles.txtContent}
                    >Bạn đang có <Text style ={styles.totalLixi}>{totalLixi}</Text> lì xì </Text>
                    <ButtonComponent
                        title='Thánh lì xì'
                        onPress={goToThanhLiXi}
                    />
                    <ButtonComponent
                        title='Siêu thị phụ kiện'
                        onPress={() => { }}
                    />
                </View>
            </SafeAreaView>
        </ExpoImage>
    )
}

export default Page_Vong1