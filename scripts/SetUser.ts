import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);

const usersList = [
  { username: "Nguyễn Hữu Trọng", email: "huutrong@example.com", password: "270704", totalShakes: 10, khoLoc: [] },
  { username: "Nguyễn Văn B", email: "vanb@example.com", password: "270704", totalShakes: 15, khoLoc: [] },
];

const createUsersWithAuth = async () => {
  for (const user of usersList) {
    try {
      // Kiểm tra xem user đã tồn tại hay chưa
      const signInMethods = await fetchSignInMethodsForEmail(auth, user.email);
      let uid: string;
      if (signInMethods.length > 0) {
        // User đã tồn tại, lấy UID từ Firestore
        const userRef = doc(db, "users", user.email);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          uid = userSnap.id;
          console.log(`User ${user.username} đã tồn tại, chỉ cập nhật Firestore.`);
        } else {
          console.warn(`User ${user.username} tồn tại trong Auth nhưng chưa có trong Firestore.`);
          continue; 
        }
      } else {
        // Tạo user mới
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        uid = userCredential.user.uid;
        console.log(`User ${user.username} được tạo mới.`);
      }

      // Lưu hoặc cập nhật dữ liệu Firestore
      await setDoc(doc(db, "users", uid), {
        username: user.username,
        email: user.email,
        totalShakes: user.totalShakes,
        khoLoc: user.khoLoc,
      }, { merge: true });

      console.log(`Dữ liệu của user ${user.username} đã được cập nhật vào Firestore.`);

    } catch (error) {
      if (error instanceof Error) {
        console.error("Lỗi:", error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }
  }
};

createUsersWithAuth();
