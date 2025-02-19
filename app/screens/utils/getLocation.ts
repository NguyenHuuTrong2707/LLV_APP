import * as Location from "expo-location";

export const getUserLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Quyền truy cập vị trí bị từ chối.");
            return null;
        }

        const location = await Location.getCurrentPositionAsync({});
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    } catch (error) {
        console.log("Lỗi khi lấy vị trí:", error);
        return null;
    }
};
