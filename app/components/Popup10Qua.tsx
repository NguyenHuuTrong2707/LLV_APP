import React, { FC, useEffect, useState } from "react";
import { View, Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { styles } from './stylesComponent/Popup10QuaStyle';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonComponent from "./ButtonCompont";
interface Page_PopUp10Qua {
    imgbg10qua: string,
    title10qua: string
    content10qua: string
}

interface GiftItem {
    name: string;
    imgUrl: string;
    giftcode: string;
}

interface PopUp10Qua_Props {
    gifts: GiftItem[];
    onClose: () => void;
    onConfirm : () => void;
}

const db = getFirestore(app);

const PopUpNhanQua: React.FC<PopUp10Qua_Props> = ({ gifts, onClose, onConfirm }) => {
    const [page_Popup10Qua, setPage_Popup10Qua] = useState<Page_PopUp10Qua | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "PopUpNhanThuong"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No documents found in 'PopUpNhanThuong' collection.");
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPage_Popup10Qua({
                        imgbg10qua: data.imgbg10qua,
                        title10qua: data.title10qua,
                        content10qua: data.content10qua
                    });
                });
            },
            (error) => {
                console.log("Error fetching document:", error);
            }
        );
        return () => unsubscribe();
    }, []);

    // Xử lý chuyển trang quà
    const handleNextGift = () => {
        if (currentIndex < gifts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePreviousGift = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Image source={require('../../assets/images/closepopup.png')} style={styles.close} />
                </TouchableOpacity>

                <ImageBackground source={{ uri: page_Popup10Qua?.imgbg10qua }} style={styles.img}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{page_Popup10Qua?.title10qua}</Text>
                        <Text style={styles.titleContent}>{gifts[currentIndex]?.name || ""}</Text>
                        <Text style={styles.titleContent}>1 Mã số may mắn</Text>
                        {/* Hiển thị quà hiện tại */}
                        <View style={styles.imgQuaContainer}>
                            <Image source={{ uri: gifts[currentIndex].imgUrl }} style={styles.imgQua} />
                            <ImageBackground source={require('../../assets/images/ticker.png')} style={styles.imgGiftCode}>
                                <Text style={styles.giftcode}>{gifts[currentIndex].giftcode}</Text>
                            </ImageBackground>
                        </View>
                        {/* Nút chuyển quà */}
                        <View style={styles.paginationContainer}>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={handlePreviousGift}
                                disabled={currentIndex === 0}
                            >
                                <LinearGradient
                                    colors={currentIndex === 0 ? ['#BEBEBE', '#8A8A8A'] : ['#FEFF0B', '#FFDF00']}
                                    style={styles.buttonPagi}
                                >
                                    <Text
                                        style={[
                                            styles.pageButtonText,
                                            currentIndex === 0 && styles.textDisabled,
                                        ]}
                                    >
                                        {"<"}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <Text style={styles.pageIndicator}>{`${currentIndex + 1}/${gifts.length}`}</Text>

                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={handleNextGift}
                                disabled={currentIndex === gifts.length - 1}
                            >
                                <LinearGradient
                                    colors={currentIndex === gifts.length - 1 ? ['#BEBEBE', '#8A8A8A'] : ['#FEFF0B', '#FFDF00']}
                                    style={styles.buttonPagi}
                                >
                                    <Text
                                        style={[
                                            styles.pageButtonText,
                                            currentIndex === gifts.length - 1 && styles.textDisabled,
                                        ]}
                                    >
                                        {">"}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.footerContainer}>
                            <Text style={styles.content}>{page_Popup10Qua?.content10qua}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ButtonComponent title="Chia sẻ" onPress={() => { }} />
            <ButtonComponent title="Đã nhận" onPress={onConfirm} disabled={currentIndex !== gifts.length - 1} />
        </View>
    );
};

export default PopUpNhanQua;
