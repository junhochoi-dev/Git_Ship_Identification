import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { FlatList } from 'react-native';
import { getToken } from '../../utils/getToken';
import { searchCommonShip, searchWastedShip } from '../../utils/shipInfoRequest';
import ShowShip from './showShip';
import AntDesign from '@expo/vector-icons/AntDesign'
export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			index: 1,
			pages: 0,

			flag: '',

			types: '', region: '',
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			latitude: '0', longitude: '0', info: '',
		};
		this.showResult = this.showResult(this);
		this.getDetail = this.getDetail.bind(this);

		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.firstPage = this.firstPage.bind(this);
		this.lastPage = this.lastPage.bind(this);
	}
	componentDidMount(){
		this.setState({
			flag: this.props.navigation.getParam('flag'),

			name: this.props.navigation.getParam('name'),
			types: this.props.navigation.getParam('types'),
			code: this.props.navigation.getParam('code'),
			tons: this.props.navigation.getParam('tons'),
			size: this.props.navigation.getParam('size'),
			is_ais: this.props.navigation.getParam('is_ais'),
			is_vpass: this.props.navigation.getParam('is_vpass'),
			is_vhf: this.props.navigation.getParam('is_vhf'),
			is_ff: this.props.navigation.getParam('is_ff'),
			region: this.props.navigation.getParam('region'),
	
			title: this.props.navigation.getParam('title'),
		})
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
	showResult(){
		getToken().then((token) => {
			if(this.state.flag == 'Normal'){
				searchCommonShip(token, this.state.index, this.state.name, this.state.types, this.state.code, this.state.tons,
					 this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, this.state.region).then((response) => {
				if(response.status == 200){
					console.log(response.data.data)
					this.setState({
						pages: response.data.data.count,
						len: response.data.data.data.length,
						data: this.state.data.concat(response.data.data.data),
					})
				}
				else{ console.log('fail') }
				})
			}
			else{ // flag == 'Wasted'
				searchWastedShip(token, title).then((response) => {
				if(response.status == 200){
					this.setState({ len: response.data.data.length })
					this.setState({ data: this.state.data.concat(response.data.data) })
				}
				else{ console.log('fail') }
				})
			}
        })
	}
	
	getDetail(id){
		if(this.state.flag == 'Normal'){
			this.props.navigation.navigate('DetailCommonShip',{id: id})}
		else{ // flag == 'Wasted'
			this.props.navigation.navigate('DetailWastedShip',{id: id})}
	}
	
	render(){
		if(this.state.data.data == ''){
            return(
                <base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
					<base.Text style ={{fontSize: 30}}>데이터 가져오는 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
            )
        }
        else {
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
								<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박검색결과</base.Title>
							</base.Right>
						</base.Header>
						<base.Content padder>
							<base.Card><base.CardItem><base.Text style={{fontFamily:'Nanum_Title', fontSize: 20, color: '#006eee',}}>선박 검색 결과 {this.state.len}척</base.Text></base.CardItem></base.Card>
							<FlatList
								sytle={{flex:1}}
								data={this.state.data}
								renderItem={({item}) => <ShowShip ship={item} flag={this.state.flag} onPress={()=>this.getDetail(item.id)}/>}
								ListFooterComponent={
									<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
										<base.Button style={{backgroundColor: 'white'}} onPress={()=>this.firstPage()}><AntDesign name="banckward" size={40} color="#292929"/></base.Button>
										<base.Button style={{backgroundColor: 'white', marginLeft: 20}} onPress={()=>this.previousPage()}><AntDesign name="caretleft" size={40} color="#292929"/></base.Button>
										<base.Text style={{fontSize: 30, marginLeft: 20, marginRight: 20}}>{this.state.index} / {this.state.pages}</base.Text>
										<base.Button style={{backgroundColor: 'white', marginRight: 20}} onPress={()=>this.nextPage()}><AntDesign name="caretright" size={40} color="#292929"/></base.Button>
										<base.Button style={{backgroundColor: 'white'}} onPress={()=>this.lastPage()}><AntDesign name="forward" size={40} color="#292929"/></base.Button>
									</base.Form>
								}
							/>
						</base.Content>
					</base.Container>
				</base.Root>
			);
		}
	}
}