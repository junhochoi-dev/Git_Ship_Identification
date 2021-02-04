import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as base from 'native-base';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { getToken } from '../../../utils/getToken';
import { requestCommonShipPlusInfoDetail } from '../../../utils/shipInfoRequest';

export default class PlusInfoCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			latitude: '',
			longitude: '',
			detail: '',
			date: '',
		};
		this.getPlusInfoDetail = this.getPlusInfoDetail(this);
	}
	getPlusInfoDetail(){
		getToken().then((token) => {
			requestCommonShipPlusInfoDetail(token, this.props.navigation.getParam('id')).then((response) => {
				if(response.status == 200){
					this.setState({
						img: 'https://shipcheck-server-vrxqx.run.goorm.io' + response.data.data.img,
						latitude: response.data.data.lat,
						longitude: response.data.data.lon,
						detail: response.data.data.point,
						date: response.data.data.add_date,
					})
				}
			})
		})
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>{this.props.navigation.getParam('name')} 선박 추가정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.Form style={{alignItems: 'center', justifyContent: 'center', margin: 10,}}>
							<Image resizeMode='contain' source={{uri:this.state.img}} style={{width: 380, height: 380,}}/>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 등록날짜 : {this.state.date} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 위도 : {this.state.latitude} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 경도 : {this.state.longitude} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 세부사항 : {this.state.detail} </base.Text>
							</base.Item>
						</base.Form>
					</base.Card>
				</base.Content>				
			</base.Container>
		);
	}
}