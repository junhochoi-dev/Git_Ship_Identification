import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { searchWastedShip } from '../../../utils/shipInfoRequest';
export default class DetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			latitude: '',
			longitude: '',
		};
	}
	componentDidMount(){
		this.setState({id: this.props.navigation.getParam('id')})
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
						<base.Title>유기,폐선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content>
					<base.Text> {this.state.id} </base.Text>
				</base.Content>
			</base.Container>
		);
	}
}