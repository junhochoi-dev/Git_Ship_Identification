import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	contentContainer:{
		flex: 1,
		alignItems: 'center', 
		justifyContent:'center',
		backgroundColor: '#006eee',
	},
	container:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		flex: 2,
	},
	buttonContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		width: '100%'
	},
	inputContainer:{
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		width: '100%',
		flex: 1,
		margin: 10,
	},
	input_layout: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		margin: 15
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