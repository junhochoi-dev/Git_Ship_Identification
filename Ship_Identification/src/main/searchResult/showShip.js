import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

export default class ShowShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			
			img: '',
			
			id:'',
			
			name: '', imo: '', Calsign: '', mmsi: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.detailCommon = this.detailCommon(this)
		this.detailWasted = this.detailWasted(this)
	}
	detailCommon = () => {
		return(
			<base.Form style={{width: '100%'}}>
				<base.Card style={{alignItems:'center'}}><base.Text style={{fontFamily:'Nanum_Title', fontSize: 20}}>{this.props.boat.name}</base.Text></base.Card>
				<base.Text style={{fontFamily:'Nanum',}}> IMO : {this.props.boat.imo} </base.Text>
				<base.Text style={{fontFamily:'Nanum',}}> MMSI : {this.props.boat.mmsi} </base.Text>
				<base.Text style={{fontFamily:'Nanum',}}> CALLSIGN : {this.props.boat.calsign} </base.Text>
			</base.Form>
		)
	}
	detailWasted = () =>{
		return(
			<base.Form style={{width: '100%'}}>
				<base.Card style={{alignItems:'center'}}><base.Text style={{fontFamily:'Nanum_Title', fontSize: 20}}>{this.props.boat.title}</base.Text></base.Card>
				<base.Text style={{fontFamily:'Nanum',}}> 위도 : {this.props.boat.latitude} </base.Text>
				<base.Text style={{fontFamily:'Nanum',}}> 경도 : {this.props.boat.longitude} </base.Text>
			</base.Form>
		)
	}
	render() {
		let detailShip = this.props.flag == 'Normal' ? this.detailCommon : this.detailWasted
		const address = (this.props.flag == 'Normal'? this.props.boat.main_img : this.props.boat.wasted_img)
		const img = 'https://shipcheck-server-vrxqx.run.goorm.io' + address
	
		return(
			<TouchableHighlight onPress={this.props.onPress}>
				<base.Card>
					<base.CardItem cardBody>
						<base.Left style={{alignItems: 'center'}}>
							<Image resizeMode='contain' source={{uri: img,}} style={{width: 150, height: 100,}}/>
						</base.Left>
						<base.Body>
							{detailShip}
						</base.Body>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
