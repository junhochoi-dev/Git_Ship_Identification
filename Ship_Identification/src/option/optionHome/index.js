import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import * as base from 'native-base';
import { requestLogout } from '../../../utils/userInfoRequest';
import { getToken } from '../../../utils/getToken';
export default class OptionHome extends Component{
	constructor(props){
		super(props)
		this.state = {}
		this.executeLogout = this.executeLogout.bind(this);
	}
	executeLogout() {
        getToken().then((token)=>{
            requestLogout(token).then( async (response) => {
                if(response.status == 200){
                    await AsyncStorage.removeItem('token')
                    this.props.navigation.navigate('Login')
                }
            })
        })
    }
	render(){
		return(
			<base.Container>
				<base.Header>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title>옵션</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Button style={{width:'100%', marginBottom: 10,}} onPress={()=>this.props.navigation.navigate('MyAccount')}>
						<base.Icon name='ios-person'/>
						<base.Text>내정보</base.Text>
					</base.Button>
					<base.Button style={{width:'100%', marginBottom: 10,}}>
						<base.Icon name='ios-create'/>
						<base.Text>회원정보 수정</base.Text>
					</base.Button>
					<base.Button style={{width:'100%', marginBottom: 10,}} onPress={()=>this.props.navigation.navigate('ErrorReport')}>
						<base.Icon name='ios-warning'/>
						<base.Text>오류보고</base.Text>
					</base.Button>
					<base.Button style={{width:'100%', marginBottom: 10,}} onPress={this.executeLogout}>
						<base.Icon name='ios-exit'/>
						<base.Text>로그아웃</base.Text>
					</base.Button>
					<base.Button  style={{width:'100%', marginBottom: 10,}}>
						<base.Icon name='ios-information-circle'/>
						<base.Text>개발자정보</base.Text>
					</base.Button>
				
				</base.Content>
			</base.Container>
		);
	}
}