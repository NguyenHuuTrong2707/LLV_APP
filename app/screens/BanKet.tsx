import React, { useEffect, useState } from 'react'
import styles from '../screens/styles/BanKetStyle'
import { collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { app } from '../../firebase/firebaseConfig';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import { Image, ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header'
import { SafeAreaView } from 'react-native'
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
//Khai bao kieu cho navigation
type RootStackParamList = {
    BanKetScreen: undefined;
    Vong1: undefined;
    Vong2: undefined
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'BanKetScreen'>;
interface Page_BanKet {
    contentChungKet: string
    contentGiaiBa: string
    contentGiaiNhat: string
    contentGiaiNhi: string
    contentVong1: string
    contentVong2: string
    imgBackGround: string
    imgBanner: string
    imgGiaiBa: string
    imgGiaiNhat: string
    imgGiaiNhi: string
    imgVong1: string
    imgVong2: string
    imgVongChungKet: string
}
const db = getFirestore(app)
const Page_BanKet: React.FC = () => {
    const [page_BanKet, setPage_BanKet] = useState<Page_BanKet | null>(null)
    const navigation = useNavigation<NavigationProp>();
    //    Chuyển sang vòng 1 
    const goToVong1 = () => {
        navigation.navigate("Vong1");
    };
    //chuyen sang vong 2
    const goToVong2 = () => {
        navigation.navigate('Vong2')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_BanKet"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_BanKet' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPage_BanKet({
                    contentChungKet: data.contentChungKet,
                    contentGiaiBa: data.contentGiaiBa,
                    contentGiaiNhat: data.contentGiaiNhat,
                    contentGiaiNhi: data.contentGiaiNhi,
                    contentVong1: data.contentVong1,
                    contentVong2: data.contentVong2,
                    imgBackGround: data.imgBackGround,
                    imgBanner: data.imgBanner,
                    imgGiaiBa: data.imgGiaiBa,
                    imgGiaiNhat: data.imgGiaiNhat,
                    imgGiaiNhi: data.imgGiaiNhi,
                    imgVong1: data.imgVong1,
                    imgVong2: data.imgVong2,
                    imgVongChungKet: data.imgVongChungKet
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
            source={{ uri: page_BanKet?.imgBackGround }}
            contentFit="cover"
            cachePolicy="memory-disk"
            style={styles.background}
        >
            <SafeAreaView
                style={styles.container}
            >
                <Header
                    title='ĐẠI HỘI TRANH TÀI'
                    imageHelp={require('../../assets/images/buttonHelp.png')}
                />
                {/* Banner */}
                <ExpoImage
                    source={{ uri: page_BanKet?.imgBanner }}
                    style={styles.bannerContainer}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                >
                    {/* Title */}
                    <Text style={styles.title}>GIÁ TRỊ GIẢI THƯỞNG KỲ CHUNG KẾT</Text>
                    {/* Giai nhi */}
                    <Text style={styles.titleGiaiNhi}>
                        01 Giải Nhì
                    </Text>
                    <Image source={{ uri: page_BanKet?.imgGiaiNhi }}
                        style={styles.imgGiaiNhi}
                    />
                    <Text style={styles.txtGiaiNhi}>
                        {page_BanKet?.contentGiaiNhi}
                    </Text>
                    {/* Giải nhất */}
                    <Text style={styles.titleGiaiNhat}>
                        01 Giải Nhất
                    </Text>
                    <Image source={{ uri: page_BanKet?.imgGiaiNhat }}
                        style={styles.imgGiaiNhat}
                    />
                    <Text style={styles.txtGiaiNhat}>
                        {page_BanKet?.contentGiaiNhat}
                    </Text>
                    {/* Giải ba  */}
                    <Text style={styles.titleGiaiBa}>
                        01 Giải Ba
                    </Text>
                    <Image source={{ uri: page_BanKet?.imgGiaiBa }}
                        style={styles.imgGiaiBa}
                    />
                    <Text style={styles.txtGiaiBa}>
                        {page_BanKet?.contentGiaiBa}
                    </Text>
                    {/* Vong 1 */}
                    <View style={styles.vong1Container}>
                        <TouchableOpacity
                            onPress={goToVong1}
                        >
                            <Image source={{ uri: page_BanKet?.imgVong1 }}
                                style={styles.imgVong1}
                            />
                            <Text
                                style={styles.txtVong}
                            >
                                {page_BanKet?.contentVong1}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Vong 2 */}
                    <View style={styles.vong2Container}>
                        <TouchableOpacity
                            onPress={goToVong2}
                        >
                            <Image source={{ uri: page_BanKet?.imgVong2 }}
                                style={styles.imgVong2}
                            />
                            <Text
                                style={styles.txtVong}
                            >
                                {page_BanKet?.contentVong2}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Chung ket */}
                    <View style={styles.chungKetContainer}>
                        <Image source={{ uri: page_BanKet?.imgVongChungKet }}
                            style={styles.imgChungKet}
                        />
                        <Text
                            style={styles.txtChungKet}
                        >
                            {page_BanKet?.contentChungKet}
                        </Text>
                    </View>
                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>

    )
}
export default Page_BanKet