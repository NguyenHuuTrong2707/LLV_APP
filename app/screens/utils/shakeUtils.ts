import { Alert } from "react-native";
import { Accelerometer } from "expo-sensors";

export const handleShakeDetected = (
  totalShakes: number,
  setTotalShakes: React.Dispatch<React.SetStateAction<number>>,
  setIsShaken: React.Dispatch<React.SetStateAction<boolean>>,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (totalShakes > 0) {
    setTotalShakes((prev) => prev - 1);
    setIsShaken(true); 
    Alert.alert("Lắc thành công!", "Bạn đã nhận được 1 chỉ vàng 9999", [
      { text: "OK", onPress: () => setIsListening(false) }
    ]);
  } else {
    Alert.alert("Hết lượt!", "Bạn không còn lượt lắc nào.");
    setIsListening(false);
  }
};

export const startListening = (
  totalShakes: number,
  isShaken: boolean,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  setIsShaken: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (totalShakes > 0) {
    if (!isShaken) {
      Alert.alert("Hãy lắc điện thoại!", "Lắc mạnh để sử dụng lượt lắc.");
    }
    setIsListening(true);
    setIsShaken(false);
  } else {
    Alert.alert("Hết lượt!", "Bạn không còn lượt lắc nào.");
  }
};

export const subscribeAccelerometer = (
  isListening: boolean,
  isShaken: boolean,
  handleShakeDetected: () => void
) => {
  let subscription: any;
  if (isListening) {
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 2.5 && !isShaken) {
        handleShakeDetected();
      }
    });
    Accelerometer.setUpdateInterval(100);
  }
  return subscription;
};
