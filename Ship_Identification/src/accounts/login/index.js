import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, Image } from 'react-native';
import styles from './styles';
import * as base from 'native-base'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { requestLogin } from '../../../utils/userInfoRequest/'

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			serviceNum: '',
			password: '',
			device_id: '',
		}
		this.executeLogin = this.executeLogin.bind(this)
	}
	componentWillMount(){}
	componentDidMount(){ this.setState({device_id: Constants.deviceId})}
	executeLogin(){
		requestLogin(this.state.serviceNum, this.state.password, this.state.device_id).then((response) => {
		if(response.status == 200){
			AsyncStorage.setItem('token', response.data['data']['token']);
			this.props.navigation.navigate('Home')
		}
		else{ console.log('Invalid User')} })
	}
	render(){
		
		Font.loadAsync({
			Nanum: require('../../../assets/font/Nanum.ttf'),
			Nanum_Title: require('../../../assets/font/Nanum_Title.ttf'),
		})
		return(
			<base.Container>
				<base.Content padder>
					<base.Form style={styles.container}>
						<Image resizeMode='contain' source={require('/workspace/Ship_Identification/assets/img/logo.jpg')} style={{height: 200, width: 400, marginTop: 80,}}/>
						<base.Text style={{fontSize: 70, marginBottom: 20, fontFamily:'Nanum_Title'}}>선박정보{'\n'}확인체계</base.Text>
						<base.Item regular style={styles.input_layout}>
							<base.Input placeholder='아이디' onChangeText={(serviceNum) => this.setState({serviceNum})}
								keyboardType="number-pad"/>
						</base.Item>
						<base.Item regular style={styles.input_layout}>
							<base.Input placeholder='비밀번호' onChangeText={(password) => this.setState({password})}
								secureTextEntry={ true }/>
						</base.Item>
					</base.Form>

					<base.Form style={{alignItems: 'center',}}>
						<base.Button style={styles.btn_login} bordered onPress={this.executeLogin}>
							<base.Text>로그인</base.Text>
						</base.Button>
						<base.Form style={{margin: 10, flex: 1, flexDirection: 'row', }}>
							<base.Button style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text>회원가입</base.Text>
							</base.Button>
							<base.Button style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text>비밀번호찾기</base.Text>
							</base.Button>
						</base.Form>
						<base.Button style={styles.btn_login} bordered onPress={()=>this.props.navigation.navigate('Home')}>
							<base.Text>TEST</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}