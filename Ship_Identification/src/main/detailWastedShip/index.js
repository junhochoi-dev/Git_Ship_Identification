import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
		if(this.state.img == ''){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Text style ={{fontSize: 30}}>데이터 가져오는 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
            )
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기,폐선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<base.Card>
						<base.CardItem bordered>
							<base.Text style={{fontFamily:'Nanum_Title', fontSize: 40,}}> {this.state.imo} </base.Text>
						</base.CardItem>
						<base.CardItem bordered>
							<base.Form style={{width: '100%'}}>
								<Svg width={'100%'} height={250}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.img}}
										/>
								</Svg>
							</base.Form>
						</base.CardItem>
					</base.Card>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> IMO : {this.state.imo} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 위도 : {this.state.latitude} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 경도 : {this.state.longitude} </base.Text>
						</base.Item>
					<MapView
						provider={PROVIDER_GOOGLE}
						style={{flex: 1, marginTop: 10}}
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