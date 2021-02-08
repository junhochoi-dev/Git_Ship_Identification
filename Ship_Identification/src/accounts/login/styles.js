import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		flex: 3,
	},
	buttonContainer:{
		alignItems: 'center',
		flex: 1,
	},
	inputContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		flex: 1,
	},
	input_layout: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
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