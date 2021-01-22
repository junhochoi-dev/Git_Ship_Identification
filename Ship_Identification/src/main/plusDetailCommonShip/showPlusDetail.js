import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

export default class ShowPlusDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		console.log(this.props.ship)
		const address = this.props.ship.img
		const img = 'https://shipcheck-server-vrxqx.run.goorm.io' + address
		return(
			<TouchableHighlight style={{flex: 1/2,}}>
				<base.Card>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column'}}>
							<Image resizeMode='contain' source={{uri:img}} style={{width: 150, height: 150,}}/>
							<base.Text style={{fontFamily:'Nanum'}}>선박번호 : {this.props.ship.id}</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>등록날짜 : {this.props.ship.add_date}</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>위도좌표 : {this.props.ship.lat}</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>경도좌표 : {this.props.ship.lon}</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>특이사항 : {this.props.ship.point}</base.Text>
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
