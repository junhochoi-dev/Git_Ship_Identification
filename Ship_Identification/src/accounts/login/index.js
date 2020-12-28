import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
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
	componentWillMount(){ this.setState({device_id: Constants.deviceId}) }
	componentDidMount(){}
	executeLogin(){
		requestLogin(this.state.serviceNum, this.state.password, this.state.device_id).then((response) => {
		if(response.status == 200){
			AsyncStorage.setItem('token', response.data['data']['token']);
			this.props.navigation.navigate('homeStackNav')
		}
		else{ console.log('Invalid User')} })
	}
	render(){
		return(
			<base.Container style={styles.container}>
				<base.Content>
					<base.Text style={{fontSize: 60, alignItems: 'center',}}>선박정보확인체계</base.Text>
					<base.Form style={styles.input_layout}>
						<base.Item floatingLabel>
							<base.Label style={styles.input}>아이디</base.Label>
							<base.Input onChangeText={(serviceNum) => this.setState({serviceNum})}
								keyboardType="number-pad"/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label style={styles.input}>비밀번호</base.Label>
							<base.Input onChangeText={(password) => this.setState({password})}
								secureTextEntry={ true }/>
						</base.Item>
					</base.Form>

					<base.Form style={{alignItems: 'center',}}>
						<base.Form>
							<base.Button style={styles.btn_login} bordered onPress={this.executeLogin}>
								<base.Text>로그인</base.Text>
							</base.Button>
						</base.Form>
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