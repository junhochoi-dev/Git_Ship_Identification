import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { ValueInput } from './valueInput';
export default class Search extends Component{
	constructor(props) {
		super(props);
		this.state = {	
			flag: 'Normal',
			
			name: '', imo: '', calsign: '', mmsi: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.searchBoat = this.searchBoat.bind(this);
	}
	normalInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(name) => this.setState({name})}/>
				<ValueInput label='국제선박일련번호 [IMO]' onChange={(imo) => this.setState({imo})}/>
				<ValueInput label='호출부호 [CALLSIGN]' onChange={(calsign) => this.setState({calsign})}/>
				<ValueInput label='해상이동통신식별번호 [MMSI]' onChange={(mmsi) => this.setState({mmsi})}/>
				<ValueInput label='선박용도' onChange={(vessel_type) => this.setState({vessel_type})}/>
				<ValueInput label='제작년도' onChange={(build_year) => this.setState({build_year})}/>
				<ValueInput label='입항국가' onChange={(current_flag) => this.setState({current_flag})}/>
				<ValueInput label='정박항구' onChange={(home_port) => this.setState({home_port})}/>
				<base.Button block onPress={this.searchBoat} style={{backgroundColor: '#006eee'}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<ValueInput label='유기,폐선박 관리번호' onChange={(title) => this.setState({title})}/>
				<base.Button block onPress={this.searchBoat} style={{backgroundColor: '#006eee'}}>
					<base.Text>선박검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	searchBoat(){
		if(this.state.flag == 'Normal') {
			this.props.navigation.navigate('SearchResult', {
				flag: this.state.flag,
				name: this.state.name,
				imo: this.state.imo,
				calsign: this.state.calsign,
				mmsi: this.state.mmsi,
				vessel_type: this.state.vessel_type,
				build_year: this.state.build_year,
				current_flag: this.state.current_flag,
				home_port: this.state.home_port,
			})
		}
		else{ // flag == 'Wasted'{
			this.props.navigation.navigate('SearchResult', {
				flag: this.state.flag,
				title: this.state.title,
			})
		}
	}
	render(){
		let detailInput
		if(this.state.flag == 'Normal') {
			detailInput = this.normalInput()
		}
		else if(this.state.flag == 'Wasted') {
			detailInput = this.wastedInput()
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
						<base.Title style={{fontFamily:'Nanum'}}>선박검색</base.Title>
					</base.Right>
				</base.Header>
				<base.Segment style={{backgroundColor: '#006eee',}}>
					<base.Button first active={this.state.flag == 'Normal'} style={{width: '40%', justifyContent: 'center'}} onPress={() => this.setState({flag: 'Normal'})}>
					<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>일반선박 검색</base.Text>
					</base.Button>
					<base.Button last active={this.state.flag == 'Wasted'} style={{width: '40%', justifyContent: 'center'}} onPress={() => this.setState({flag: 'Wasted'})}>
					<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>유기,폐선박 검색</base.Text>
					</base.Button>
				</base.Segment>
				<base.Content padder>
					<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', margin: 5}}>선박검색</base.Text>
					<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 5}}>검색할 선박의 정보를 입력하세요</base.Text>
					{detailInput}
				</base.Content>
			</base.Container>
		);
	}
}