import React, { useEffect, useState } from 'react';
import { styles } from "./styles/BanKetStyle";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
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
                    contentGiaiBa: data.contentGiaBa,
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
        <ImageBackground
            source={{ uri: page_BanKet?.imgBackGround }}
            resizeMode='cover'
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
                <ImageBackground
                    source={{ uri: page_BanKet?.imgBanner }}
                    style={styles.bannerContainer}
                    resizeMode='cover'
                >
                    {/* image giải nhì */}
                    <Image source={{ uri: page_BanKet?.imgGiaiNhi }}
                        style={styles.imgGiaiNhi}
                    />
                    {/* content giải nhì */}
                    <Text style = {styles.txtGiaiNhi}>
                        {page_BanKet?.contentGiaiNhi}
                        
                    </Text>
                </ImageBackground>
            </SafeAreaView>
        </ImageBackground>
    )
}
export default Page_BanKet