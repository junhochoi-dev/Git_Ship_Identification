import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base'
import Constants from 'expo-constants';

import { requestSignup } from '../../../utils/userInfoRequest/'
export default class Signup2 extends Component{
	constructor(props){
		super(props)
		this.state = {
            serviceNum : '',
            password : '',
            name : '',
			rank : '',
			position : '',
			belong : '',
			phone : '',
			
			year: '',
			month: '',
			day: '',
			
			device_id : '',
			
			birthday: '',
        }
		this.executeSignup2 = this.executeSignup2.bind(this)
	}
	componentWillMount(){}
	componentDidMount(){
		this.setState({serviceNum: this.props.navigation.getParam('serviceNum')})
		this.setState({password: this.props.navigation.getParam('password')})
		this.setState({device_id: Constants.deviceId})
	}
	executeSignup2(){
		requestSignup(this.state.serviceNum, this.state.password, this.state.name, this.state.rank, this.state.position, this.state.belong, this.state.phone, this.state.device_id)
		.then((response) => {
            if(response.status == 200){
                console.log("success")
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
						<base.Subtitle style={{fontFamily:'Nanum_Title', fontSize: 10, marginTop: 5}}>개인정보 입력</base.Subtitle>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Form style={{margin: 5,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', margin: 5}}>환영합니다</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 5}}>아래의 정보를 입력해주세요</base.Text>
					</base.Form>
					<base.Card>
						<base.Form style={{ margin:10,}}>
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
									placeholder='직급'
									onChangeText={(rank) => this.setState({rank})}
									style={{fontFamily:'Nanum'}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
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
									placeholder='소속'
									onChangeText={(belong) => this.setState({belong})}
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
									/>
							</base.Item>
							<base.Form style={{alignItems: 'center'}}>
								<base.Text style={{fontFamily:'Nanum',}}>* 비밀번호를 잊어버렸을 때, 초기화된 비밀번호가 전송됩니다</base.Text>
							</base.Form>
							<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
								<base.Input
									placeholder='연락처'
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
					</base.Card>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}