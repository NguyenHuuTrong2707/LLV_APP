import React, { useEffect, useState } from 'react';
import styles from "./styles/HuongDanStyle";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Text, View } from 'react-native';
import { Image, ImageBackground as ExpoImage } from "expo-image";
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
        route.push('/home')
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

        <ExpoImage
            source={{
                uri: page_huongDan?.imgbanner,
            }}
            style={styles.banner}
            contentFit="cover"
            cachePolicy="memory-disk"
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
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        style={styles.img1}
                    />
                </View>
                {/* Content */}
                <ExpoImage
                    source={{ uri: page_huongDan?.img2 }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    style={styles.img2}
                >
                    {/* Content */}
                    <View style={styles.content}>
                        <Text style={styles.textContent}>
                            {page_huongDan?.content}
                        </Text>
                    </View>
                </ExpoImage>
                {/* Button */}
                <ButtonComponent
                    title='Tham gia ngay'
                    onPress={goNext}
                />
            </SafeAreaView>
        </ExpoImage>
    )
}

export default Page_HuongDan