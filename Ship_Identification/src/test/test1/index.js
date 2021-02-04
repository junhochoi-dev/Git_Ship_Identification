import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';


export default class TEST1 extends Component{
	constructor(props) {
		super(props);
		this.state = {
		};
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>TEST 페이지1</base.Title>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<base.Form style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', height: '100%'}}>
						<base.Text style={{color: 'white'}}>Welcome to React Native QRScanner!</base.Text>
						
					</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
