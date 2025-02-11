import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { styles } from './styles/KhoLocStyle'
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
interface Page_KhoLoc {
    imgBackGround: string
    imgFrame: string
    title: string
    logo: string
}
interface Gift {
    kho_loc_id: string;
    name: string;
    imgQua: string;
}
const db = getFirestore(app);
const Page_KhoLoc: React.FC = () => {
    // load firebase
    const [page_KhoLoc, setPage_KhoLoc] = useState<Page_KhoLoc | null>(null);
    const { user } = useAuth();
    const [userGifts, setUserGifts] = useState<Gift[]>([])
    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "KhoLoc"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No documents found in 'KhoLoc' collection.");
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPage_KhoLoc({
                        imgBackGround: data.imgBackGround,
                        imgFrame: data.imgFrame,
                        title: data.title,
                        logo: data.logo

                    });
                });
            },
            (error) => {
                console.log("Error fetching document:", error);
            }
        );
        return () => unsubscribe();
    }, []);
    //load kho lộc của user
    useEffect(() => {
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setUserGifts(data.khoLoc || []);
            }
        });

        return () => unsubscribe();
    }, [user]);
    return (
        <ImageBackground
            source={{ uri: page_KhoLoc?.imgBackGround }}
            resizeMode='cover'
            style={styles.imgBackGround}
        >
            <SafeAreaView style={styles.container}>
                {/* Title */}
                <Text style={styles.title}>{page_KhoLoc?.title}</Text>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Image source={{ uri: page_KhoLoc?.logo }}
                        style={styles.logo}
                    ></Image>
                </View>
                {/* Frame */}
                <ImageBackground
                    source={{ uri: page_KhoLoc?.imgFrame }}
                    resizeMode='cover'
                    style={styles.frame}
                >
                    <FlatList
                        data={userGifts}
                        keyExtractor={(item) => item.kho_loc_id}
                        numColumns={3}
                        contentContainerStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            flexGrow: 1,
                        }}
                        columnWrapperStyle={{ gap: 10 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.giftContainer}>
                                <ImageBackground
                                    source={require('../../assets/images/quabg.png')}
                                    style={styles.quabg}
                                >
                                    <Image source={{ uri: item.imgQua }} style={styles.giftImage} />
                                    <View style={styles.giftInfo}>
                                        <Text style={styles.giftName}>{item.name}</Text>
                                    </View>
                                </ImageBackground>
                            </View>

                        )}
                    />
                </ImageBackground>
            </SafeAreaView>
        </ImageBackground>

    )
}

export default Page_KhoLoc