import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			selected: 'key1'
		};
	}
	onValueChange(value: string) {
		this.setState({
			selected: value
		});
	}
	render(){
		let detailInput
		if(this.state.selected == 'key1') { detailInput = <base.Text>일반선박</base.Text> }
		else if(this.state.selected == 'key2') { detailInput = <base.Text>유기,폐선박</base.Text> }
		
		return(
			<base.Container>
				<base.Header>
					<base.Body>
						<base.Title>선박등록</base.Title>
					</base.Body>
				</base.Header>
				<base.Content>
					<base.Card>
						<Image source={require('../../../assets/img/noimg.gif')} style={{height: 200, width: null, flex: 1}}/>
						<base.Icon style={{position: 'absolute', right: 10, bottom: 10,}} name='ios-add-circle' onPress={()=>this.props.navigation.navigate('Home')}/>
					</base.Card>
					<base.Card>
						<base.Text>  선박유형선택</base.Text>
						<base.Picker
							mode='dropdown'
							style={{ width: '100%' }}
							selectedValue={this.state.selected}
							onValueChange={this.onValueChange.bind(this)}
							>
							<base.Picker.Item label='일반선박' value='key1' />
							<base.Picker.Item label='유기,폐선박' value='key2' />
							<base.Picker.Item label='고무보트 + 등등' value='key3' />
						</base.Picker>
					</base.Card>
					{detailInput}
				</base.Content>
			</base.Container>
		);
	}
}