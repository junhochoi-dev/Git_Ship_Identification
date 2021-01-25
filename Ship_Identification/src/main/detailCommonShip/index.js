import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { requestCommonShipDetail } from '../../../utils/shipInfoRequest';
import { requestCommonShipPlusDetail } from '../../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
export default class DetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			
			name: '', imo: '', Calsign: '', mmsi: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			img: '',
			
			data: [],
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
		this.getPlusDetail = this.getPlusDetail(this);
	}
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((ship) =>{
				this.setState({
					id: id,
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
	getPlusDetail(){
		getToken().then((token) => {
			requestCommonShipPlusDetail(token, this.props.navigation.getParam('id')).then((response) => {
				if(response.status == 200){
					this.setState({ data: this.state.data.concat(response.data.data),})
				}
				else{
					console.log('fail')
				}
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
		let plusDetail
		if(!this.state.data.length){ plusDetail = 
			<base.Button block onPress={()=>this.props.navigation.navigate('RegisterPlus', {id: this.state.id, name: this.state.name})} style={{backgroundColor: '#006eee', margin: 10}}>
				<base.Text style={{fontFamily: 'Nanum'}}>추가 정보 등록하기</base.Text>
			</base.Button>}
		else { plusDetail =
			<base.Form>
				<FlatList
					sytle={{flex:1, height: 150}}
					data={this.state.data}
					horizontal={true}
					renderItem={({item}) => <ShowPlusDetail ship={item} onPress={()=>this.props.navigation.navigate('PlusInfoCommonShip',{
						name: this.state.name,
						id: item.id,
					})}/>}
					ListFooterComponent={
						<TouchableHighlight style={{flex: 1,}} onPress={()=>this.props.navigation.navigate('RegisterPlus', {id: this.state.id, name: this.state.name})}>
							<base.Card style={{width: 180, height: 150, alignItems: 'center', justifyContent: 'center'}}>
								<base.Icon name='ios-add-circle' style={{color: '#006eee', fontSize: 60}}/>
							</base.Card>
						</TouchableHighlight>	
					}
				/>
				<base.Button block style={{backgroundColor: '#006eee', margin: 10}} onPress={()=>this.props.navigation.navigate('PlusInfoGallery', {id: this.state.id})}>
					<base.Text style={{fontFamily: 'Nanum'}}>추가 정보 전체 보기</base.Text>
				</base.Button>
			</base.Form>
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>일반선박 세부정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.CardItem bordered>
							<base.Text style={{fontFamily:'Nanum_Title', fontSize: 30,}}> {this.state.name} </base.Text>
						</base.CardItem>
							<base.Form style={{width: '100%'}}>
								<Svg width={'100%'} height={250}>
									<Image
										width={'100%'}
										height={'100%'}
										href={{uri:'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.img}}
										/>
								</Svg>
							</base.Form>
						<base.Form style={{justifyContent: 'center', margin: 10,}}>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 선박명 : {this.state.name} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> IMO : {this.state.imo} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> MMSI : {this.state.mmsi} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> CallSign : {this.state.Calsign} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 입항국가 : {this.state.current_flag} </base.Text>
							</base.Item>
							<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
								<base.Text style={{fontFamily:'Nanum'}}> 정착항 : {this.state.home_port} </base.Text>
							</base.Item>
						</base.Form>
						<base.Form>
							{plusDetail}
						</base.Form>
					</base.Card>
				</base.Content>				
			</base.Container>
		);
	}
}
