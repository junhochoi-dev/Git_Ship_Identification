import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	input_layout: {
		margin: 5,
		width: '80%',
		flexDirection: 'column',
	},
	input: {
		color: 'black',
	},
	btn_login: {
		margin: 5,
		width: 325,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_others: {
		margin: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: '40%',
	},
});

export default styles;