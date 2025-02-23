import { Alert } from 'react-native';
import { Player } from './findPlayer';
import { collection, doc, onSnapshot, updateDoc, getFirestore } from 'firebase/firestore';
import { app } from '@/firebase/firebaseConfig';
const db = getFirestore(app);

export const saveResult = async (user: any, totalTime: number, finalCorrectAnswers: number, listenForOpponentFinish: () => void) => {
    if (user) {
        const userRef = doc(db, "players", user.uid);
        await updateDoc(userRef, {
            totalTime,
            correctAnswers: finalCorrectAnswers,
            isFinished: true
        });
        listenForOpponentFinish();
    }
};

export const listenForOpponentFinish = (onFinish: (players: Player[]) => void) => {
    const playersRef = collection(db, "players");
    const unsubscribe = onSnapshot(playersRef, (snapshot) => {
        const players = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data() as Player
        }));

        const finishedPlayers = players.filter(player => player.isFinished);

        if (finishedPlayers.length === 2) {
            onFinish(finishedPlayers);
            unsubscribe();
        }
    });
};

export const determineWinner = (players: Player[], user: any, navigation: any) => {
    const allZeroCorrect = players.every(player => player.correctAnswers === 0);
    
    if (allZeroCorrect) {
        Alert.alert("Trận đấu hòa!", "Hai bạn là đối thủ xứng tầm, cùng thử lại nhé!");
        return;
    }

    const firstPlayer = players[0];
    const isDraw = players.every(player =>
        player.correctAnswers === firstPlayer.correctAnswers &&
        player.totalTime === firstPlayer.totalTime
    );

    if (isDraw) {
        Alert.alert("Trận đấu hòa!", "Hai bạn là đối thủ xứng tầm, cùng thử lại nhé!");
        return;
    }

    players.sort((a, b) => {
        if (b.correctAnswers !== a.correctAnswers) {
            return b.correctAnswers - a.correctAnswers;
        }
        return a.totalTime - b.totalTime;
    });
    
    const winner = players[0];
    if (user?.uid === winner.uid) {
        navigation.navigate("Winner", {
            correctAnswers: winner.correctAnswers,
        });
    } else {
        Alert.alert("Bạn đã thua!", `Người thắng là ${winner.username} với ${winner.correctAnswers} câu đúng, hoàn thành trong ${winner.totalTime} giây.`);
    }
};
