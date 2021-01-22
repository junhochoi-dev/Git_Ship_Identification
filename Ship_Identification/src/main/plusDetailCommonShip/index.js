import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, Image} from 'react-native';
import * as base from 'native-base';
import ShowPlusDetail from './showPlusDetail';
import { getToken } from '../../../utils/getToken';
import { requestCommonShipPlusDetail } from '../../../utils/shipInfoRequest';
export default class PlusDetailCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			id: '',
			data: [],
		};
		this.getPlusDetail = this.getPlusDetail.bind(this);
	}
	componentDidMount(){ this.setState({ id: this.props.navigation.getParam('id')}) }
	getPlusDetail(){
		getToken().then((token) => {
			requestCommonShipPlusDetail(token, 104).then((response) => {
				if(response.status == 200){
					this.setState({ data: this.state.data.concat(response.data.data),})
				}
				else{
					console.log('fail')
				}
			})
		})
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
					<base.Button block style={{backgroundColor: '#006eee'}} onPress={()=>this.getPlusDetail()}>
						<base.Text style={{fontFamily:'Nanum',}}>추가정보 불러오기</base.Text>
					</base.Button>
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