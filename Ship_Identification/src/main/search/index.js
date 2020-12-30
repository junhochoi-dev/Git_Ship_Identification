import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';

export default class Search extends Component{
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
							<base.Title>선박검색</base.Title>
						</base.Right>
					</base.Header>
				<base.Content>
				</base.Content>
			</base.Container>
		);
	}
}