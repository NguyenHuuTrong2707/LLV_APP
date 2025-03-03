import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from "./styles/BangXepHangStyle";
import { collection, getFirestore, onSnapshot, query, orderBy } from 'firebase/firestore';
import { app } from '../../firebase/firebaseConfig';
import { Alert, ScrollView, Text, View } from 'react-native';
import { ImageBackground as ExpoImage } from "expo-image";
import Header from '../components/Header';
import { SafeAreaView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';

const db = getFirestore(app);

const Page_BangXepHang: React.FC = () => {
    const [pageData, setPageData] = useState<any>(null);
    const { user } = useAuth();
    const [leaderboardData, setLeaderboardData] = useState<any[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, `Page_XepHang`), (snapshot) => {
            if (!snapshot.empty) {
                setPageData(snapshot.docs[0].data());
            } else {
                console.log(`Không có dữ liệu trong collection Page_XepHang`);
            }
        });
    })
    //xep hang
    useEffect(() => {
        const q = query(collection(db, "users"), orderBy("totalLixi", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            if (!snapshot.empty) {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setLeaderboardData(data);
            } else {
                console.log(`Không có dữ liệu trong collection users`);
            }
        });

        return () => unsubscribe();
    }, []);
    //xep hang chinh minh
    const myRankIndex = leaderboardData.findIndex(player => player.id === user?.uid);
    const myRank = myRankIndex !== -1 ? myRankIndex + 1 : null;
    return (
        <ExpoImage
            source={{ uri: pageData?.imgbg }}
            style={styles.bg}
            contentFit="cover"
            cachePolicy="memory-disk"
        >
            <Header title='Bảng xếp hạng'
                color={{ color: '#FFE995' }}
            />
            <SafeAreaView style={styles.container}>
                {/* nav top  */}
                <View
                    style={styles.navTopContainer}
                >
                    {/* tinh */}
                    <ExpoImage
                        contentFit='cover'
                        cachePolicy='memory-disk'
                        source={{ uri: pageData?.tabTinh }}
                        style={styles.tab}
                    >
                    </ExpoImage>
                    {/* Toan quoc */}
                    <ExpoImage
                        contentFit='cover'
                        cachePolicy='memory-disk'
                        source={{ uri: pageData?.tabToanQuoc }}
                        style={styles.tab}
                    >
                    </ExpoImage>
                    {/* Chung Ket */}
                    <ExpoImage
                        contentFit='cover'
                        cachePolicy='memory-disk'
                        source={{ uri: pageData?.tabChungKet }}
                        style={styles.tab}
                    >
                    </ExpoImage>
                </View>
                {/* Banner */}
                <ExpoImage
                    contentFit='cover'
                    cachePolicy="memory-disk"
                    source={{ uri: pageData?.imgbanner }}
                    style={styles.banner}
                >
                    {/* Top 1 & 2 */}
                    <View
                        style={styles.topContainer}
                    >
                        {leaderboardData.length > 0 && (
                            <ExpoImage
                                source={{ uri: pageData?.imgTop1 }}
                                style={styles.imgTop}
                            >
                                <ExpoImage
                                    contentFit='cover'
                                    cachePolicy="memory-disk"
                                    source={{ uri: pageData?.imgavt2 }}
                                    style={styles.avtTop1}
                                >
                                </ExpoImage>
                                <Text style={styles.txtNameTop1}>{leaderboardData[0]?.username}</Text>
                            </ExpoImage>
                        )}
                        {leaderboardData.length > 1 && (
                            <ExpoImage
                                source={{ uri: pageData?.imgTop2 }}
                                style={styles.imgTop2}
                            >
                                <ExpoImage
                                    contentFit='cover'
                                    cachePolicy="memory-disk"
                                    source={{ uri: pageData?.imgavt1 }}
                                    style={[styles.avtTop1, { marginBottom: 25 }]}
                                >
                                </ExpoImage>
                                <Text style={styles.txtNameTop2}>{leaderboardData[1]?.username}</Text>
                            </ExpoImage>
                        )}
                    </View>
                    {/* Top  */}
                    <ScrollView>
                        <View
                            style={styles.bangXepHangContainer}
                        >
                            {/* Top 1 */}
                            {leaderboardData.length > 0 && (
                                <ExpoImage
                                    contentFit='cover'
                                    cachePolicy="memory-disk"
                                    source={{ uri: pageData?.top1 }}
                                    style={styles.xepHang1}
                                >
                                    <ExpoImage
                                        contentFit='cover'
                                        cachePolicy="memory-disk"
                                        source={{ uri: pageData?.imgavt1 }}
                                        style={styles.imgavt1}
                                    >
                                    </ExpoImage>
                                    <View
                                        style={styles.txtContainer}
                                    >
                                        <Text style={styles.txtXepHang}>{leaderboardData[0]?.username}</Text>
                                        <Text style={styles.txtLiXi}>{leaderboardData[0]?.totalLixi}</Text>
                                        <Text style={styles.txtLiXi}>Lì Xì</Text>

                                    </View>
                                </ExpoImage>
                            )}
                            {/* Top 2 */}
                            <ExpoImage
                                contentFit='cover'
                                cachePolicy="memory-disk"
                                source={{ uri: pageData?.top2 }}
                                style={styles.xepHang1}
                            >
                                <ExpoImage
                                    contentFit='cover'
                                    cachePolicy="memory-disk"
                                    source={{ uri: pageData?.imgavt1 }}
                                    style={styles.imgavt1}
                                >
                                </ExpoImage>
                                <View
                                    style={styles.txtContainer}
                                >
                                    <Text style={styles.txtXepHang}>{leaderboardData[1]?.username}</Text>
                                    <Text style={styles.txtLiXi}>{leaderboardData[1]?.totalLixi}</Text>
                                    <Text style={styles.txtLiXi}>Lì Xì</Text>

                                </View>
                            </ExpoImage>
                            {/* Normal */}
                            {leaderboardData.slice(2).length > 0 && (
                                <ExpoImage
                                    contentFit='cover'
                                    cachePolicy="memory-disk"
                                    source={{ uri: pageData?.topnormal }}
                                    style={styles.xepHangCuaToi}
                                >
                                    {leaderboardData.slice(2).map((player, index) => (
                                        <ExpoImage
                                            key={player.id}
                                            source={{ uri: player.imgavt }}
                                            style={styles.xepHangCuaToi}
                                        >
                                            <Text style={styles.scoreTop}>{index + 3}</Text>
                                            <Text style={styles.txtXepHang}>{player.name}</Text>
                                            <Text style={styles.txtLiXi}>{player.totalLiXi}</Text>
                                            <Text style={styles.txtLiXi}>Lì Xì</Text>
                                        </ExpoImage>
                                    ))}
                                </ExpoImage>
                            )}
                        </View>
                    </ScrollView>
                    {/* Hang cua toi */}
                    <ExpoImage
                        contentFit='cover'
                        cachePolicy="memory-disk"
                        source={{ uri: pageData?.imghangcuatoi }}
                        style={styles.hangCuaToi}
                    ></ExpoImage>
                    <ExpoImage
                        contentFit="cover"
                        cachePolicy="memory-disk"
                        source={{ uri: pageData?.topnormal }}
                        style={styles.xepHangCuaToi}
                    >
                        {/* Avatar */}
                        <ExpoImage
                            contentFit="cover"
                            cachePolicy="memory-disk"
                            source={{ uri: pageData?.imgavt1 }}
                            style={styles.imgavt1}
                        />

                        {/* View chứa thông tin hạng của tôi */}
                        <View style={styles.txtContainer}>
                            {myRank !== null ? (
                                <>
                                    <Text style={styles.scoreTop}>{myRank}</Text>
                                    <Text style={styles.txtXepHang}>{user?.displayName}</Text>
                                    <Text style={styles.txtLiXi}>{leaderboardData[myRankIndex]?.totalLixi || 0}</Text>
                                    <Text style={styles.txtLiXi}>Lì Xì</Text>
                                </>
                            ) : (
                                <Text style={styles.txtXepHang}>Bạn chưa có hạng</Text>
                            )}
                        </View>
                    </ExpoImage>

                </ExpoImage>
            </SafeAreaView>
        </ExpoImage>
    );
};

export default Page_BangXepHang;
