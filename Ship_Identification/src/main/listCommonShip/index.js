import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as base from 'native-base';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { searchCommonShip } from '../../../utils/shipInfoRequest';
import ShowShip from '../searchResult/showShip';
export default class ListCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			flag: 'Normal',
			data: [],
			len: 0,
		};
		this.showCommonShipList = this.showCommonShipList(this);
	}
	showCommonShipList(){
		getToken().then((token) => {
			let title = ''
			searchCommonShip(token, title).then((response) => {
			if(response.status == 200){
				this.setState({
					data: this.state.data.concat(response.data.data),
					len: response.data.data.length,
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		
	}
	render(){
		if(this.state.data == []){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Text style ={{fontSize: 30}}>데이터 가져오는 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
            )
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>일반선박 전체목록</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<base.Card><base.CardItem><base.Text style={{fontFamily:'Nanum_Title', fontSize: 20, color: '#006eee',}}>일반선박 총 {this.state.len}척</base.Text></base.CardItem></base.Card>
					<FlatList
						sytle={{flex:1}}
						data={this.state.data}
						renderItem={({item}) => <ShowShip boat={item} flag={this.state.flag} onPress={()=>this.props.navigation.navigate('DetailCommonShip',{id: item.id})}/>}
					/>
				</base.Content>				
			</base.Container>
		);
	}
}