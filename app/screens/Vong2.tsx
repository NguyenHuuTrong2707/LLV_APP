import React, { useEffect, useState } from 'react';
import styles from "./styles/Vong2Styles";
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
interface Page_Vong2 {
    imgBgVong2: string
}
type RootStackParamList = {
    Vong2: undefined;
    BanVit: { gameMode: string };
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vong2'>;
const db = getFirestore(app)
const Page_Vong2: React.FC = () => {
    const [page_vong2, setPageVong2] = useState<Page_Vong2 | null>(null)
    const navigation = useNavigation<NavigationProp>()
    const {user} = useAuth()
    const goToGameScreen = (mode: 'ThuTaiBanVit' | 'AnhKim' | 'AnhHung') => {
        navigation.navigate('BanVit', { gameMode: mode });
    };
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_Vong1"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_Vong1' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageVong2({
                    imgBgVong2: data.imgBgVong2,

                });
            });
        },
            (error) => {
                console.log("Error fetching document:", error);
            });
        return () => unsubscribe();
    }, []);

    return (

        <ExpoImage
            source={{ uri: page_vong2?.imgBgVong2 }}
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
                    <ButtonComponent
                        title='Thử tài bắn vít'
                        onPress={() => goToGameScreen('ThuTaiBanVit')}
                        buttonStyle = {{width: '110%'}}
                    />
                    <ButtonComponent
                        title='Anh hùng siêu bảo vệ'
                        onPress={() => {goToGameScreen('AnhHung') }}
                        buttonStyle = {{width: '110%'}}
                        contentTitle='Ra mắt ngày 08/11'
                    />
                    <ButtonComponent
                        title='Thánh ánh kim'
                        onPress={() => goToGameScreen('AnhKim')}
                        buttonStyle = {{width: '110%'}}
                        contentTitle='Ra mắt ngày 08/11'
                    />
                </View>
            </SafeAreaView>
        </ExpoImage>
    )
}

export default Page_Vong2