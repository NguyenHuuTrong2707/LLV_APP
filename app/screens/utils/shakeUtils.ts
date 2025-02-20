import { Alert } from "react-native";
import { Accelerometer } from "expo-sensors";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { app } from "@/firebase/firebaseConfig";

interface Gift {
  id: string
  name: string;
  image: string;
  xacxuat: number;
}

const db = getFirestore(app);

// Hàm lấy danh sách quà theo onSnapshot
const getGiftsFromFirestore = (callback: (gifts: Gift[]) => void) => {
  return onSnapshot(collection(db, "PhanThuong"), (snapshot) => {
    const gifts: Gift[] = snapshot.docs.map((doc) => ({
      id : doc.id,
      name: doc.data().name,
      image: doc.data().image,
      xacxuat: doc.data().xacxuat,
    }));
    callback(gifts);
  });
};


// Chọn quà tặng theo xác suất
const getRandomGift = (gifts: Gift[]): Gift | null => {
  if (gifts.length === 0) return null;

  const totalWeight = gifts.reduce((sum, gift) => sum + gift.xacxuat, 0);
  let random = Math.random() * totalWeight;

  for (const gift of gifts) {
    if (random < gift.xacxuat) {
      return gift;
    }
    random -= gift.xacxuat;
  }
  return gifts[gifts.length - 1];
};

// Tạo mã quà tặng ngẫu nhiên
const generateGiftCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
};

// Xử lý khi phát hiện lắc điện thoại
export const handleShakeDetected = async (
  totalShakes: number,
  setTotalShakes: React.Dispatch<React.SetStateAction<number>>,
  setIsShaken: React.Dispatch<React.SetStateAction<boolean>>,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupMultiVisible: React.Dispatch<React.SetStateAction<boolean>>,
  setGift: React.Dispatch<React.SetStateAction<{ id: string; name: string; image: string; code: string } | null>>,
  setGifts: React.Dispatch<React.SetStateAction<{ id: string; name: string; image: string; code: string }[]>>, // Thêm state danh sách quà
  shakeCount: number
) => {
  if (totalShakes >= shakeCount) {
    setTotalShakes((prev) => prev - shakeCount);
    setIsShaken(true);

    getGiftsFromFirestore((gifts) => {
      let receivedGifts = [];

      for (let i = 0; i < shakeCount; i++) {
        const gift = getRandomGift(gifts);
        if (gift) {
          const code = generateGiftCode();
          receivedGifts.push({ id: gift.id, name: gift.name, image: gift.image, code });
        }
      }

      if (receivedGifts.length > 0) {
        if (shakeCount === 10) {
          setGifts(receivedGifts); // Lưu danh sách quà khi lắc 10 lần
          setPopupMultiVisible(true);
        } else {
          setGift(receivedGifts[0]); // Hiển thị 1 quà
          setPopupVisible(true);
        }
      }
    });
  } else {
    Alert.alert("Hết lượt!", "Bạn không còn đủ lượt lắc.");
    setIsListening(false);
  }
};



// Bắt đầu lắng nghe cảm biến gia tốc
export const startListening = (
  totalShakes: number,
  isShaken: boolean,
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>,
  setIsShaken: React.Dispatch<React.SetStateAction<boolean>>,
  setShakeCount: React.Dispatch<React.SetStateAction<number>>,
  shakesToDeduct: number
) => {
  if (totalShakes > 0) {
    if (!isShaken) {
      Alert.alert("Hãy lắc điện thoại!", "Lắc điện thoại để nhận lì xì ngay.");
    }
    setIsListening(true);
    setIsShaken(false);
    setShakeCount(shakesToDeduct);
  } else {
    Alert.alert("Hết lượt!", "Bạn không còn lượt lắc nào.");
  }
};

// Đăng ký cảm biến gia tốc để phát hiện lắc
export const subscribeAccelerometer = (
  isListening: boolean,
  isShaken: boolean,
  handleShakeDetected: (shakeCount: number) => void, 
  shakeCount: number
) => {
  let detectedShakes = 0; 
  let subscription: any;

  if (isListening) {
    subscription = Accelerometer.addListener(({ x, y, z }) => {
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      if (acceleration > 2.5 && !isShaken) {
        detectedShakes++;
        if (detectedShakes >= shakeCount) {
          handleShakeDetected(shakeCount);
          detectedShakes = 0; 
        }
      }
    });
    Accelerometer.setUpdateInterval(100);
  }

  return subscription;
};

