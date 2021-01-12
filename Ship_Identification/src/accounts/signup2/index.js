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
			device_id : '',
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
				<base.Header>
					<base.Body>
						<base.Title>회원가입</base.Title>
						<base.Subtitle>개인정보 입력</base.Subtitle>
					</base.Body>
				</base.Header>
				<base.Content padder contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
					<base.Card>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', margin: 10,}}>
						<base.Button style={{width: 350, margin: 5,}} bordered onPress={() => alert('개발중')}>
						<base.Text>선박정보확인체계 이용약관 동의</base.Text>
						</base.Button>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', margin: 5,}}>
							<base.CheckBox checked={false} />
							<base.Text style={{marginLeft: 15}}> 위 내용에 동의합니다 </base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', margin: 10,}}>
						<base.Button style={{width: 350, margin: 5,}} bordered onPress={() => alert('개발중')}>
						<base.Text>개인정보 수집 및 이용약관 동의</base.Text>
						</base.Button>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', margin: 5,}}>
							<base.CheckBox checked={false} />
							<base.Text style={{marginLeft: 15}}> 위 내용에 동의합니다 </base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', margin: 10,}}>
						<base.Button style={{width: 350, margin: 5,}} bordered onPress={() => alert('개발중')}>
						<base.Text>위치정보 이용약관 동의</base.Text>
						</base.Button>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', margin: 5,}}>
							<base.CheckBox checked={false} />
							<base.Text style={{marginLeft: 15}}> 위 내용에 동의합니다 </base.Text>
						</base.Form>
					</base.Form>
					<base.Form style={{margin:10,}}>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='이름'
								onChangeText={(name) => this.setState({name})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								/>
						</base.Item>
						<base.Form style={{flexDirection: 'row', width: '100%'}}>
							<base.Item regular style={{ flex :1, width: '100%', margin: 10, borderRadius: 10}}>
								<base.Input
									placeholder='년'
									onChangeText={(rank) => this.setState({rank})}
									style={{fontFamily:'Nanum'}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
							<base.Item regular style={{ flex :1, width: '100%', margin: 10, borderRadius: 10}}>
								<base.Input
									placeholder='월'
									onChangeText={(rank) => this.setState({rank})}
									style={{fontFamily:'Nanum'}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
							<base.Item regular style={{ flex :1, width: '100%', margin: 10, borderRadius: 10}}>
								<base.Input
									placeholder='일'
									onChangeText={(rank) => this.setState({rank})}
									style={{fontFamily:'Nanum'}}
									placeholderStyle={{fontFamily:'Nanum'}}
									/>
							</base.Item>
						</base.Form>
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
								placeholder='번호'
								onChangeText={(phone) => this.setState({phone})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								keyboardType="number-pad"
								/>
						</base.Item>
					</base.Form>
						<base.Form style={{flexDirection: 'row', alignItems:'center',}}>
							<base.Button bordered style={{width: '45%', margin: 10,}} onPress={()=>this.props.navigation.popToTop()}>
									<base.Text>취소</base.Text>
								</base.Button>
							<base.Button bordered style={{width: '45%', margin: 10,}} onPress={this.executeSignup2}>
									<base.Text>회원가입</base.Text>
							</base.Button>
						</base.Form>
					</base.Card>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}