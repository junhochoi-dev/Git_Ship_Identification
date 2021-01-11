import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base'
import Constants from 'expo-constants';
export default class Lost extends Component{
	constructor(props){
		super(props)
		this.state = {
        }
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
						<base.Title>비밀번호찾기</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
					<base.Text>비밀번호찾기</base.Text>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}