import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

import MapView, { Marker, Callout, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

export default class TEST3 extends Component{
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
							<MapView.Heatmap 
								points={[
									{ latitude: 35.094246, longitude: 129.095075, weight: 1 },
									{ latitude: 35.107709, longitude: 129.091687, weight: 1 },
									{ latitude: 35.121720, longitude: 129.069615, weight: 1 },
									{ latitude: 35.107075, longitude: 129.043934, weight: 1 },
									{ latitude: 35.084080, longitude: 129.027300, weight: 1 },
									{ latitude: 35.087803, longitude: 129.027135, weight: 1 },
									{ latitude: 35.089953, longitude: 129.026465, weight: 1 },
									{ latitude: 35.090821, longitude: 129.032160, weight: 1 },
									{ latitude: 35.089722, longitude: 129.034462, weight: 1 },
								]}
								opacity={1}
								radius={40}
								maxIntensity={100}
								gradientSmoothing={1}
								heatmapMode={"POINTS_DENSITY"}
							/>
						</MapView>
					</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
