import React, { FC, useEffect, useState } from "react";
import { View, Image, ImageBackground, Text } from "react-native";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import ButtonComponent from "./ButtonCompont";
import { useRouter } from "expo-router";
import styles  from './stylesComponent/PopupNhanQuaStyles';
import { TouchableOpacity } from "react-native";

interface Page_PopUpNhanQua {
    imgBackGround: string
    logo: string
}
interface PopUpNhanQua_Props {
    title1: string,
    imgQua1: string,
    giftcode: string,
    content: string,
    onClose : () => void,
    onConfirm : () => void
}
const db = getFirestore(app)
const PopUpNhanQua: React.FC<PopUpNhanQua_Props> = ({ title1, imgQua1, giftcode, content , onClose, onConfirm}) => {
    const [page_PopupNhanQua, setPage_PopupNhanQua] = useState<Page_PopUpNhanQua | null>(null);
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
                    setPage_PopupNhanQua({
                        imgBackGround: data.imgBackGround,
                        logo: data.logo,
                    });
                });
            },
            (error) => {
                console.log("Error fetching document:", error);
            }
        );
        return () => unsubscribe();
    }, []);
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                  <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Image source={require('../../assets/images/closepopup.png')} style={styles.close} />
                                </TouchableOpacity>
                <Image source={{ uri: page_PopupNhanQua?.logo }} style={styles.logo} />
                <ImageBackground source={{ uri: page_PopupNhanQua?.imgBackGround }} style={styles.img} >
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>{title1}</Text>
                        <Text style={styles.title}>1 Mã số may mắn</Text>
                        <View style={styles.imgQuaContainer}>
                            <Image source={{ uri: imgQua1 }} style={styles.imgQua}></Image>
                            <ImageBackground source={ require ('../../assets/images/ticker.png')} style={styles.imgGiftCode}>
                                <Text style = {styles.giftcode}>{giftcode}</Text>
                            </ImageBackground>
                        </View>
                        <View style={styles.footerContainer}>
                            <Text style={styles.content}>{content}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ButtonComponent title="Chia sẻ" onPress={() => { }} />
            <ButtonComponent title="Nhận lộc" onPress={onConfirm} />
        </View>
    );

};
export default PopUpNhanQua