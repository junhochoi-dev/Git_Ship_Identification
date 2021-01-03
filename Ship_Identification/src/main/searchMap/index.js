import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, Callout} from 'react-native-maps';
import { getToken } from '../../../utils/getToken';
import { searchWastedShip } from '../../../utils/shipInfoRequest';
export default class SearchMap extends Component{ // only use for Wasted Boat
	constructor(props) {
		super(props);
		this.state = {
			latitude: '',
			longitude: '',
			data: [],
		};
		this.requestShipLocation = this.requestShipLocation(this);
		this.getLocation = this.getLocation(this);
	}
	requestShipLocation(){
		getToken().then((token) => {
			searchWastedShip(token).then((response) =>{
				if(response.status == 200){
					this.setState({data: this.state.data.concat(response.data.data)})
				}
				else{
                console.log('fail')
            	}
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
		if(this.state.data == ''){
            return(
                <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
				    <Text style ={{fontSize: 30}}>데이터 가져오는 중</Text>
				    <base.Spinner color='blue' />
                </View>
            )
        }
		const requsetMarker = (data) => {
			return data.map((ship) => {
				return (
					<Marker
					coordinate={{
						latitude: parseFloat(ship.latitude),
						longitude: parseFloat(ship.longitude),
					}}>
						<Callout>
							<View>
								<Image source={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + ship.wasted_img}} resizeMode='contain' style={{flex: 1, width: 200, height: 200}}/>
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
				<MapView
					style={{flex: 1}}
					initialRegion={{
						latitude: 35.098470,
						longitude: 129.074269,
						latitudeDelta: 0.05,
						longitudeDelta: 0.05,
					}}
					onRegionChange={(region) => {
                    	this.setState({latitude: region.latitude, longitude: region.longitude});
                	}}
					>
					{ requsetMarker(this.state.data) }
				</MapView>
				
				<base.Text style={{position: 'absolute', alignSelf: 'center', bottom: '5%', backgroundColor: 'white', fontSize: 20, width: '50%'}}>
					위도 : {this.state.latitude}{'\n'}경도 : {this.state.longitude}</base.Text>
				
				<base.Button rounded style={{ position: 'absolute', right: '5%', bottom: '5%', }}>
					<base.Icon name='ios-locate'/>
				</base.Button>
			</base.Container>
		);
	}
}