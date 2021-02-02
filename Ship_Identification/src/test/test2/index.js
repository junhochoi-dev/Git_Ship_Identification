import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

import MapView, { Marker, Callout, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

export default class TEST2 extends Component{
	constructor(props) {
		super(props);
		this.state = {
			latitude: '35.098655',
			longitude: '129.074161',
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>TEST 페이지2</base.Title>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<base.Form style={{flex: 1,}}>
						<MapView
							ref = {(ref) => this.mapView=ref}
							provider={PROVIDER_GOOGLE}
							style={{flex: 1}}
							initialRegion={{
								latitude: parseFloat(this.state.latitude),
								longitude: parseFloat(this.state.longitude),
								latitudeDelta: 0.05,
								longitudeDelta: 0.05,
							}}
							showsUserLocation={true}
							showsMyLocationButton={true}
							>
							<Polyline
								coordinates={[
									{ latitude: 35.094246, longitude: 129.095075 },
									{ latitude: 35.107709, longitude: 129.091687 },
									{ latitude: 35.121720, longitude: 129.069615 },
									{ latitude: 35.107075, longitude: 129.043934 },
									{ latitude: 35.083080, longitude: 129.026111 },
								]}
								strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
								strokeWidth={3}
							/>
							<Marker coordinate={{latitude: 35.094246, longitude: 129.095075}}/>
							<Marker coordinate={{latitude: 35.107709, longitude: 129.091687}}/>
							<Marker coordinate={{latitude: 35.121720, longitude: 129.069615}}/>
							<Marker coordinate={{latitude: 35.107075, longitude: 129.043934}}/>
							<Marker coordinate={{latitude: 35.083080, longitude: 129.026111}}/>
						</MapView>
					</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
