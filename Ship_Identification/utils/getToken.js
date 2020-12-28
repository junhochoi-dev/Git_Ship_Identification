import {AsyncStorage} from "react-native";
export const getToken = async () => {
	try{
		const token = await AsyncStorage.getItem('token');
		if (token !== null) { return token }
	} catch (error) {
		return ''
	}
};
