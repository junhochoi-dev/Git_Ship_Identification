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
						<base.Item floatingLabel>
							<base.Label>이름</base.Label>
							<base.Input onChangeText={(name) => this.setState({name})}/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label>직급</base.Label>
							<base.Input onChangeText={(rank) => this.setState({rank})}/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label>직책</base.Label>
							<base.Input onChangeText={(position) => this.setState({position})}/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label>소속</base.Label>
							<base.Input onChangeText={(belong) => this.setState({belong})}/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label>번호</base.Label>
							<base.Input onChangeText={(phone) => this.setState({phone})}
								 keyboardType="number-pad"/>
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