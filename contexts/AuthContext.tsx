import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();

    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        // Lấy thông tin user từ Firestore
        const userDocRef = doc(db, "users", authUser.uid);
        const userSnap = await getDoc(userDocRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const completeUser = {
            uid: authUser.uid,
            email: authUser.email,
            displayName: userData.username || authUser.displayName,
            avatar: userData.avatar || null,
          };

          setUser(completeUser);
          await AsyncStorage.setItem("user", JSON.stringify(completeUser));
        } else {
          setUser(authUser);
        }
      } else {
        setUser(null);
        await AsyncStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
