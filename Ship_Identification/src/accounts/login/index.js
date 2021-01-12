import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage, Image, ImageBackground, View, Text } from 'react-native';
import styles from './styles';
import * as base from 'native-base'
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { requestLogin } from '../../../utils/userInfoRequest/'

export default class Login extends Component{
	constructor(props){
		super(props)
		this.state={
			isReady: false,
			
			serviceNum: '',
			password: '',
			device_id: '',
		}
		this.executeLogin = this.executeLogin.bind(this)
	}
	componentWillMount(){}
	async componentDidMount(){
		await Font.loadAsync({
			Nanum: require('../../../assets/font/Nanum.ttf'),
			Nanum_Title: require('../../../assets/font/Nanum_Title.ttf'),
		})
		this.setState({isReady: true})
		this.setState({device_id: Constants.deviceId})
	}
	executeLogin(){
		requestLogin(this.state.serviceNum, this.state.password, this.state.device_id).then((response) => {
		if(response.status == 200){
			AsyncStorage.setItem('token', response.data['data']['token']);
			this.props.navigation.navigate('Home')
		}
		else{
			console.log('failed')
		}})
	}
	render(){
		if(!this.state.isReady){
            return(
                <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
				    <Text style ={{fontSize: 30}}>데이터 가져오는 중</Text>
				    <base.Spinner color='blue' />
                </View>
            )
        }
		return(
			<base.Container>
				<ImageBackground source={require('/workspace/Ship_Identification/assets/img/login.jpeg')} style={{flex: 1, resizeMode: 'cover',}}>
					<base.Content padder>
						<base.Form style={styles.container}>
							<base.Icon name='ios-boat' style={{marginTop: 60, color: 'white', fontSize: 160}}/>
							<base.Text style={{fontSize: 50, marginTop: 20, marginBottom: 80, fontFamily:'Nanum_Title', color: 'white'}}>선박정보확인체계</base.Text>
							<base.Item floatingLabel style={styles.input_layout}>
								<base.Label style={{color: 'white', fontFamily:'Nanum',}}>아이디</base.Label>
								<base.Icon name='ios-person' style={{color: 'white'}}/>
								<base.Input
									style={{color: 'white'}}
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

						<base.Form style={{alignItems: 'center',}}>
							<base.Button light style={styles.btn_login} bordered onPress={this.executeLogin}>
								<base.Text style={{ fontFamily:'Nanum' }}>로그인</base.Text>
							</base.Button>
							<base.Form style={{margin: 10, flex: 1, flexDirection: 'row', }}>
								<base.Button light style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Signup1')}>
									<base.Text style={{ fontFamily:'Nanum' }}>회원가입</base.Text>
								</base.Button>
								<base.Button light style={styles.btn_others} bordered onPress={()=>this.props.navigation.navigate('Lost')}>
									<base.Text style={{ fontFamily:'Nanum' }}>비밀번호찾기</base.Text>
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