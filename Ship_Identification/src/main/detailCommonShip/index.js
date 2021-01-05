import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { requestCommonShipDetail } from '../../../utils/shipInfoRequest';
export default class DetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			
			name: '', imo: '', Calsign: '', mmsi: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			img: '',
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
	}
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((ship) =>{
				this.setState({
					name: ship.data.data.name,
					imo: ship.data.data.imo,
					Calsign: ship.data.data.Calsign,
					mmsi: ship.data.data.mmsi,
					vessel_type: ship.data.data.vessel_type,
					build_year: ship.data.data.build_year,
					current_flag: ship.data.data.current_flag,
					home_port: ship.data.data.home_port,
					img: ship.data.data.main_img,
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
						<base.Title>일반선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<base.Card>
						<base.CardItem bordered>
							<base.Text style={{fontSize: 40,}}> {this.state.name} </base.Text>
						</base.CardItem>
					</base.Card>
					<base.Card>
						<base.CardItem bordered>
							<base.Text>선박사진</base.Text>
						</base.CardItem>
						<base.CardItem bordered>
							<Svg width={300} height={200}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.img}}
										/>
								</Svg>
						</base.CardItem>
						<base.CardItem bordered>
							<base.Text>상세정보</base.Text>
						</base.CardItem>
						<base.Card><base.CardItem><base.Text> 선박명 : {this.state.name} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> IMO : {this.state.imo} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> MMSI : {this.state.mmsi} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> CallSign : {this.state.Calsign} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> 선박용도 : {this.state.vessel_type} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> 생산연도 : {this.state.build_year} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> 입항국가 : {this.state.current_flag} </base.Text></base.CardItem></base.Card>
						<base.Card><base.CardItem><base.Text> 정착항 : {this.state.home_port} </base.Text></base.CardItem></base.Card>
					</base.Card>
				</base.Content>				
			</base.Container>
		);
	}
}