import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';

export default class ShowShip extends Component{
	
	render() {
		const img = 'https://ship-server-rczvh.run.goorm.io/' + this.props.boat.main_img
		return(
			<base.Card>
				<base.CardItem cardBody>
					<base.Left>
						<Image resizeMode='contain' source={{uri: img,}} style={{width: 150, height: 130,}}/>
					</base.Left>
					<base.Body>
						<base.Text>{this.props.boat.name}</base.Text>
						<base.Text>{this.props.boat.imo}</base.Text>
						<base.Text>{this.props.boat.mmsi}</base.Text>
					</base.Body>
				</base.CardItem>
			</base.Card>
		)
	}
}
