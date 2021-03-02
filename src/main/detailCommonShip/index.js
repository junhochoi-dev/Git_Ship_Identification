import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight, Image, Alert } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, } from 'react-native-svg';
import { getToken } from '../../utils/getToken';
import { requestCommonShipDetail } from '../../utils/shipInfoRequest';
import { requestCommonShipPlusDetail } from '../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
export default class DetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			img: '',
			images: [],
			name: '', types: '',
			code: '',  tons: '', size: '', region: '',
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			data: [],
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
		this.getPlusDetail = this.getPlusDetail(this);
	}
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						id: id,
						img: response.data.data.main_img,
						name: response.data.data.name,
						code: response.data.data.code,
						types: response.data.data.types,
						is_ais: response.data.data.is_ais,
						is_vpass: response.data.data.is_vpass,
						is_vhf: response.data.data.is_vhf,
						is_ff: response.data.data.is_ff,
						port: response.data.data.region,
						tos: response.data.data.tons,
						size: response.data.data.size,
						regit_date: response.data.data.regit_date,
						images: response.data.data.normal_images,
					})
				}
				else{
					console.log('fail')
				}
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
		if(true){ plusDetail = 
			<base.Button block onPress={()=>this.props.navigation.navigate('RegisterPlus', {id: this.state.id, name: this.state.name})} style={{backgroundColor: '#006eee', margin: 10}}>
				<base.Text style={{fontFamily: 'Nanum'}}>추가 정보 등록하기</base.Text>
			</base.Button>}
		else { plusDetail =
			<base.Form>
				<FlatList
					sytle={{flex:1, height: 150}}
					data={this.state.images}
					horizontal={true}
					renderItem={({item}) => <ShowPlusDetail ship={item} />}
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
					<base.CardItem bordered>
						<base.Text style={{fontFamily:'Nanum_Title', fontSize: 30,}}> {this.state.name} </base.Text>
					</base.CardItem>
					<base.Form style={{width: '100%' ,height: 300}}>
						<base.Form style={{alignItems: 'center', height: 300, flex: 2}}>
							<Image resizeMode='cover' source={{uri: 'http://10.0.2.2:8000' + this.state.img,}} style={{width: '100%', height: '100%',}}/>
						</base.Form>
						<base.Button rounded onPress={()=>this.props.navigation.navigate('UpdateCommonShip',{id: this.state.id})}
							style={{position: 'absolute', right: 10, bottom: '50%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
							>
							<base.Icon name='ios-create' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
						<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: '75%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
							>
							<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
						</base.Button>
					</base.Form>
					<base.Form style={{justifyContent: 'center', margin: 10,}}>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 선박명 : {this.state.name} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 등록일자 : {this.state.regit_date} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 선박등록번호 : {this.state.code} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 선박종류 : {this.state.types} </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
							<base.Text style={{margin: 10, color: 'grey'}}>식별장치</base.Text>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_ais} color="#006eee"/>
								<base.Body><base.Text>AIS</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_vpass} color="#006eee"/>
								<base.Body><base.Text>V-Pass</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_vhf} color="#006eee"/>
								<base.Body><base.Text>VHF-DSC</base.Text></base.Body>
							</base.ListItem>
							<base.ListItem style={{width: '100%'}}>
								<base.CheckBox checked={this.state.is_ff} color="#006eee"/>
								<base.Body><base.Text>FF-GPS</base.Text></base.Body>
							</base.ListItem>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 선박길이 : {this.state.size}m</base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 선박무게 : {this.state.tons}t</base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 확인지역 : </base.Text>
						</base.Item>
						<base.Item regular style={{ width:'100%', borderRadius: 10, height: 50, marginTop: 10}}>
							<base.Text style={{fontFamily:'Nanum'}}> 정착항 : {this.state.port} </base.Text>
						</base.Item>
					</base.Form>
					<base.Form>
						{plusDetail}
					</base.Form>
				</base.Content>			
			</base.Container>
		);
	}
}
