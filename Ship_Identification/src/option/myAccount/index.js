import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
export default class MyAccount extends Component{
	constructor(props) {
		super(props);
		this.state = {
			serviceNum: '',
			password: '',
            name : '',
			rank : '',
			position : '',
			belong : '',
			phone : '',
			device_id : '',
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
						<base.Title>내정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
					</base.Card>					
				</base.Content>
			</base.Container>
		);
	}
}