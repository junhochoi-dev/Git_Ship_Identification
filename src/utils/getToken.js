import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = async () => {
	try{
		const token = await AsyncStorage.getItem('token');
		if (token !== null) { return token }
	} catch (error) {
		console.log(error)
		console.log('There is not a token...')
		return ''
	}
};
