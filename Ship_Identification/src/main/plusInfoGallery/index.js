import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Svg, Image } from 'react-native-svg';
import { getToken } from '../../../utils/getToken';
import { requestCommonShipPlusDetail } from '../../../utils/shipInfoRequest';
import ShowPlusDetail from './showPlusDetail';
export default class PlusInfoGallery extends Component{
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			
			name: '', imo: '', Calsign: '', mmsi: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			img: '',
			
			data: [],
		};
		this.getPlusDetail = this.getPlusDetail(this);
	}
	getPlusDetail(){
		getToken().then((token) => {
			requestCommonShipPlusDetail(token, this.props.navigation.getParam('id')).then((response) => {
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
		if(!this.state.data.length){
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
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>일반선박 추가정보 갤러리</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Form style={{width: '100%', justifyContent: 'center'}}>
						<FlatList
							sytle={{flex:1, height: 150, justifyContent: 'center', width: '100%'}}
							data={this.state.data}
							numColumns={2}
							renderItem={({item}) => <ShowPlusDetail ship={item} onPress={()=>this.props.navigation.navigate('PlusInfoCommonShip',{
								name: this.state.name,
								id: item.id,
							})}/>}
						/>
				</base.Form>
				</base.Content>				
			</base.Container>
		);
	}
}
