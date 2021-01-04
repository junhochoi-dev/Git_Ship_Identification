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
					<base.Body>
						<base.Title>옵션</base.Title>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.CardItem>
							<base.Text>내정보</base.Text>
						</base.CardItem>
					</base.Card>
					<base.Card>
						<base.CardItem>
							<base.Text>오류보고</base.Text>
						</base.CardItem>
					</base.Card>
					<base.Card>
						<base.CardItem>
							<base.Text>0000</base.Text>
						</base.CardItem>
					</base.Card>
					<base.Card onPress={this.executeLogout}>
						<base.CardItem>
							<base.Text>로그아웃</base.Text>
						</base.CardItem>
					</base.Card>
					<base.Button onPress={this.executeLogout}>
						<base.Text>tt</base.Text>
					</base.Button>
				</base.Content>
			</base.Container>
		);
	}
}