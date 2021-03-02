import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { ValueInput } from './valueInput';
import { Picker } from '@react-native-picker/picker';
export default class Search extends Component{
	constructor(props) {
		super(props);
		this.state = {	
			flag: 'Normal',
			
			types: '', region: '',
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			latitude: '0', longitude: '0', info: '',
		};
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.searchBoat = this.searchBoat.bind(this);

		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
	normalInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(name) => this.setState({name})}/>
				<ValueInput label='선박등록번호 (14자리 숫자)' onChange={(imo) => this.setState({imo})}/>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박종류</base.Text>
					<Picker
						mode='dropdown'
						prompt='선박종류'
						selectedValue={this.state.types}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({types: itemValue}) }>
						<Picker.Item label="어선" value="어선"/>
						<Picker.Item label="목선" value="목선"/>
						<Picker.Item label="유선" value="유선"/>
						<Picker.Item label="어장관리선" value="어선관리선"/>
						<Picker.Item label="고무보트" value="고무보트"/>
						<Picker.Item label="모터보트(레저용)" value="모터보트(레저용)"/>
						<Picker.Item label="모터보트(선내기)" value="모터보트(선내기)"/>
						<Picker.Item label="모터보트(선외기)" value="모터보트(선외기)"/>
						<Picker.Item label="수상오토바이" value="수상오토바이"/>
						<Picker.Item label="세일링 보트" value="세일링 보트"/>
						<Picker.Item label="확인불가" value="확인불가"/>
					</Picker>							
				</base.Item>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{margin: 10, color: 'grey'}}>식별장치</base.Text>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_ais} color="#006eee" onPress={() => this.checkAIS()}/>
						<base.Body><base.Text>AIS</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_vpass} color="#006eee" onPress={() => this.checkVPASS()}/>
						<base.Body><base.Text>V-Pass</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_vhf} color="#006eee" onPress={() => this.checkVHF()}/>
						<base.Body><base.Text>VHF-DSC</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_ff} color="#006eee" onPress={() => this.checkFF()}/>
						<base.Body><base.Text>FF-GPS</base.Text></base.Body>
					</base.ListItem>
				</base.Item>
				<ValueInput label='선박 길이(m)' onChange={(size) => this.setState({size})}/>
				<ValueInput label='선박 무게(t)' onChange={(tons) => this.setState({tons})}/>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박 위치 지역</base.Text>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="당진" value="당진"/>
						<Picker.Item label="서산" value="서산"/>
						<Picker.Item label="태안" value="태안"/>
						<Picker.Item label="홍성" value="홍성"/>
						<Picker.Item label="보령" value="보령"/>
						<Picker.Item label="서천" value="서천"/>
						<Picker.Item label="정보없음" value="정보없음"/>
					</Picker>							
				</base.Item>
				<base.Button block onPress={this.searchBoat} style={{backgroundColor: '#006eee'}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박검색하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<ValueInput label='유기선박 및 폐선박 관리번호' onChange={(title) => this.setState({title})}/>
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
				types: this.state.types,
				code: this.state.code,
				tons: this.state.tons,
				size: this.state.size,
				is_ais: this.state.is_ais,
				is_vpass: this.state.is_vpass,
				is_vhf: this.state.is_vhf,
				is_ff: this.state.is_ff,
				region: this.state.region,
				port: this.state.region,
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
					<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>유기선박 검색</base.Text>
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