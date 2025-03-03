import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Image, ImageBackground as ExpoImage } from "expo-image";
import styles from './styles/KhoLocStyle'
import { collection, doc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from "@/contexts/AuthContext";
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
    giftcode: string,
    status: string
}
const db = getFirestore(app);
const Page_KhoLoc: React.FC = () => {
    // load firebase
    const [page_KhoLoc, setPage_KhoLoc] = useState<Page_KhoLoc | null>(null);
    const { user } = useAuth();
    const [userGifts, setUserGifts] = useState<Gift[]>([])
    const [selectedTab, setSelectedTab] = useState<string | null>('Lắc lộc vàng')
    const [tongQuaChuaNhan, setTongQuaChuaNhan] = useState(0);

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
                // tinh tong qua chua nhan
                let tinhTongQuaChuaNhan = 0
                // Nhóm phần quà theo id_qua và trạng thái
                const groupedGifts: { [key: string]: { danhan: Gift | null; chuanhan: Gift | null } } = {};
                const giftCodes: Gift[] = [];

                rawGifts.forEach((gift) => {
                    if (gift.giftcode) {
                        giftCodes.push(gift);
                    }

                    if (!groupedGifts[gift.id_qua]) {
                        groupedGifts[gift.id_qua] = { danhan: null, chuanhan: null };
                    }

                    if (gift.status === "Đã nhận") {
                        if (groupedGifts[gift.id_qua].danhan) {
                            groupedGifts[gift.id_qua].danhan!.quantity += 1;
                        } else {
                            groupedGifts[gift.id_qua].danhan = { ...gift, quantity: 1 };
                        }
                    } else {
                        tinhTongQuaChuaNhan += 1
                        if (groupedGifts[gift.id_qua].chuanhan) {
                            groupedGifts[gift.id_qua].chuanhan!.quantity += 1;
                        } else {
                            groupedGifts[gift.id_qua].chuanhan = { ...gift, quantity: 1 };
                        }
                    }
                });

                const processedGifts = Object.values(groupedGifts)
                    .flatMap(({ danhan, chuanhan }) => [chuanhan, danhan])
                    .filter((gift): gift is Gift => gift !== null);
                setUserGifts(selectedTab === 'Mã số may mắn' ? giftCodes : processedGifts);
                setTongQuaChuaNhan(tinhTongQuaChuaNhan)
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
    // thực hiện nhận quà
    const handleGiftPress = async (gift: Gift) => {
        if (gift.status === "Chưa nhận") {
            Alert.alert(
                "Xác nhận nhận quà",
                `Nhận "${gift.name}" vào túi ngay?`,
                [
                    {
                        text: "Hủy",
                        style: "cancel",
                    },
                    {
                        text: "OK",
                        onPress: async () => {
                            try {
                                const userRef = doc(db, "users", user?.uid);
                                await updateDoc(userRef, {
                                    khoLoc: userGifts.map((g) =>
                                        g.id_qua === gift.id_qua && g.status === "Chưa nhận"
                                            ? { ...g, status: "Đã nhận" }
                                            : g
                                    ),
                                });
                                console.log(`Cập nhật phần quà ${gift.name} thành "Đã nhận"`);
                            } catch (error) {
                                console.error("Lỗi khi cập nhật quà:", error);
                            }
                        },
                    },
                ]
            );
        }
    };
    return (
        <ExpoImage
            source={{ uri: page_KhoLoc?.imgBackGround }}
            contentFit="cover"
            cachePolicy="memory-disk"
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
                <ExpoImage
                    source={{ uri: page_KhoLoc?.imgFrame }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
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
                            <TouchableOpacity onPress={() => handleGiftPress(item)}>
                                {selectedTab === 'Mã số may mắn' ? (
                                    <View style={styles.giftContainer}>
                                        <ImageBackground
                                            source={require('../../assets/images/quabg.png')}
                                            style={styles.imgGiftContainer}
                                        >
                                            <ImageBackground source={require('../../assets/images/ticker.png')} style={styles.imgGiftCode}>
                                                <Text style={styles.giftcode}>{item.giftcode}</Text>
                                            </ImageBackground>
                                            <Text style={styles.count}>Trạng thái:</Text>
                                            <Text style={[styles.count, item.status === 'Đã nhận' ? styles.txtDaNhan : styles.txtChuaNhan]}>
                                                {item.status}
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
                                            <View style={styles.countContainer}>
                                                <Text style={styles.count}>Số lượng: {item.quantity}</Text>
                                            </View>
                                            <View style={styles.countContainer}>
                                                <Text style={styles.count}>Trạng thái:</Text>
                                                <Text style={[styles.count, item.status === 'Đã nhận' ? styles.txtDaNhan : styles.txtChuaNhan]}>
                                                    {item.status}
                                                </Text>
                                            </View>
                                        </ImageBackground>
                                    </View>
                                )}
                            </TouchableOpacity>
                        )}
                    />

                    {/* Tổng quà chưa nhận thưởng */}
                    {selectedTab === 'Lắc lộc vàng' && (
                        <Text style={styles.countGiftChuaNhan}>
                            Tổng số quà chưa nhận thưởng là: <Text style={{ color: '#c2030b', fontSize: 18 }}>{tongQuaChuaNhan}</Text>
                        </Text>
                    )}
                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>

    )
}

export default Page_KhoLoc