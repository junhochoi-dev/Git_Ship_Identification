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
			<TouchableHighlight style={{flex: 1/2,}}>
				<base.Card>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column'}}>
							<Image resizeMode='contain' source={this.props.ship.img} style={{width: 150, height: 150,}}/>
							<base.Text style={{fontFamily:'Nanum'}}>선박번호 : {this.props.ship.no}</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>등록날짜 : 2020년 12월 19일</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>위도좌표 : 12.357986</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>경도좌표 : 88.486231</base.Text>
							<base.Text style={{fontFamily:'Nanum'}}>특이사항없음</base.Text>
						</base.Form>
					</base.CardItem>
				</base.Card>
			</TouchableHighlight>
		)
	}
}
