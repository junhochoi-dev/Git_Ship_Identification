import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../utils/getToken';
import { requestWastedShipDetail } from '../../utils/shipInfoRequest';
export default class DetailWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			latitude: '',
			longitude: '',
			img: '',
			info: '',
			register: '',
			regit_date: '',
		};
		this.showWastedShipDetail = this.showWastedShipDetail(this);
	}
	showWastedShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestWastedShipDetail(token, id).then((ship) =>{
				this.setState({
					id: ship.data.data.id,
					latitude: ship.data.data.lat,
					longitude: ship.data.data.lon,
					img: ship.data.data.main_img,
					info: ship.data.data.info,
					register: ship.data.data.register,
					regit_date: ship.data.data.regit_date,
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<base.CardItem bordered>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: 40,}}> {this.state.id}번 유기선박 </base.Text>
					</base.CardItem>
					<base.Form style={{width: '100%', height: 300}}>
						<base.Form style={{alignItems: 'center', height: 300, flex: 2}}>
							<Image resizeMode='cover' source={{uri: 'http://10.0.2.2:8000' + this.state.img,}} style={{width: '100%', height: '100%',}}/>
						</base.Form>
						<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: '50%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
							>
							<base.Icon name='ios-add-circle' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
						<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: '75%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
							>
							<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
					</base.Form>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 선박관리번호 : {this.state.id} </base.Text>
					</base.Item>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 위도 : {this.state.latitude} </base.Text>
					</base.Item>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 경도 : {this.state.longitude} </base.Text>
					</base.Item>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 세부정보 : {this.state.info} </base.Text>
					</base.Item>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 등록자 : {this.state.register} </base.Text>
					</base.Item>
					<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
						<base.Text style={{fontFamily:'Nanum'}}> 등록일자 : {this.state.regit_date} </base.Text>
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