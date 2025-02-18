import React, { useEffect, useState } from 'react';
import  styles  from "./styles/ThanhLiXiStyle";
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import ButtonComponent from '../components/ButtonCompont'
import { SafeAreaView } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { useNavigation } from 'expo-router';

interface Page_ThanhLiXi {
    imgbanner: string
    minibanner: string
    title: string
    mission: string
}
type RootStackParamList = {
    ThanhLiXi : undefined;
    Wating: undefined; 
  };
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ThanhLiXi'>;
const db = getFirestore(app)
const Page_ThanhLiXi: React.FC = () => {
    const [page_thanhlixi, setPageThanhLiXi] = useState<Page_ThanhLiXi | null>(null)
    const navigation = useNavigation<NavigationProp>()
    const goToTimDoiThu  = () => {
        navigation.navigate('Wating')
    }
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_DapNhanhTranhLiXi"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_DapNhanhTranhLiXi' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageThanhLiXi({
                    imgbanner: data.imgbanner,
                    minibanner: data.minibanner,
                    title: data.title,
                    mission: data.mission
                });
            });
        },
            (error) => {
                console.log("Error fetching document:", error);
            });
        return () => unsubscribe();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Header
                title='Thánh lì xì'
                color={{ color: '#FFF9D1' }}
            />
            {/* Content */}
            <ImageBackground
                source={{ uri: page_thanhlixi?.imgbanner }}
                style={styles.contentContainer}
                resizeMode='cover'
            >
                <Text
                    style={styles.title}
                >{page_thanhlixi?.title}</Text>
                {/* Nhiem vu */}
                <View
                    style={styles.missionContainer}
                >
                    <Text
                        style={styles.txtNhiemVu}
                    >Nhiệm vụ</Text>
                    <Text
                        style={styles.txtMission}
                    >{page_thanhlixi?.mission}</Text>
                </View>
                {/* Mini banner */}
                <Image source={{ uri: page_thanhlixi?.minibanner }}
                    style={styles.minibanner}
                />
                {/* Tim doi thu */}
                <ButtonComponent
                    title='Tìm đối thủ'
                    onPress={goToTimDoiThu}
                />
                {/* Note */}
                <View style={styles.noteContainer}>
                    <Text style ={styles.txtNote}>Lưu ý: Người chơi chiến thắng sẽ nhận được <Text style ={styles.highLight}>+1 lì xì</Text>
                        . Mỗi người chơi chỉ nhận được <Text style = {styles.highLight}>1 lượt chơi 1 ngày</Text></Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Page_ThanhLiXi