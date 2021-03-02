import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { updateWastedShipDetail, } from '../../utils/shipInfoRequest';

export default class UpdateWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {};
	}
	render(){
		return(
			<base.Root>
				<base.Container>
					<base.Header style={{backgroundColor: '#006eee'}}>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back'/>
							</base.Button>
						</base.Left>
						<base.Right>
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기선박 정보수정</base.Title>
						</base.Right>
					</base.Header>
					<base.Content>
						<base.Text> 안눙 </base.Text>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			</base.Root>
		);
	}
}