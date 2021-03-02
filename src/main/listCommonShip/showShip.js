import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

export default class ShowShip extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<TouchableHighlight onPress={this.props.onPress}>
				<base.Card>
					<base.CardItem cardBody>
						<base.Left style={{alignItems: 'center', height: 150, flex: 2}}>
							<Image resizeMode='cover' source={{uri: 'http://10.0.2.2:8000' + this.props.ship.main_img,}} style={{width: '100%', height: '100%',}}/>
						</base.Left>
						<base.Body style={{flex: 3,}}>
							<base.Form style={{width: '100%'}}>
								<base.Card style={{alignItems:'center'}}><base.Text style={{fontFamily:'Nanum_Title', fontSize: 20}}>{this.props.ship.name}</base.Text></base.Card>
								<base.Text style={{fontFamily:'Nanum',}}> 선박등록번호 : {this.props.ship.code} </base.Text>
								<base.Text style={{fontFamily:'Nanum',}}> 선박종류 : {this.props.ship.types} </base.Text>
								<base.Text style={{fontFamily:'Nanum',}}> 등록일자 : {this.props.ship.regit_date} </base.Text>
							</base.Form>
						</base.Body>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
