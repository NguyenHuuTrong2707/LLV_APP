import React, { useEffect, useState } from 'react';
import styles from "./styles/WaitingStyle";
import { collection, getFirestore, onSnapshot, doc } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Image, ImageBackground, Text, View } from 'react-native';
import Header from '../components/Header'
import { SafeAreaView } from 'react-native';
import { useAuth } from "@/contexts/AuthContext";

interface Page_Waiting {
    imgbg: string
    imgface1: string
    imgnote: string
    title: string
}
const db = getFirestore(app)
const Page_Waiting: React.FC = () => {
    const [page_waiting, setPageWating] = useState<Page_Waiting | null>(null)
    const { user } = useAuth();
    const [userName, setUserName] = useState<string>('Anonymous')
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Page_Waiting"), (querySnapshot) => {
            if (querySnapshot.empty) {
                console.log("No documents found in 'Page_Waiting' collection.");
                return;
            }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setPageWating({
                    imgbg: data.imgbg,
                    imgface1: data.imgface1,
                    imgnote: data.imgnote,
                    title: data.title
                });
            });
        },
            (error) => {
                console.log("Error fetching document:", error);
            });
        return () => unsubscribe();
    }, []);
    //lay ten nguoi dung
    useEffect(() => {
        if (user?.uid) {
            const userDocRef = doc(db, "users", user.uid);
            const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserName(docSnap.data().username || "Anonymous");
                } else {
                    console.log("No user document found!");
                    setUserName("Anonymous");
                }
            }, (error) => {
                console.log("Error fetching user data:", error);
                setUserName("Anonymous");
            });
    
            return () => unsubscribe();
        }
    }, [user]);
    
    return (
        <ImageBackground style={styles.imgbg}
            source={{ uri: page_waiting?.imgbg }}
            resizeMode='cover'
        >
            <SafeAreaView style={styles.container}>
                <Header
                />
                {/* Title */}
                <Text style={styles.title}>{page_waiting?.title}</Text>
                {/* Load  */}
                <Text style={styles.txtLoad}>Đang tìm đối thủ</Text>
                {/* Avatar */}
                <Image style={styles.avt}
                source={{uri : page_waiting?.imgface1}}
                resizeMode='cover'
                ></Image>
                {/* Ten user */}
                <Text style={styles.txtUserName}>{userName}</Text>
                {/* Thoi gian */}
                <Text style={styles.txtTime}>00:00</Text>
                {/* Note */}
                <Image 
                source={{uri : page_waiting?.imgnote}}
                style ={styles.note}
                resizeMode='cover'
                ></Image>
            </SafeAreaView>
        </ImageBackground>

    )
}

export default Page_Waiting