import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, ImageBackground, View, Text, Alert, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import * as base from 'native-base';
import Constants from 'expo-constants';
import { requestLogin } from '../../utils/userInfoRequest/';

const SIZE_ICON = Dimensions.get('screen').height * 0.2
const SIZE_TITLE = Dimensions.get('screen').width * 0.1
const SIZE_SUBTITLE = Dimensions.get('screen').width * 0.035

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			srvno: '',
			password: '',
			device_id: '',
		}
		this.executeLogin = this.executeLogin.bind(this)
	}
	componentDidMount(){
		console.log(Constants.deviceId)
		this.setState({device_id: Constants.deviceId})
	}
	executeLogin(){
		requestLogin(this.state.srvno, this.state.password, this.state.device_id).then((response) => {
			if(response.status == 200){
				AsyncStorage.setItem('token', response.data['data']['token'])
				Alert.alert(
					'선박확인체계 알림',
					this.state.srvno + '님 반갑습니다',
				)
				this.props.navigation.navigate('Home')
			}
			else{
				console.log('failed')
			}
		})
	}
	render(){
		return(
			<base.Container>
				<base.Content padder contentContainerStyle={styles.contentContainer}>
					<base.Form style={styles.container}>
						<base.Icon name='ios-boat' style={{ color: 'white', fontSize: SIZE_ICON}}/>
						<base.Text style={{fontSize: SIZE_TITLE, fontFamily:'Nanum_Title', color: 'white'}}>선박확인체계</base.Text>
						<base.Text style={{fontSize: SIZE_SUBTITLE, fontFamily:'Nanum_Title', color: 'white'}}>BETA TEST VERSION</base.Text>
					</base.Form>
					<base.Form style={styles.inputContainer}>
						<base.Item floatingLabel style={styles.input_layout}>
							<base.Icon name='ios-person' style={{color: 'white'}}/>
							<base.Label style={{color: 'white', fontFamily:'Nanum',}}>  아이디</base.Label>
							<base.Input
								style={{color: 'white',}}
								onChangeText={(srvno) => this.setState({srvno})}
								keyboardType="number-pad"/>
						</base.Item>
						<base.Item floatingLabel style={styles.input_layout}>
							<base.Icon name='ios-key' style={{color: 'white'}}/>
							<base.Label style={{color: 'white', fontFamily:'Nanum',}}>  비밀번호</base.Label>
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
					<base.Form style={{width: '100%'}}>
						<base.Button light style={styles.btn_login} bordered onPress={()=>this.props.navigation.navigate('Home')}>
							<base.Text style={{ fontFamily:'Nanum', color: 'white' }}>TEST</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
				<StatusBar hidden/>
			</base.Container>
		);
	}
}