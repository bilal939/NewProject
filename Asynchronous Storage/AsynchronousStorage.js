import AsyncStorage from "@react-native-async-storage/async-storage"
export const GetToken = async()=>{
    try {
        const token = AsyncStorage.getItem('token'); 
        return token;
    } catch (error) {
        console.log("error is",error)
    }
}