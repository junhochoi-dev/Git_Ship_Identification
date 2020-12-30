import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { FlatList } from 'react-native';
import { getToken } from '../../../utils/getToken';
import { searchCommonShip } from '../../../utils/shipInfoRequest';
import ShowBoat from './showBoat';
export default class SearchResult extends Component{
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			
			img: '',
			flag: '',
			
			name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.showResult = this.showResult(this);
	}
	
	showResult(){
		const flag = this.props.navigation.getParam('flag')
		const name = this.props.navigation.getParam('name')
		const imo = this.props.navigation.getParam('imo')
		const calsign = this.props.navigation.getParam('calsign')
		const mmsi = this.props.navigation.getParam('mmsi')
		const vessel_type = this.props.navigation.getParam('vessel_type')
		const build_year = this.props.navigation.getParam('build_year')
		const current_flag = this.props.navigation.getParam('current_flag')
        const home_port = this.props.navigation.getParam('home_port')
		getToken().then((token) => {
			searchCommonShip(token, name, imo, calsign, mmsi, vessel_type, build_year, current_flag, home_port).then((response) => {
            if(response.status == 200){
				console.log('success')
				console.log(response.data.data)
				this.setState({ data: this.state.data.concat(response.data.data) })
            }
            else{
                console.log('fail')
            }
		})
        })
	}
	
	render(){
		if(this.state.data.length == 0){
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
								data = {this.state.data}
								renderItem={({item}) => <ShowBoat boat={item}/>}
							/>
						</base.Content>
					</base.Container>
				</base.Root>
			);
		}
	}
}