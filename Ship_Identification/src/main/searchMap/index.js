import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { searchWastedShipList } from '../../../utils/shipInfoRequest';
export default class SearchMap extends Component{ // only use for Wasted Boat
	constructor(props) {
		super(props);
		this.state = {
			latitude: '35.098655',
			longitude: '129.074161',
			// 35.098655
			// 129.074161
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
	moveLocation(){
		let loc = {
			latitude: '35.118347',
			longitude: '129.047641',
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
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
			latitudeDelta: 0.05,
			longitudeDelta: 0.05,
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
						latitude: parseFloat(ship.latitude),
						longitude: parseFloat(ship.longitude),
					}}>
						<Callout onPress={()=> this.props.navigation.navigate('DetailWastedShip', {id: ship.id})}>
							<View>
								<Svg width={300} height={200}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + ship.wasted_img}}
									/>
								</Svg>
								<base.Card>
									<base.Text>{ship.id}</base.Text>
									<Text style={{fontFamily:'Nanum',}}>IMO : {ship.title}</Text>
									<Text style={{fontFamily:'Nanum',}}>위도 : {ship.latitude}</Text>
									<Text style={{fontFamily:'Nanum',}}>경도 : {ship.longitude}</Text>
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기선박 및 폐선박 지도 검색</base.Title>
					</base.Right>
				</base.Header>
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<base.Form style={{flex: 1,}}>
						<MapView
							ref = {(ref) => this.mapView=ref}
							style={{flex: 1}}
							initialRegion={{
								latitude: parseFloat(this.state.latitude),
								longitude: parseFloat(this.state.longitude),
								latitudeDelta: 0.05,
								longitudeDelta: 0.05,
							}}
							showsUserLocation={true}
							showsMyLocationButton={true}
							onRegionChangeComplete={region => {
							this.setState({
								latitude: region.latitude,
								longitude: region.longitude,
								});
							}}
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
					
					<base.Form style={{	position: 'absolute', bottom: '5%', right:'10%', flexDirection: 'row', alignItems:'center'}}>
						<base.Item rounded style={{backgroundColor:'white', width:250, height: 50}}>
							<base.Input placeholder='검색할 IMO값을 입력하세요' keyboardType="number-pad" onChangeText={(searchIMO) => this.setState({searchIMO})}/></base.Item>
						<base.Button rounded
							style={{
								backgroundColor: '#006eee',
								height: 55, width: 55,
								alignItems:'center', justifyContent:'center'}}
							onPress={this.moveLocation}
							>
							<base.Icon name='ios-search'/>
						</base.Button>
					</base.Form>
					
					<base.Text style={{position:'absolute', top: '20%' }}>{this.state.latitude} + {this.state.longitude}</base.Text>
				</base.Content>
			</base.Container>
		);
	}
}