import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { searchWastedShipList } from '../../../utils/shipInfoRequest';
export default class SearchMap extends Component{ // only use for Wasted Boat
	constructor(props) {
		super(props);
		this.state = {
			latitude: '35.098470',
			longitude: '129.074269',
			data: [],
		};
		this.requestShipLocation = this.requestShipLocation(this);
		this.getLocation = this.getLocation.bind(this);
	}
	requestShipLocation(){
		getToken().then((token) => {
			searchWastedShipList(token).then((response) =>{
				if(response.status == 200){ // request success
					this.setState({data: this.state.data.concat(response.data.data)})
				}
				else{
                console.log('fail')
            	}
			}).catch((error) => { // request fail
					console.log(error.message)
				})
        })
	}
	getLocation = async () => {
		try {
			const response = await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			await this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		} catch (error) {
		  Alert.alert("Can't find you.", "Please Try Again!")
		}
	}
	render(){
		if(this.state.data == '' || this.state.latitude == '' || this.state.longitude == ''){
            return(
                <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
				    <Text style ={{fontSize: 30}}>데이터 가져오는 중</Text>
				    <base.Spinner color='blue' />
                </View>
            )
        }
		const requestMarker = (data) => {
			return data.map((ship) => {
				return (
					<Marker
					coordinate={{
						latitude: parseFloat(ship.latitude),
						longitude: parseFloat(ship.longitude),
					}}>
						<Callout onPress={()=>this.props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
							<View>
								<Svg width={300} height={200}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + ship.wasted_img}}
										/>
								</Svg>
								<Text>IMO : {ship.title}</Text>
								<Text>위도 : {ship.latitude}</Text>
								<Text>경도 : {ship.longitude}</Text>
							</View>
						</Callout>
					</Marker>
					)
			})
		}
		return(
			<base.Container>
				<base.Header>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title>유기,폐선박 지도 검색</base.Title>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }} padder>
					<MapView
						style={{flex: 1}}
						initialRegion={{
							latitude: parseFloat(this.state.latitude),
							longitude: parseFloat(this.state.longitude),
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}
						showsUserLocation={true}
						showsMyLocationButton={true}
						onRegionChange={(region) => {
							this.setState({latitude: parseFloat(region.latitude).toFixed(6), longitude: parseFloat(region.longitude).toFixed(6)});
						}}
						>
						{ requestMarker(this.state.data) }
					</MapView>
					<base.Button rounded style={{ position: 'absolute', right: '5%', bottom: '5%', }} onPress={this.getLocation}>
						<base.Icon name='ios-locate'/>
					</base.Button>
				</base.Content>
			</base.Container>
		);
	}
}