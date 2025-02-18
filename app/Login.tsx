import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard,StyleSheet, TouchableWithoutFeedback } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import  styles  from './screens/styles/LoginStyle'
import PopupXinChao from "./components/PopupXinChao";
const auth = getAuth(app);

const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      // Mở popup
      setTimeout(() => {
        Keyboard.dismiss();
        setShowPopup(true); 
      }, 200);
    } catch (error: any) {
      Alert.alert("Lỗi", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput style={styles.input} placeholder="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? "Đang đăng nhập..." : "Đăng nhập"}</Text>
        </TouchableOpacity>
        {showPopup && <PopupXinChao />}
      </View>
    </TouchableWithoutFeedback>

  );
};

export default LoginScreen;
