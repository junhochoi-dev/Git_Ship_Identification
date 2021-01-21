import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base'
import Constants from 'expo-constants';
export default class Lost extends Component{
	constructor(props){
		super(props)
		this.state = {
			srvno: '',
			email: '',
        }
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>비밀번호찾기</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
					<base.Form style={{margin: 5,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', margin: 5}}>비밀번호를 잊어버리셨나요?</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 5}}>비밀번호를 잊어버린 아이디와 이메일을 입력하시면 초기화된 비밀번호가 전송됩니다</base.Text>
					</base.Form>
					
					<base.Form style={{width: '100%',}}>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='아이디'
								onChangeText={(srvno) => this.setState({srvno})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>
					
					<base.Form style={{width: '100%',}}>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
							<base.Input
								placeholder='이메일'
								onChangeText={(email) => this.setState({email})}
								style={{fontFamily:'Nanum'}}
								placeholderStyle={{fontFamily:'Nanum'}}
								secureTextEntry={ true }
								/>
						</base.Item>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}