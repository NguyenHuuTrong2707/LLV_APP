import React, { useCallback, useEffect, useState } from 'react';
import styles from "./styles/CauDoStyle";
import { Alert, Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonCompont';
import Header from '../components/Header'
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { app } from '@/firebase/firebaseConfig';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, limit, onSnapshot, getFirestore, addDoc, orderBy, getDocs, doc, updateDoc, setDoc } from 'firebase/firestore';
const db = getFirestore(app)
const Page_CauDo: React.FC = () => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<{ cauhoi: string, cautraloi: string[], caudung: string }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex] || { cauhoi: "", cautraloi: [], caudung: "" };
    const [timeLeft, setTimeLeft] = useState(30);
    const [totalTime, setTotalTime] = useState<number>(0);
    const [iscomplete, setiscomplete] = useState<boolean>(false);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    //xac định số câu đúng
    const handleAnswer = (selectedAnswer: string) => {
        if (selectedAnswer === currentQuestion.caudung) {
            setCorrectAnswers(prev => prev + 1);
        }
        nextQuestion();
    };

    //lay cau hoi
    useEffect(() => {
        const questionsRef = collection(db, "Questions");
        const q = query(questionsRef, limit(5));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const fetchedQuestions = snapshot.docs.map(doc => doc.data()) as { cauhoi: string, cautraloi: string[], caudung: string }[];
                setQuestions(fetchedQuestions);
            } else {
                setQuestions([{ cauhoi: "Không tìm thấy câu hỏi!", cautraloi: [], caudung: '' }]);
            }
        }, (error) => {
            console.error("Lỗi khi tải câu hỏi:", error);
            setQuestions([{ cauhoi: "Lỗi khi tải câu hỏi.", cautraloi: [], caudung: '' }]);
        });
        return () => unsubscribe();
    }, []);
    //dem thoi gian
    useEffect(() => {
        if (timeLeft > 0 && !iscomplete) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !iscomplete) {
            nextQuestion();
        }
    }, [timeLeft, iscomplete]);

    // Chuyển sang câu hỏi tiếp theo
    const nextQuestion = async () => {
        const timeTaken = 30 - timeLeft;
        setTotalTime(prev => prev + timeTaken);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(30);
        } else {
            setiscomplete(true)
            await saveResult()
        }
    };
    const saveResult = async () => {
        if (user) {
            const userRef = doc(db, "players", user.uid);
            await setDoc(userRef, {
                totalTime,
                correctAnswers
            }, { merge: true }); 
                determineWinner();
        }
    };
    // Xác định người chiến thắng
    const determineWinner = async () => {
        const playersRef = collection(db, "players");
        const q = query(playersRef, orderBy("correctAnswers", "desc"), orderBy("totalTime", "asc"), limit(1));
        const snapshot = await getDocs(q);
    
        if (!snapshot.empty) {
            const winner = snapshot.docs[0].data();
            const winnerId = snapshot.docs[0].id;
    
            if (user?.uid === winnerId) {
                Alert.alert("🎉 Bạn đã thắng!", `Bạn có ${winner.correctAnswers} câu đúng, hoàn thành trong ${winner.totalTime} giây! 🏆`);
            } else {
                Alert.alert("😢 Bạn đã thua!", `Người thắng là ${winner.username} với ${winner.correctAnswers} câu đúng, hoàn thành trong ${winner.totalTime} giây.`);
            }
        }
    };
    
    return (
        <LinearGradient style={{ flex: 1 }}
            colors={['#DC1920', '#A60006']}>
            <Header
                title='Thánh lì xì'
                color={{ color: '#FFE995' }}
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.circle}>
                    <Text style={styles.time}>{timeLeft}</Text>
                </View>
                {/* Background câu hỏi */}
                <View style={styles.cauHoiContainer} >
                    {/* Thời gian */}
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        {/* Cau hoi */}
                        <Text
                            style={styles.title}
                        >Câu hỏi</Text>
                        <Text
                            style={styles.txtCauHoi}
                        >{currentQuestion.cauhoi}</Text>
                    </View>
                    {/* Dap an */}
                    <View style={styles.cautraloi}>
                        {currentQuestion.cautraloi.map((dapAnText, index) => (
                            <View key={index} style={styles.cautraloiWrap}>
                                <ButtonComponent
                                    title={dapAnText}
                                    onPress={() => {
                                        console.log(`Chọn: ${dapAnText}`);
                                        handleAnswer(dapAnText)
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}
export default Page_CauDo