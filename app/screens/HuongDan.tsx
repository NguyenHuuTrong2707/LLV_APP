import React, { useEffect, useState } from 'react';
import { styles } from "./styles/HuongDanStyle";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
interface Page_HuongDan {
    content: string
    imgbanner: string
    img1: string
    img2: string
}
const db = getFirestore(app)
const Page_HuongDan: React.FC = () => {
    const [page_huongDan, setPageHuongDan] = useState<Page_HuongDan | null>(null)
    const route = useRouter()
    const goNext = () => {
        route.push('/screens/BanKet')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_HuongDan"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_HuongDan' collection.");
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageHuongDan({
                    content: data.content,
                    imgbanner: data.imgbanner,
                    img1: data.img1,
                    img2: data.img2
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
            source={{ uri: page_huongDan?.imgbanner }}
            style={styles.banner}
            resizeMode='cover'
        >
            {/* Thành phần bên trong */}
            <SafeAreaView style={styles.container}>
                <Header
                    title='HƯỚNG DẪN'
                />
                {/* Image content */}
                <View style={styles.imgContainer}>
                    <Image
                        source={{ uri: page_huongDan?.img1 }}
                        resizeMode="cover"
                        style={styles.img1}
                    />
                </View>
                {/* Content */}
                <ImageBackground
                    source={{ uri: page_huongDan?.img2 }}
                    resizeMode="cover"
                    style={styles.img2}
                >
                    {/* Content */}
                    <View style={styles.content}>
                        <Text style={styles.textContent}>
                            {page_huongDan?.content}
                        </Text>
                    </View>
                </ImageBackground>
                {/* Button */}
                <ButtonComponent
                    title='Tham gia ngay'
                    onPress={goNext}
                />
            </SafeAreaView>
        </ImageBackground>
    )
}

export default Page_HuongDan