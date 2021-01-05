import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import styles from './styles';
import * as base from 'native-base'
import Constants from 'expo-constants';

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
		return(
			<base.Container>
				<base.Header>
				</base.Header>
				<base.Content padder>
					<base.Form style={styles.container}>							
						<base.Text style={{fontSize: 80, marginTop: 100, marginBottom: 20}}>선박정보{'\n'}확인체계</base.Text>
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
						<base.Button style={styles.btn_login} bordered onPress={()=>this.props.navigation.navigate('Home')}>
							<base.Text>TEST</base.Text>
						</base.Button>
						<base.Form style={{margin: 10, flex: 1, flexDirection: 'row', }}>
							<base.Button style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text>회원가입</base.Text>
							</base.Button>
							<base.Button style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text>비밀번호찾기</base.Text>
							</base.Button>
						</base.Form>
					</base.Form>
				</base.Content>
			</base.Container>
		);
	}
}