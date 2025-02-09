import React, { FC, useEffect, useState } from "react";
import { View, Image, } from "react-native";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "../../firebase/firebaseConfig";
import ButtonComponent from "./ButtonCompont";
import { useRouter } from "expo-router";
import { styles } from './stylesComponent/PopupStyles';
interface Page_Popup {
    img: string;
}

const db = getFirestore(app);

const PopupXinChao: FC = () => {
    const [page_Popup, setPage_Popup] = useState<Page_Popup | null>(null);
    const router = useRouter();

    const goNext = () => {
        router.push('/screens/HuongDan');
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "PopUp"),
            (querySnapshot) => {
                if (querySnapshot.empty) {
                    console.log("No documents found in 'PopUp' collection.");
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    setPage_Popup({ img: data.img });
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
                <Image source={{ uri: page_Popup?.img }} style={styles.img} />
                <ButtonComponent
                    title="Tôi vẫn khỏe"
                    onPress={goNext}
                    buttonStyle={styles.button}
                />
            </View>
        </View>
    );
};

export default PopupXinChao;
