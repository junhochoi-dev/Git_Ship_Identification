import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

export default class ShowPlusDetail extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return(
			<TouchableHighlight style={{flex: 1,}} onPress={this.props.onPress}>
				<base.Card style={{width: 150, height: 150}}>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
							<Image resizeMode='contain' source={{uri:'http://10.0.2.2:8000' + this.props.ship.img}} style={{width: 150, height: 100,}}/>
							<base.Form style={{flexDirection: 'column', width: '130%'}}>
							</base.Form>
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
