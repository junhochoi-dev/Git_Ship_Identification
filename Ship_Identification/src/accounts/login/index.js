import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, View, Text, Alert, Dimensions } from 'react-native';
import styles from './styles';
import * as base from 'native-base'
import Constants from 'expo-constants';
import { requestLogin } from '../../../utils/userInfoRequest/'

const SIZE_ICON = Dimensions.get('screen').width * 0.6
const SIZE_TITLE = Dimensions.get('screen').width * 0.125
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035

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
	componentDidMount(){this.setState({device_id: Constants.deviceId})}
	executeLogin(){
		requestLogin(this.state.serviceNum, this.state.password, this.state.device_id).then((response) => {
		if(response.status == 200){
			AsyncStorage.setItem('token', response.data['data']['token']);
			Alert.alert(
				'선박확인체계 알림',
				this.state.serviceNum + '님 반갑습니다',
			)
			this.props.navigation.navigate('Home')
		}
		else{
			console.log('failed')
		}})
	}
	render(){
		return(
			<base.Container>
				<ImageBackground source={require('/workspace/Ship_Identification/assets/img/login.jpeg')} style={{flex: 1, resizeMode: 'cover',}}>
					<base.Content padder contentContainerStyle={styles.contentContainer}>
						<base.Form style={styles.container}>
							<base.Icon name='ios-boat' style={{ color: 'white', fontSize: SIZE_ICON}}/>
							<base.Text style={{fontSize: SIZE_TITLE, fontFamily:'Nanum_Title', color: 'white'}}>선박확인체계</base.Text>
							<base.Text style={{fontSize: SIZE_SUBTITLE, fontFamily:'Nanum_Title', color: 'white'}}>BETA TEST VERSION</base.Text>
						</base.Form>
						<base.Form style={styles.inputContainer}>
							<base.Item floatingLabel style={styles.input_layout}>
								<base.Label style={{color: 'white', fontFamily:'Nanum',}}>아이디</base.Label>
								<base.Icon name='ios-person' style={{color: 'white'}}/>
								<base.Input
									style={{color: 'white',}}
									onChangeText={(serviceNum) => this.setState({serviceNum})}
									keyboardType="number-pad"/>
							</base.Item>
							<base.Item floatingLabel style={styles.input_layout}>
								<base.Label style={{color: 'white', fontFamily:'Nanum',}}>비밀번호</base.Label>
								<base.Icon name='ios-key' style={{color: 'white'}}/>
								<base.Input
									style={{color: 'white'}}
									onChangeText={(password) => this.setState({password})}
									secureTextEntry={ true }/>
							</base.Item>
						</base.Form>

						<base.Form style={styles.buttonContainer}>
							<base.Form style={{width: '100%'}}>
								<base.Button light style={styles.btn_login} bordered onPress={this.executeLogin}>
									<base.Text style={{ fontFamily:'Nanum', color: 'white' }}>로그인</base.Text>
								</base.Button>
							</base.Form>
							<base.Form style={{margin: 10, flex: 1, flexDirection: 'row', }}>
								<base.Button light style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('AccessRights')}>
									<base.Text style={{ fontFamily:'Nanum', color: 'white' }}>회원가입</base.Text>
								</base.Button>
								<base.Button light style={styles.btn_others} bordered
									onPress={()=>this.props.navigation.navigate('Lost')}>
									<base.Text style={{ fontFamily:'Nanum', color: 'white' }}>비밀번호찾기</base.Text>
								</base.Button>
							</base.Form>
						</base.Form>
						
					</base.Content>
					<StatusBar hidden/>
				</ImageBackground>
			</base.Container>
		);
	}
}