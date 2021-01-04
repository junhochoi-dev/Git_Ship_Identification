import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		marginTop: 20,
		marginBottom: 20,
	},
	input_layout: {
		margin: 15,
	},
	input: {
		color: 'black',
	},
	btn_login: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	btn_others: {
		marginLeft: 5,
		marginRight: 5,
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
	},
});

export default styles;