import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { FlatList } from 'react-native';
import { getToken } from '../../../utils/getToken';
import { searchCommonShip, searchWastedShip } from '../../../utils/shipInfoRequest';
import ShowShip from './showShip';
export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			
			flag: '',
			
			name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.showResult = this.showResult(this);
		this.getDetail = this.getDetail.bind(this);
	}
	
	showResult(){
		const flag = this.props.navigation.getParam('flag')
		this.state.flag = flag
		const name = this.props.navigation.getParam('name')
		const imo = this.props.navigation.getParam('imo')
		const calsign = this.props.navigation.getParam('calsign')
		const mmsi = this.props.navigation.getParam('mmsi')
		const vessel_type = this.props.navigation.getParam('vessel_type')
		const build_year = this.props.navigation.getParam('build_year')
		const current_flag = this.props.navigation.getParam('current_flag')
        const home_port = this.props.navigation.getParam('home_port')
		
		const title = this.props.navigation.getParam('title')
		
		getToken().then((token) => {
			if(flag == 'Normal'){
				searchCommonShip(token, name, imo, calsign, mmsi, vessel_type, build_year, current_flag, home_port).then((response) => {
				if(response.status == 200){
					this.setState({ data: this.state.data.concat(response.data.data) })
				}
				else{
					console.log('fail')
				}
				})
			}
			else{ // flag == 'Wasted'
				searchWastedShip(token, title).then((response) => {
				if(response.status == 200){
					this.setState({ data: this.state.data.concat(response.data.data) })
				}
				else{
					console.log('fail')
				}
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
						<base.Header>
							<base.Left>
								<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
									<base.Icon name='arrow-back'/>
								</base.Button>
							</base.Left>
							<base.Right>
								<base.Title>선박검색결과</base.Title>
							</base.Right>
						</base.Header>
						<base.Content padder>
							<FlatList
								sytle={{flex:1}}
								data={this.state.data}
								renderItem={({item}) => <ShowShip boat={item} flag={this.state.flag} onPress={()=>this.getDetail(item.id)}/>}
							/>
						</base.Content>
					</base.Container>
				</base.Root>
			);
		}
	}
}