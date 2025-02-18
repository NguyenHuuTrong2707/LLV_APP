import { doc, updateDoc,getFirestore, arrayUnion, increment } from "firebase/firestore";
import uuid from "react-native-uuid";
import { app } from "@/firebase/firebaseConfig";
const db = getFirestore(app)
const getGiftType = (gift: { name: string }): string | null => {
    if (gift.name.toLowerCase().includes("phiếu mua hàng")) {
        return "Lì xì vàng";
    }
    return null; 
};
const addGiftToKhoLoc = async (userId: string, gift: {id : string, name: string; image: string; code: string, status : string }) => {
    try {
        if (!userId) {
            console.error("Không tìm thấy userId!");
            return;
        }
        const userRef = doc(db, "users", userId);
        const kho_loc_id = uuid.v4(); 
        const type = getGiftType(gift);
        //fotmat ngày giờ nhận quà
        const timestamp = new Date();
        const formattedDate = timestamp.toLocaleString('vi-VN', {
          year: 'numeric', 
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second : '2-digit',
          hour12: false,  
        });
        //them dữ liệu vào kho lộc
        const giftData: any = {
            kho_loc_id,
            id_qua: gift.id,
            giftcode: gift.code,
            name: gift.name,
            imgQua: gift.image,
            status : gift.status,
            timestamp: formattedDate,
        };

        // Chỉ thêm type nếu là "Lì xì vàng"
        if (type) {
            giftData.type = type;
        }

        // Thêm dữ liệu vào kho lộc
        await updateDoc(userRef, {
            khoLoc: arrayUnion(giftData)
        });
        console.log("Nhận lộc thành công với ID:", kho_loc_id);
    } catch (error) {
        console.error("Lỗi khi thêm vào kho lộc:", error);
    }
};

export { addGiftToKhoLoc };
