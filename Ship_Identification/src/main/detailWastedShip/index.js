import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { requestWastedShipDetail } from '../../../utils/shipInfoRequest';
export default class DetailWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			
			imo: '',
			latitude: '',
			longitude: '',
			img: '',
		};
		this.showWastedShipDetail = this.showWastedShipDetail(this);
	}
	showWastedShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestWastedShipDetail(token, id).then((ship) =>{
				this.setState({
					imo: ship.data.data.title,
					latitude: ship.data.data.latitude,
					longitude: ship.data.data.longitude,
					img: ship.data.data.wasted_img,
				})
			})
        })
	}
	render(){
		if(this.state.img == '' || this.state.latitude == '' || this.state.longitude == ''){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Text style ={{fontSize: 30}}>데이터 가져오는 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
            )
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
						<base.Title>유기,폐선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<base.Card>
						<base.CardItem>
							<Svg width={300} height={200}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.img}}
										/>
								</Svg>
						</base.CardItem>
						<base.CardItem>
							<base.Text> IMO : {this.state.imo} </base.Text>
						</base.CardItem>
						<base.CardItem>
							<base.Text> 위도 : {this.state.latitude} </base.Text>
							<base.Text> 경도 : {this.state.longitude} </base.Text>
						</base.CardItem>
					</base.Card>
					<MapView
						style={{flex: 1}}
						initialRegion={{
							latitude: parseFloat(this.state.latitude),
							longitude: parseFloat(this.state.longitude),
							latitudeDelta: 0.05,
							longitudeDelta: 0.05,
						}}>
						<Marker
						coordinate={{
							latitude: parseFloat(this.state.latitude),
							longitude: parseFloat(this.state.longitude),
						}}/>
					</MapView>
				</base.Content>				
			</base.Container>
		);
	}
}