import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: 20,
		marginBottom: 60,
	},
	input_layout: {
		margin: 10,
	},
	input: {
		marginTop: 20,
		marginBottom: 20,
		color: 'black',
	},
	btn_login: {
		width: '100%',
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'white',
	},
	btn_others: {
		margin: 10,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		borderColor: 'white',
	},
});

export default styles;