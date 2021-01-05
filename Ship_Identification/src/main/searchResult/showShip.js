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
			
			name: '', imo: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
	}
	render() {
		const address = (this.props.flag == 'Normal'? this.props.boat.main_img : this.props.boat.wasted_img)
		const img = 'https://shipcheck-server-vrxqx.run.goorm.io' + address
	
		return(
			<TouchableHighlight onPress={this.props.onPress}>
				<base.Card>
					<base.CardItem cardBody>
						<base.Left>
							<Image resizeMode='contain' source={{uri: img,}} style={{width: 150, height: 130,}}/>
						</base.Left>
						<base.Body>
							<base.Text> {this.props.boat.id} </base.Text>
						</base.Body>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
