import React, { useEffect, useState } from 'react';
import styles from "./styles/CauDoStyle";
import { Text, View } from 'react-native';
import ButtonComponent from '../components/ButtonCompont';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, limit, onSnapshot, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase/firebaseConfig';
import { saveResult, listenForOpponentFinish, determineWinner } from './utils/gameLogic';

const db = getFirestore(app);

const Page_CauDo: React.FC = () => {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<{ cauhoi: string, cautraloi: string[], caudung: string }[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [totalTime, setTotalTime] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const currentQuestion = questions[currentQuestionIndex] || { cauhoi: "", cautraloi: [], caudung: "" };

    useEffect(() => {
        const q = query(collection(db, "Questions"), limit(5));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                setQuestions(snapshot.docs.map(doc => doc.data()) as { cauhoi: string, cautraloi: string[], caudung: string }[]);
            } else {
                setQuestions([{ cauhoi: "Không tìm thấy câu hỏi!", cautraloi: [], caudung: '' }]);
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !isComplete) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && !isComplete) {
            nextQuestion(correctAnswers);
        }
    }, [timeLeft, isComplete]);

    const handleAnswer = (selectedAnswer: string) => {
        let updatedCorrectAnswers = correctAnswers;
        if (selectedAnswer === currentQuestion.caudung) {
            updatedCorrectAnswers += 1;
            setCorrectAnswers(updatedCorrectAnswers);
        }
        nextQuestion(updatedCorrectAnswers);
    };

    const nextQuestion = async (updatedCorrectAnswers: number) => {
        setTotalTime(prev => prev + (30 - timeLeft));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimeLeft(30);
        } else {
            setIsComplete(true);
            await saveResult(user, totalTime, updatedCorrectAnswers, () => {
                listenForOpponentFinish((players) => determineWinner(players, user));
            });
        }
    };

    return (
        <LinearGradient style={{ flex: 1 }} colors={['#DC1920', '#A60006']}>
            <Header title='Thánh lì xì' color={{ color: '#FFE995' }} />
            <SafeAreaView style={styles.container}>
                <View style={styles.circle}>
                    <Text style={styles.time}>{timeLeft}</Text>
                </View>
                <View style={styles.cauHoiContainer}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.title}>Câu hỏi</Text>
                        <Text style={styles.txtCauHoi}>{currentQuestion.cauhoi}</Text>
                    </View>
                    <View style={styles.cautraloi}>
                        {currentQuestion.cautraloi.map((dapAnText, index) => (
                            <View key={index} style={styles.cautraloiWrap}>
                                <ButtonComponent
                                    title={dapAnText}
                                    onPress={() => handleAnswer(dapAnText)}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Page_CauDo;
