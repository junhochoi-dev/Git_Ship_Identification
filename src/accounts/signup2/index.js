import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Alert, Dimensions } from 'react-native';
import * as base from 'native-base'
import Constants from 'expo-constants';
import { requestSignup } from '../../utils/userInfoRequest/'

import {Picker} from '@react-native-picker/picker';

const SIZE_TITLE = Dimensions.get('screen').height * 0.04
const SIZE_SUBTITLE = Dimensions.get('screen').height * 0.02
const SIZE_FONT = Dimensions.get('screen').height * 0.02

export default class Signup2 extends Component{
	constructor(props){
		super(props)
		this.state = {
            srvno : '', password : '',
            name : '', rank : '', position : '',
			unit : '', phone : '',
			
			year: '', month: '',day: '',
			
			device_id : '',
			
			birthday: '',
        }
		this.executeSignup2 = this.executeSignup2.bind(this)
	}
	componentWillMount(){}
	componentDidMount(){
		this.setState({srvno: this.props.navigation.getParam('srvno')})
		this.setState({password: this.props.navigation.getParam('password')})
		this.setState({device_id: Constants.deviceId})
	}
	executeSignup2(){
		requestSignup(this.state.srvno, this.state.password, this.state.name, this.state.rank, this.state.position, this.state.unit, this.state.phone, this.state.device_id)
		.then((response) => {
            if(response.status == 200){
				Alert.alert(
					'선박확인체계 알림',
					this.state.srvno + '님 환영합니다',
				)
				this.props.navigation.popToTop();
            }
            else{
                console.log('fail')
            }
		})
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Body>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>회원가입</base.Title>
						<base.Subtitle style={{fontFamily:'Nanum_Title', fontSize: 13, marginTop: 5}}>개인정보 입력</base.Subtitle>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Form style={{margin: 5,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_TITLE, color: '#006eee', margin: 5}}>환영합니다</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: SIZE_SUBTITLE, margin: 5}}>아래의 정보를 입력해주세요</base.Text>
					</base.Form>
					<base.Form>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='이름'
								onChangeText={(name) => this.setState({name})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='생년월일 (ex. 19000101)'
								onChangeText={(birthday) => this.setState({birthday})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
						
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='계급'
								onChangeText={(rank) => this.setState({rank})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
						
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<Picker
								selectedValue={this.state.unit}
								style={{height: 50, width: '100%'}}
								onValueChange={(itemValue) => this.setState({unit: itemValue}) }>
								<Picker.Item label="97여단 1대대" value="X7-1" />
								<Picker.Item label="97여단 2대대" value="X7-2" />
								<Picker.Item label="97여단 3대대" value="X7-3" />
								<Picker.Item label="98여단 1대대" value="X8-1" />
								<Picker.Item label="98여단 2대대" value="X8-2" />
								<Picker.Item label="98여단 3대대" value="X8-3" />
								<Picker.Item label="99여단 1대대" value="X9-1" />
								<Picker.Item label="99여단 2대대" value="X9-2" />
								<Picker.Item label="99여단 3대대" value="X9-3" />
							</Picker>							
						</base.Item>

						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='직책'
								onChangeText={(position) => this.setState({position})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='이메일'
								onChangeText={(email) => this.setState({email})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType='email-address'
								/>
						</base.Item>
						<base.Form style={{alignItems: 'center'}}>
							<base.Text style={{fontFamily:'Nanum',}}>* 비밀번호를 잊어버렸을 때, 초기화된 비밀번호가 전송됩니다</base.Text>
						</base.Form>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='연락처 (ex. 01000000000)'
								onChangeText={(phone) => this.setState({phone})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
						<base.Form style={{flexDirection: 'row', alignItems:'center', marginTop: 10, marginBottom: 10,}}>
							<base.Button bordered style={{ flex: 1, width: '100%', marginRight: 5, borderRadius: 10}} onPress={()=>this.props.navigation.popToTop()}>
									<base.Text style={{fontFamily:'Nanum'}}>취소</base.Text>
								</base.Button>
							<base.Button bordered style={{ flex: 1, width: '100%', marginLeft: 5, borderRadius: 10}} onPress={this.executeSignup2}>
									<base.Text style={{fontFamily:'Nanum'}}>회원가입</base.Text>
							</base.Button>
						</base.Form>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}