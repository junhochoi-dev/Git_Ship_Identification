import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../utils/getToken';
import { requestWastedShipLocation } from '../../utils/shipInfoRequest';
export default class SearchMap extends Component{ // only use for Wasted Boat
	constructor(props) {
		super(props);
		this.state = {
			latitude: '36.6985',
			longitude: '126.5969',
			// 36.6985
			// 126.5969
			data: [],
			searchIMO: '',
		};
		this.requestShipLocation = this.requestShipLocation(this);
		this.getLocation = this.getLocation(this);
		this.moveCurrentLocation = this.moveCurrentLocation.bind(this);
		this.moveLocation = this.moveLocation.bind(this);
	}
	requestShipLocation(){
		getToken().then((token) => {
			requestWastedShipLocation(token).then((response) =>{
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
	moveLocation(){
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		this.mapView.animateToRegion(loc, 0);
	}
	
	moveCurrentLocation = async () => {
		const response = await Location.requestPermissionsAsync();
		const location = await Location.getCurrentPositionAsync();
		await this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		let loc = {
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			latitudeDelta: 0.5,
			longitudeDelta: 0.5,
		};
		this.mapView.animateToRegion(loc, 0);
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
						latitude: parseFloat(ship.lat),
						longitude: parseFloat(ship.lon),
					}}>
						<Callout
							onPress={() => this.props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
							<View>
								<base.Card>
									<Text style={{fontFamily:'Nanum',}}>선박관리번호 : {ship.id}</Text>
									<Text style={{fontFamily:'Nanum',}}>위도 : {ship.lat}</Text>
									<Text style={{fontFamily:'Nanum',}}>경도 : {ship.lon}</Text>
									<Text style={{fontFamily:'Nanum',}}>세부사항 : {ship.info}</Text>
								</base.Card>
							</View>
						</Callout>
					</Marker>
				)
			})
		}
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기선박 지도 검색</base.Title>
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
								latitudeDelta: 0.5,
								longitudeDelta: 0.5,
							}}
							mapType={'satellite'}
							>
							{ requestMarker(this.state.data) }
						</MapView>
					</base.Form>
					<base.Button rounded
						style={{
							position: 'absolute',
							top: '5%', left: '5%',
							backgroundColor: '#006eee',
							height: 55, width: 55,
								alignItems:'center', justifyContent:'center'}}
						onPress={this.moveCurrentLocation}>
						<base.Icon name='ios-locate'/>
					</base.Button>
				</base.Content>
			</base.Container>
		);
	}
}