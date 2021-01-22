import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, Image} from 'react-native';
import * as base from 'native-base';
import ShowPlusDetail from './showPlusDetail';
export default class PlusDetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			data: [
				{img : require('/workspace/Ship_Identification/assets/db/db1.jpg'), no: 313},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 1651},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 711},
				{img : require('/workspace/Ship_Identification/assets/db/db4.jpg'), no: 141},
				{img : require('/workspace/Ship_Identification/assets/db/db1.jpg'), no: 41},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 612},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 1512},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 1651},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 711},
				{img : require('/workspace/Ship_Identification/assets/db/db4.jpg'), no: 141},
				{img : require('/workspace/Ship_Identification/assets/db/db1.jpg'), no: 41},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 612},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 1512},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 1651},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 711},
				{img : require('/workspace/Ship_Identification/assets/db/db4.jpg'), no: 141},
				{img : require('/workspace/Ship_Identification/assets/db/db1.jpg'), no: 41},
				{img : require('/workspace/Ship_Identification/assets/db/db2.jpg'), no: 612},
				{img : require('/workspace/Ship_Identification/assets/db/db3.jpg'), no: 1512},
			]
		};
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>{this.props.navigation.getParam('name')}의 추가정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<FlatList
						sytle={{flex:1,}}
						data={this.state.data}
						numColumns={2}
						renderItem={({item}) => <ShowPlusDetail ship={item}/>}
					/>
				</base.Content>				
			</base.Container>
		);
	}
}