import React, { useEffect, useState } from 'react';
import  styles  from "./styles/Vong1Style";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
interface Page_Vong1 {
    imgbg: string
}
type RootStackParamList = {
    Vong1: undefined; 
    ThanhLiXi : undefined;
  };
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vong1'>;
const db = getFirestore(app)
const Page_Vong1: React.FC = () => {
    const [page_vong1, setPageVong1] = useState<Page_Vong1 | null>(null)
    const navigation = useNavigation<NavigationProp>()
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
    return (

        <ImageBackground
            source={{ uri: page_vong1?.imgbg }}
            style={styles.banner}
            resizeMode='cover'
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
                    >Bạn đang có 11 lì xì </Text>
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
        </ImageBackground>
    )
}

export default Page_Vong1