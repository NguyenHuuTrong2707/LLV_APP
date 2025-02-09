import React, { useEffect, useState } from 'react';
import { styles } from '../screens/styles/BanKetStyle';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';


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
    const isInsideNavContainer = false;
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
                        <Image source={{ uri: page_BanKet?.imgVong1 }}
                            style={styles.imgVong1}
                        />
                        <Text
                            style={styles.txtVong}
                        >
                            {page_BanKet?.contentVong1}
                        </Text>
                    </View>
                    {/* Vong 2 */}
                    <View style={styles.vong2Container}>
                        <Image source={{ uri: page_BanKet?.imgVong2 }}
                            style={styles.imgVong2}
                        />
                        <Text
                            style={styles.txtVong}
                        >
                            {page_BanKet?.contentVong2}
                        </Text>
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
                </ImageBackground>
            </SafeAreaView>
        </ImageBackground>

    )
}
export default Page_BanKet