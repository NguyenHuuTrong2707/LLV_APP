import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles/KhoLocStyle'
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";
import { ScrollView } from 'react-native';
interface Page_KhoLoc {
    imgBackGround: string
    imgFrame: string
    title: string
    logo: string
}
interface Gift {
    id_qua: string
    kho_loc_id: string
    name: string
    imgQua: string
    quantity: number
    type?: string
    giftcode: string
}
const db = getFirestore(app);
const Page_KhoLoc: React.FC = () => {
    // load firebase
    const [page_KhoLoc, setPage_KhoLoc] = useState<Page_KhoLoc | null>(null);
    const { user } = useAuth();
    const [userGifts, setUserGifts] = useState<Gift[]>([])
    const [selectedTab, setSelectedTab] = useState<string | null>('Lắc lộc vàng')

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
                const rawGifts: Gift[] = data.khoLoc || [];

                // Nhóm phần quà
                const groupedGifts: { [key: string]: Gift & { quantity: number } } = {};
                const giftCodes: Gift[] = [];

                rawGifts.forEach((gift) => {
                    if (gift.giftcode) {
                        giftCodes.push(gift);
                    }

                    if (groupedGifts[gift.id_qua]) {
                        groupedGifts[gift.id_qua].quantity += 1;
                    } else {
                        groupedGifts[gift.id_qua] = { ...gift, quantity: 1 };
                    }
                });

                // Cập nhật state
                setUserGifts(selectedTab === 'Mã số may mắn' ? giftCodes : Object.values(groupedGifts));
            }
        });

        return () => unsubscribe();
    }, [user, selectedTab]);
    // lọc dữ liệu theo danh mục
    const filteredData = userGifts.filter((gift) => {
        if (selectedTab === 'Lắc lộc vàng') return true; // Hiển thị tất cả
        if (selectedTab === 'Lì xì vàng') return gift.type === 'Lì xì vàng';
        if (selectedTab === 'Mã số may mắn') return !!gift.giftcode;
        return true;
    });
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
                {/* Phân loại phần thưởng */}
                <View style={styles.phanloaiContainer}>
                    {['Lắc lộc vàng', 'Lì xì vàng', 'Mã số may mắn'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.navContainer, selectedTab === tab && { backgroundColor: 'red' }]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[styles.txtLLV, selectedTab === tab && { color: '#FFF' }]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                {/* Frame */}
                <ImageBackground
                    source={{ uri: page_KhoLoc?.imgFrame }}
                    resizeMode='cover'
                    style={styles.frame}
                >
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.kho_loc_id}
                        numColumns={3}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            flexGrow: 1,
                        }}
                        columnWrapperStyle={{ gap: 10 }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            selectedTab === 'Mã số may mắn' ? (
                                <View style={styles.giftContainer}>
                                    <ImageBackground
                                        source={require('../../assets/images/quabg.png')}
                                        style={styles.imgGiftContainer}
                                    >
                                        <ImageBackground source={require('../../assets/images/ticker.png')} style={styles.imgGiftCode}>
                                            <Text style={styles.giftcode}>{item.giftcode}</Text>
                                        </ImageBackground>
                                        <Text style={styles.count}>
                                            Trạng thái:
                                        </Text>
                                    </ImageBackground>
                                </View>
                            ) : (
                                <View style={styles.giftContainer}>
                                    <ImageBackground
                                        source={require('../../assets/images/quabg.png')}
                                        style={styles.quabg}
                                    >
                                        <Image source={{ uri: item.imgQua }} style={styles.giftImage} />
                                        <View style={styles.giftInfo}>
                                            <Text style={styles.giftName}>{item.name}</Text>
                                        </View>
                                        {/* Số lượng */}
                                        <View style={styles.countContainer} >
                                            <Text style={styles.count}>
                                                Số lượng: {item.quantity}
                                            </Text>
                                        </View>
                                        {/* Trạng thái */}
                                        <View style={styles.countContainer} >
                                            <Text style={styles.count}>
                                                Trạng thái:
                                            </Text>
                                        </View>
                                    </ImageBackground>
                                </View>
                            )
                        )}
                    />
                </ImageBackground>
            </SafeAreaView>
        </ImageBackground>

    )
}

export default Page_KhoLoc