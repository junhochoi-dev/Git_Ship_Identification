import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import * as base from 'native-base';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../utils/getToken';
import { requestWastedShipList } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign'

import Dots from 'react-native-dots-pagination';

export default class ListWastedShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			pages: 0,
		};
		this.showWastedShipList = this.showWastedShipList(this);

		this.updateCommonShipList = this.updateWastedShipList.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
	}
	firstPage(){
		if(this.state.index == 1){
			console.log('이미 첫 번째 페이지입니다.')
		}
		else {
			this.setState({index: 1});
			this.updateCommonShipList();
		}
	}
	lastPage(){
		if(this.state.index == this.state.pages){
			console.log('이미 마지막 페이지입니다.')
		}
		else {
			this.setState({index: this.state.pages});
			this.updateCommonShipList();
		}
	}
	previousPage(){
		if(this.state.index == 1){
			console.log('첫 번째 페이지입니다.')
		}
		else {
			--this.state.index;
			this.updateCommonShipList();
		}
	}
	nextPage(){
		if(this.state.index == this.state.pages){
			console.log('마지막 페이지입니다.')
		}
		else {
			++this.state.index;
			this.updateCommonShipList();
		}
	}
	showWastedShipList(){
		getToken().then((token) => {
			requestWastedShipList(token, this.state.index).then((response) => {
			if(response.status == 200){
				this.setState({
					pages: response.data.data.count,
					data: this.state.data.concat(response.data.data.data),
				})
			}
			else{
				console.log('fail')
			}
			})
        })
		
	}
	updateWastedShipList(){
		getToken().then((token) => {
			requestWastedShipList(token, this.state.index).then((response) => {
			if(response.status == 200){
				this.setState({
					pages: response.data.data.count,
					data: response.data.data.data,
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>유기선박 전체목록</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder contentContainerStyle={{ flex: 1 }}>
					<FlatList
						sytle={{flex:1}}
						data={this.state.data}
						renderItem={({item}) => <ShowShip ship={item} onPress={()=>this.props.navigation.navigate('DetailWastedShip',{id: item.id})}/>}
					/>
					<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
						<base.Button rounded style={{backgroundColor: 'white', width: 40, justifyContent: 'center'}} onPress={()=>this.firstPage()}>
							<AntDesign name="banckward" size={20} color="#292929"/>
						</base.Button>
						<base.Button rounded style={{backgroundColor: 'white', marginLeft: 20, width: 40, justifyContent: 'center'}} onPress={()=>this.previousPage()}>
							<AntDesign name="caretleft" size={20} color="#292929"/>
						</base.Button>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', height: 50}}>
							<base.Text>{this.state.index} / {this.state.pages}</base.Text>
							<Dots length={this.state.pages} active={this.state.index - 1} activeColor={'#006eee'} width={200} marginHorizontal={7}/>
						</base.Form>
						<base.Button rounded style={{backgroundColor: 'white', marginRight: 20, width: 40, justifyContent: 'center'}} onPress={()=>this.nextPage()}>
							<AntDesign name="caretright" size={20} color="#292929"/>
							</base.Button>
						<base.Button rounded style={{backgroundColor: 'white', width: 40, justifyContent: 'center'}} onPress={()=>this.lastPage()}>
							<AntDesign name="forward" size={20} color="#292929"/>
						</base.Button>
					</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}